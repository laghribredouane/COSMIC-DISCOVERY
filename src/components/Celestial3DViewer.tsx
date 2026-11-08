import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RotateCcw, ZoomIn, ZoomOut, Layers, ChevronDown, ChevronUp, Eye, Compass, Sparkles } from 'lucide-react';
import { Language, CelestialBody } from '../types/cosmic';

interface Celestial3DViewerProps {
  celestialBody: CelestialBody;
  language: Language;
  onClose?: () => void;
}

// Module-scope reusable math variables to avoid GC in render loop
const _vec3 = new THREE.Vector3();

// Detect software WebGL from GPU renderer string
const detectSoftwareGl = (): boolean => {
  if (typeof document === 'undefined') return true;
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2');
  if (!gl) return true;
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
  const gpu = String(gl.getParameter(param));
  gl.getExtension('WEBGL_lose_context')?.loseContext();
  return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
};

// Procedural procedural texture generator for celestial bodies
const createProceduralTexture = (
  type: string,
  baseColorHex: string,
  bodyId: string,
  maxAnisotropy: number
): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  ctx.fillStyle = baseColorHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (bodyId === 'earth') {
    // Oceans & Continents procedural simulation
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green/Brown land masses
    ctx.fillStyle = '#15803d';
    for (let i = 0; i < 35; i++) {
      const cx = (Math.sin(i * 1.7) * 0.5 + 0.5) * canvas.width;
      const cy = (Math.cos(i * 2.3) * 0.4 + 0.5) * canvas.height;
      const r = 40 + (i % 6) * 25;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // Subtle desert tones
    ctx.fillStyle = '#ca8a04';
    for (let i = 0; i < 15; i++) {
      const cx = (Math.sin(i * 3.1) * 0.4 + 0.5) * canvas.width;
      const cy = (Math.cos(i * 1.9) * 0.3 + 0.5) * canvas.height;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
    }
    // Polar ice caps
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, 45);
    ctx.fillRect(0, canvas.height - 45, canvas.width, 45);
  } else if (bodyId === 'jupiter') {
    // Striated banded clouds & Great Red Spot
    const bands = [
      '#ca8a04', '#d97706', '#92400e', '#fef3c7', '#b45309', '#78350f',
      '#d97706', '#fef3c7', '#92400e', '#ca8a04', '#78350f', '#d97706'
    ];
    const bandHeight = canvas.height / bands.length;
    for (let b = 0; b < bands.length; b++) {
      ctx.fillStyle = bands[b];
      ctx.fillRect(0, b * bandHeight, canvas.width, bandHeight);
    }
    // Great Red Spot
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.65, canvas.height * 0.62, 70, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 6;
    ctx.stroke();
  } else if (bodyId === 'mars') {
    // Rust-red dunes and rocky highlands
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#7f1d1d';
    for (let i = 0; i < 50; i++) {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(cx, cy, 25 + Math.random() * 35, 0, Math.PI * 2);
      ctx.fill();
    }
    // White polar caps
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, 25);
    ctx.fillRect(0, canvas.height - 25, canvas.width, 25);
  } else if (bodyId === 'sun' || type === 'star') {
    // Stellar plasma granulization
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.5, '#f59e0b');
    grad.addColorStop(1, '#ea580c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fffbeb';
    for (let i = 0; i < 70; i++) {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(cx, cy, 8 + Math.random() * 14, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (bodyId === 'saturn') {
    // Muted golden-yellow bands
    for (let y = 0; y < canvas.height; y += 12) {
      const c = y % 24 === 0 ? '#eab308' : '#ca8a04';
      ctx.fillStyle = c;
      ctx.fillRect(0, y, canvas.width, 12);
    }
  } else {
    // General procedural noise
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)';
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 20 + Math.random() * 40, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
};

// Procedural Saturn Ring Texture
const createSaturnRingTexture = (): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, 'rgba(234, 179, 8, 0)');
  grad.addColorStop(0.15, 'rgba(234, 179, 8, 0.85)');
  grad.addColorStop(0.4, 'rgba(202, 138, 4, 0.95)');
  grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.1)'); // Cassini Division gap
  grad.addColorStop(0.65, 'rgba(234, 179, 8, 0.7)');
  grad.addColorStop(0.9, 'rgba(161, 98, 7, 0.4)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

export const Celestial3DViewer: React.FC<Celestial3DViewerProps> = ({
  celestialBody,
  language,
  onClose,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHudCollapsed, setIsHudCollapsed] = useState<boolean>(false);
  const [activeLayer, setActiveLayer] = useState<'surface' | 'atmosphere' | 'grid'>('surface');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Mutable animation state references
  const animRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    celestialGroup?: THREE.Group;
    bodyMesh?: THREE.Mesh;
    atmosphereMesh?: THREE.Mesh;
    ringMesh?: THREE.Mesh;
    frameId: number;
    isSoftwareGl: boolean;
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
    targetRotationY: number;
    targetRotationX: number;
    currentRotationY: number;
    currentRotationX: number;
    cameraDistance: number;
    targetCameraDistance: number;
  }>({
    frameId: 0,
    isSoftwareGl: false,
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    targetRotationY: 0,
    targetRotationX: 0,
    currentRotationY: 0,
    currentRotationX: 0,
    cameraDistance: 4.8,
    targetCameraDistance: 4.8,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();
    const anim = animRef.current;
    anim.isSoftwareGl = isSoftwareGl;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    anim.scene = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, anim.cameraDistance);
    camera.lookAt(0, 0, 0);
    anim.camera = camera;

    // 2. WebGL Renderer with software-WebGL guard
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    anim.renderer = renderer;

    // 3. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm Key Light + Cool Hemisphere Fill)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.8);
    keyLight.position.set(5, 3, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 0.7);
    scene.add(hemiLight);

    // 5. Build Celestial Subject Group
    const celestialGroup = new THREE.Group();
    anim.celestialGroup = celestialGroup;
    scene.add(celestialGroup);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const surfaceTexture = createProceduralTexture(
      celestialBody.type,
      celestialBody.color || '#3b82f6',
      celestialBody.id,
      maxAnisotropy
    );

    // Primary Body Mesh
    const bodyGeometry = new THREE.SphereGeometry(1.6, 48, 48);
    let bodyMaterial: THREE.Material;

    if (celestialBody.type === 'star' || celestialBody.id === 'sun') {
      bodyMaterial = new THREE.MeshBasicMaterial({
        map: surfaceTexture,
      });
      // Outer solar glow sprite
      const glowGeom = new THREE.SphereGeometry(1.78, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(celestialBody.color || 0xf59e0b),
        transparent: true,
        opacity: 0.28,
        side: THREE.BackSide,
      });
      const glowMesh = new THREE.Mesh(glowGeom, glowMat);
      celestialGroup.add(glowMesh);
    } else {
      bodyMaterial = new THREE.MeshStandardMaterial({
        map: surfaceTexture,
        roughness: celestialBody.id === 'earth' ? 0.35 : 0.7,
        metalness: 0.1,
      });
    }

    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.castShadow = !isSoftwareGl;
    bodyMesh.receiveShadow = !isSoftwareGl;
    celestialGroup.add(bodyMesh);
    anim.bodyMesh = bodyMesh;

    // Atmospheric layer (for Earth or Venus)
    if (celestialBody.id === 'earth') {
      const atmosGeom = new THREE.SphereGeometry(1.63, 36, 36);
      const atmosMat = new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.32,
        roughness: 0.9,
      });
      const atmosMesh = new THREE.Mesh(atmosGeom, atmosMat);
      celestialGroup.add(atmosMesh);
      anim.atmosphereMesh = atmosMesh;
    }

    // Saturn Ring System
    if (celestialBody.id === 'saturn') {
      const ringGeom = new THREE.RingGeometry(2.1, 3.8, 64);
      // Align ring along horizontal equator
      ringGeom.rotateX(-Math.PI / 2);
      const ringTexture = createSaturnRingTexture();
      const ringMat = new THREE.MeshStandardMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
        roughness: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.z = THREE.MathUtils.degToRad(26.7); // Saturn axial tilt
      celestialGroup.add(ringMesh);
      anim.ringMesh = ringMesh;
    }

    // Grounding contact shadow plane underneath
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.1;
    scene.add(shadowPlane);

    // 6. Interaction listeners (Mouse / Touch Orbit & Drag)
    const dom = renderer.domElement;

    const onMouseDown = (e: MouseEvent) => {
      anim.isDragging = true;
      anim.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!anim.isDragging) return;
      const deltaX = e.clientX - anim.previousMousePosition.x;
      const deltaY = e.clientY - anim.previousMousePosition.y;

      anim.targetRotationY += deltaX * 0.008;
      anim.targetRotationX += deltaY * 0.008;
      // Clamp vertical pitch to avoid flipping
      anim.targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, anim.targetRotationX));

      anim.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      anim.isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      anim.targetCameraDistance += e.deltaY * 0.003;
      anim.targetCameraDistance = Math.max(2.8, Math.min(8.5, anim.targetCameraDistance));
    };

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // 7. Render Loop with afterDraw pacing for software WebGL
    function afterDraw(cb: () => void) {
      const glContext = renderer.getContext() as WebGL2RenderingContext;
      const sync = glContext.fenceSync(glContext.SYNC_GPU_COMMANDS_COMPLETE, 0);
      glContext.flush();
      const poll = () => {
        const state = sync && glContext.getSyncParameter(sync, glContext.SYNC_STATUS);
        if (state === glContext.UNSIGNALED) {
          anim.frameId = window.setTimeout(poll, 5);
        } else {
          glContext.deleteSync(sync);
          anim.frameId = window.setTimeout(cb, 80);
        }
      };
      anim.frameId = window.setTimeout(poll, 5);
    }

    let lastTime = performance.now();

    function tick() {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Auto-rotation when not manually dragging
      if (autoRotate && !anim.isDragging) {
        anim.targetRotationY += 0.25 * delta;
      }

      // Smooth exponential damping
      anim.currentRotationY = THREE.MathUtils.damp(anim.currentRotationY, anim.targetRotationY, 8, delta);
      anim.currentRotationX = THREE.MathUtils.damp(anim.currentRotationX, anim.targetRotationX, 8, delta);
      anim.cameraDistance = THREE.MathUtils.damp(anim.cameraDistance, anim.targetCameraDistance, 6, delta);

      if (anim.celestialGroup) {
        anim.celestialGroup.rotation.y = anim.currentRotationY;
        anim.celestialGroup.rotation.x = anim.currentRotationX;
      }

      if (anim.camera) {
        anim.camera.position.z = anim.cameraDistance;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        anim.frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);

      if (isSoftwareGl) {
        clearTimeout(anim.frameId);
      } else {
        cancelAnimationFrame(anim.frameId);
      }

      bodyGeometry.dispose();
      bodyMaterial.dispose();
      surfaceTexture.dispose();
      renderer.dispose();
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
    };
  }, [celestialBody, autoRotate]);

  // Adjust camera distance via HUD controls
  const handleZoom = (amount: number) => {
    const anim = animRef.current;
    anim.targetCameraDistance = Math.max(2.8, Math.min(8.5, anim.targetCameraDistance + amount));
  };

  const handleReset = () => {
    const anim = animRef.current;
    anim.targetRotationX = 0;
    anim.targetRotationY = 0;
    anim.targetCameraDistance = 4.8;
  };

  const texts = {
    ar: {
      view3D: 'المستكشف الفضائي ثلاثي الأبعاد 3D',
      rotatePrompt: 'اسحب للتدوير في كافة الزوايا، أو استخدم عجلة الفأرة للتكبير',
      specsHeader: 'المواصفات الفيزيائية المباشرة',
      diameter: 'القطر:',
      mass: 'الكتلة التقريبية:',
      temperature: 'درجة حرارة السطح:',
      autoRotate: 'الدوران التلقائي',
      reset: 'إعادة الضبط',
      hideControls: 'إخفاء لوحة التحكم',
      showControls: 'إظهار لوحة التحكم',
      close: 'إغلاق العرض',
    },
    en: {
      view3D: '3D Celestial Interactive Inspector',
      rotatePrompt: 'Drag to inspect 360°, scroll wheel to zoom',
      specsHeader: 'Real-Time Physical Specs',
      diameter: 'Diameter:',
      mass: 'Mass:',
      temperature: 'Surface Temp:',
      autoRotate: 'Auto Rotate',
      reset: 'Reset Orientation',
      hideControls: 'Hide Controls',
      showControls: 'Show Controls',
      close: 'Close View',
    },
    fr: {
      view3D: 'Explorateur Céleste 3D Interactif',
      rotatePrompt: 'Faites glisser pour tourner, molette pour zoomer',
      specsHeader: 'Spécifications Physiques en Direct',
      diameter: 'Diamètre :',
      mass: 'Masse :',
      temperature: 'Température de Surface :',
      autoRotate: 'Rotation Auto',
      reset: 'Réinitialiser',
      hideControls: 'Masquer Commandes',
      showControls: 'Afficher Commandes',
      close: 'Fermer',
    },
  };

  const t = texts[language] || texts.en;

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-[#030611] rounded-3xl overflow-hidden border border-cyan-800/40 shadow-2xl flex flex-col justify-between select-none">
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Spec Badge (Zero central viewport occlusion) */}
      <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between pointer-events-none">
        <div className="space-y-1 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-cyan-900/40 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: celestialBody.color }} />
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              {celestialBody.name[language]}
              <span className="text-xs text-amber-300 font-medium">
                {celestialBody.name.ar}
              </span>
            </h3>
          </div>
          <div className="text-[11px] text-slate-300 flex items-center gap-3">
            <span>
              {t.diameter}{' '}
              <span className="text-cyan-300 font-semibold">
                {celestialBody.diameterKm.toLocaleString()} كم
              </span>
            </span>
            {celestialBody.surfaceTempCelsius !== undefined && (
              <span>
                • {t.temperature}{' '}
                <span className="text-amber-300 font-semibold">
                  {celestialBody.surfaceTempCelsius}°C
                </span>
              </span>
            )}
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="pointer-events-auto px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
          >
            {t.close}
          </button>
        )}
      </div>

      {/* Collapsible Unified Bottom Control Dock (Compliant with Three.js skill layout constitution) */}
      <div className="relative z-10 w-full flex flex-col items-center pb-4 px-4 pointer-events-none">
        {/* Collapse Toggle Tab Button */}
        <button
          onClick={() => setIsHudCollapsed(!isHudCollapsed)}
          className="pointer-events-auto mb-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-800/50 text-[11px] font-semibold text-cyan-300 hover:text-white shadow-md backdrop-blur-md transition-transform"
        >
          {isHudCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>{t.showControls}</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>{t.hideControls}</span>
            </>
          )}
        </button>

        {/* The Dock */}
        {!isHudCollapsed && (
          <div className="pointer-events-auto max-w-[min(940px,94vw)] w-full bg-slate-950/90 backdrop-blur-xl border border-cyan-700/40 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Quick Helper Text */}
            <div className="text-xs text-slate-300 hidden md:flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="text-[11px]">{t.rotatePrompt}</span>
            </div>

            {/* Interactive Control Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Auto-Rotate Toggle */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  autoRotate
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {t.autoRotate}
              </button>

              {/* Reset View */}
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.reset}</span>
              </button>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-0.5">
                <button
                  onClick={() => handleZoom(-0.6)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleZoom(0.6)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
