import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Box,
  X,
  Check,
  Copy,
  BookOpen,
  Scale
} from 'lucide-react';
import { Language } from '../types/cosmic';
import { initialCelestialBodies } from '../data/cosmicData';
import { translations } from '../i18n/translations';
import { Celestial3DViewer } from './Celestial3DViewer';

interface VirtualSolarSystemProps {
  language: Language;
}

interface RenderedBodyPosition {
  id: string;
  x: number;
  y: number;
  radius: number;
  hitRadius: number;
  name: { ar: string; en: string; fr: string };
  color: string;
}

export const VirtualSolarSystem: React.FC<VirtualSolarSystemProps> = ({ language }) => {
  const t = translations[language];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedBodyId, setSelectedBodyId] = useState<string>('earth');
  const [hoveredBodyId, setHoveredBodyId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copiedVerse, setCopiedVerse] = useState<boolean>(false);

  const selectedBody =
    initialCelestialBodies.find((b) => b.id === selectedBodyId) ||
    initialCelestialBodies.find((b) => b.id === 'earth') ||
    initialCelestialBodies[0];

  // Orbital simulation parameters
  const planetsConfig = [
    { id: 'mercury', name: { ar: 'عطارد', en: 'Mercury', fr: 'Mercure' }, orbitRadius: 48, size: 4, speed: 0.04, color: '#a3a3a3' },
    { id: 'venus', name: { ar: 'الزهرة', en: 'Venus', fr: 'Vénus' }, orbitRadius: 72, size: 7, speed: 0.025, color: '#f59e0b' },
    { id: 'earth', name: { ar: 'الأرض', en: 'Earth', fr: 'La Terre' }, orbitRadius: 100, size: 7.5, speed: 0.018, color: '#38bdf8' },
    { id: 'mars', name: { ar: 'المريخ', en: 'Mars', fr: 'Mars' }, orbitRadius: 130, size: 5.5, speed: 0.013, color: '#ef4444' },
    { id: 'jupiter', name: { ar: 'المشتري', en: 'Jupiter', fr: 'Jupiter' }, orbitRadius: 185, size: 16, speed: 0.007, color: '#d97706' },
    { id: 'saturn', name: { ar: 'زحل', en: 'Saturn', fr: 'Saturne' }, orbitRadius: 245, size: 13, speed: 0.0045, color: '#eab308', hasRings: true },
    { id: 'uranus', name: { ar: 'أورانوس', en: 'Uranus', fr: 'Uranus' }, orbitRadius: 300, size: 9, speed: 0.003, color: '#06b6d4' },
    { id: 'neptune', name: { ar: 'نبتون', en: 'Neptune', fr: 'Neptune' }, orbitRadius: 355, size: 8.5, speed: 0.002, color: '#3b82f6' }
  ];

  // Store rendered positions for click and hover hit-testing
  const renderedPositionsRef = useRef<RenderedBodyPosition[]>([]);

  // Planet angles stored in ref to prevent state-teardown
  const anglesRef = useRef<{ [key: string]: number }>({
    mercury: 0.3,
    venus: 1.2,
    earth: 2.5,
    mars: 4.1,
    jupiter: 0.8,
    saturn: 3.4,
    uranus: 5.2,
    neptune: 1.9
  });

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const speedRef = useRef(speedMultiplier);
  speedRef.current = speedMultiplier;

  const zoomRef = useRef(zoomLevel);
  zoomRef.current = zoomLevel;

  const hoveredBodyRef = useRef<string | null>(hoveredBodyId);
  hoveredBodyRef.current = hoveredBodyId;

  const selectedBodyRef = useRef<string>(selectedBodyId);
  selectedBodyRef.current = selectedBodyId;

  // Multi-lingual UI strings
  const localized = {
    ar: {
      canvasHint: '👆 انقر على أي كوكب في المدار أو على الشمس لفتح النموذج ثلاثي الأبعاد 3D والآيات القرآنية',
      openModalBtn: 'عرض النموذج ثلاثي الأبعاد 3D والتأملات القرآنية',
      modalTitle: 'النموذج التفاعلي ثلاثي الأبعاد والبيانات الكونية',
      technicalSpecs: 'البيانات والخصائص التقنية',
      quranicReflections: 'الآيات القرآنية والتأملات الإيمانية',
      classicalTafsir: 'التفسير الشرعي المعتمد',
      scientificReflection: 'التأمل العلمي المنضبط',
      diameter: 'القطر الاستوائي',
      mass: 'الكتلة التقريبية',
      distanceFromSun: 'المسافة من الشمس',
      surfaceTemp: 'درجة حرارة السطح',
      rotationPeriod: 'اليوم الفلكي (الدوران المحوري)',
      orbitalPeriod: 'السنة الفلكية (الدوران المداري)',
      moons: 'الأقمار التابعة',
      copyVerse: 'نسخ نص الآية',
      verseCopied: 'تم النسخ بنجاح',
      controlsNotice: '💡 اسحب بالماوس أو اللمس للتدوير بزاوية 360°، واستخدم عجلة التمرير أو أزرار التحكم للتقريب والتبعيد.',
      close: 'إغلاق',
      sun: 'الشمس',
      betelgeuse: 'منكب الجوزاء'
    },
    en: {
      canvasHint: '👆 Click any orbiting planet or the Sun to open interactive 3D model & Quranic reflection',
      openModalBtn: 'View 3D Model & Quranic Verses',
      modalTitle: 'Interactive 3D Celestial Model & Cosmic Telemetry',
      technicalSpecs: 'Technical & Physical Specifications',
      quranicReflections: 'Quranic Verses & Faith Reflections',
      classicalTafsir: 'Approved Classical Tafsir',
      scientificReflection: 'Disciplined Scientific Contemplation',
      diameter: 'Equatorial Diameter',
      mass: 'Approximate Mass',
      distanceFromSun: 'Distance from Sun',
      surfaceTemp: 'Surface Temperature',
      rotationPeriod: 'Rotation Period (Day)',
      orbitalPeriod: 'Orbital Period (Year)',
      moons: 'Natural Moons',
      copyVerse: 'Copy Verse',
      verseCopied: 'Copied successfully',
      controlsNotice: '💡 Click and drag to rotate 360°, and use scroll wheel or controls to zoom in and out.',
      close: 'Close',
      sun: 'The Sun',
      betelgeuse: 'Betelgeuse'
    },
    fr: {
      canvasHint: '👆 Cliquez sur une planète en orbite ou le Soleil pour ouvrir le modèle 3D et les versets coraniques',
      openModalBtn: 'Afficher le modèle 3D et versets coraniques',
      modalTitle: 'Modèle 3D Interactif et Télémétrie Céleste',
      technicalSpecs: 'Spécifications Techniques et Physiques',
      quranicReflections: 'Versets Coraniques et Méditation',
      classicalTafsir: 'Exégèse Classique Reconnue',
      scientificReflection: 'Méditation Scientifique Équilibrée',
      diameter: 'Diamètre équatorial',
      mass: 'Masse approximative',
      distanceFromSun: 'Distance au Soleil',
      surfaceTemp: 'Température de surface',
      rotationPeriod: 'Période de rotation (Jour)',
      orbitalPeriod: 'Période orbitale (Année)',
      moons: 'Lunes naturelles',
      copyVerse: 'Copier le verset',
      verseCopied: 'Copié avec succès',
      controlsNotice: '💡 Cliquez et glissez pour pivoter à 360°, et utilisez la molette pour zoomer.',
      close: 'Fermer',
      sun: 'Le Soleil',
      betelgeuse: 'Bételgeuse'
    }
  };

  const ui = localized[language] || localized.en;

  // Keyboard Escape listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  // Main 2D Canvas Orbital Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const height = (canvas.height = Math.min(Math.max(window.innerHeight * 0.65, 480), 720));

      const centerX = width / 2;
      const centerY = height / 2;
      const zoom = zoomRef.current;
      const hoveredId = hoveredBodyRef.current;
      const selectedId = selectedBodyRef.current;

      const currentPositions: RenderedBodyPosition[] = [];

      ctx.clearRect(0, 0, width, height);

      // Deep space background gradient
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, Math.max(width, height) / 1.5);
      bgGrad.addColorStop(0, '#0a102b');
      bgGrad.addColorStop(0.5, '#070b1e');
      bgGrad.addColorStop(1, '#040714');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant background stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 137.5) % width);
        const sy = ((i * 293.7) % height);
        ctx.fillRect(sx, sy, 1.2, 1.2);
      }

      // 1. Draw Sun Glow
      const sunRadius = 18 * zoom;
      const sunGlow = ctx.createRadialGradient(centerX, centerY, 10 * zoom, centerX, centerY, 65 * zoom);
      sunGlow.addColorStop(0, 'rgba(251, 191, 36, 0.95)');
      sunGlow.addColorStop(0.3, 'rgba(245, 158, 11, 0.55)');
      sunGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 65 * zoom, 0, Math.PI * 2);
      ctx.fill();

      // Draw Sun Core
      ctx.fillStyle = '#fff7ed';
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
      ctx.shadowBlur = 28;
      ctx.shadowColor = '#f59e0b';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Register Sun Position for hit-testing
      currentPositions.push({
        id: 'sun',
        x: centerX,
        y: centerY,
        radius: sunRadius,
        hitRadius: Math.max(26 * zoom, 28),
        name: { ar: 'الشمس', en: 'The Sun', fr: 'Le Soleil' },
        color: '#F59E0B'
      });

      // Sun Hover & Selection Halo
      if (hoveredId === 'sun' || selectedId === 'sun') {
        ctx.save();
        ctx.strokeStyle = hoveredId === 'sun' ? '#38bdf8' : '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, (sunRadius + 8), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (hoveredId === 'sun') {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1;
          const label = `${ui.sun} (3D 👆)`;
          ctx.font = 'bold 11px Cairo, sans-serif';
          const textWidth = ctx.measureText(label).width;
          const badgeX = centerX - textWidth / 2 - 8;
          const badgeY = centerY - (sunRadius + 26);
          ctx.fillRect(badgeX, badgeY, textWidth + 16, 20);
          ctx.strokeRect(badgeX, badgeY, textWidth + 16, 20);
          ctx.fillStyle = '#38bdf8';
          ctx.textAlign = 'center';
          ctx.fillText(label, centerX, badgeY + 14);
        }
      }

      // 2. Draw Orbits and Planets
      for (const planet of planetsConfig) {
        const radius = planet.orbitRadius * zoom * 1.5;

        // Draw orbital track
        ctx.strokeStyle = selectedId === planet.id ? 'rgba(56, 189, 248, 0.35)' : 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = selectedId === planet.id ? 1.5 : 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Update angle if playing
        if (isPlayingRef.current) {
          anglesRef.current[planet.id] += planet.speed * speedRef.current;
        }
        const angle = anglesRef.current[planet.id];

        const planetX = centerX + Math.cos(angle) * radius;
        const planetY = centerY + Math.sin(angle) * radius;
        const pSize = planet.size * zoom;

        // Register Planet Position for hit-testing
        currentPositions.push({
          id: planet.id,
          x: planetX,
          y: planetY,
          radius: pSize,
          hitRadius: Math.max(pSize + 14, 22),
          name: planet.name,
          color: planet.color
        });

        // Draw Saturn's rings
        if (planet.hasRings) {
          ctx.strokeStyle = 'rgba(254, 240, 138, 0.55)';
          ctx.lineWidth = 3.5 * zoom;
          ctx.beginPath();
          ctx.ellipse(planetX, planetY, (planet.size + 9) * zoom, (planet.size + 4) * zoom, Math.PI / 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw Planet Body
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(planetX, planetY, pSize, 0, Math.PI * 2);
        ctx.shadowBlur = selectedId === planet.id ? 16 : 4;
        ctx.shadowColor = planet.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Hover & Selection Rings
        const isHovered = hoveredId === planet.id;
        const isSelected = selectedId === planet.id;

        if (isHovered || isSelected) {
          ctx.save();
          ctx.strokeStyle = isHovered ? '#38bdf8' : '#38bdf8';
          ctx.lineWidth = isHovered ? 2.5 : 1.5;
          if (isHovered) ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(planetX, planetY, (planet.size + 8) * zoom, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          if (isHovered) {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1;
            const label = `${planet.name[language] || planet.name.ar} (3D 👆)`;
            ctx.font = 'bold 11px Cairo, sans-serif';
            const textWidth = ctx.measureText(label).width;
            const badgeX = planetX - textWidth / 2 - 8;
            const badgeY = planetY - (planet.size + 24) * zoom;
            ctx.fillRect(badgeX, badgeY, textWidth + 16, 20);
            ctx.strokeRect(badgeX, badgeY, textWidth + 16, 20);
            ctx.fillStyle = '#38bdf8';
            ctx.textAlign = 'center';
            ctx.fillText(label, planetX, badgeY + 14);
          }
        }

        // Planet label
        if (!isHovered) {
          ctx.fillStyle = isSelected ? '#38bdf8' : '#94a3b8';
          ctx.font = isSelected ? 'bold 11px Cairo, sans-serif' : '10px Cairo, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(planet.name[language] || planet.name.ar, planetX, planetY + (planet.size + 14) * zoom);
        }
      }

      renderedPositionsRef.current = currentPositions;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [language, ui.sun]);

  // Canvas Mouse Move (Hit testing for Hover)
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    const hit = renderedPositionsRef.current.find((p) => {
      return Math.hypot(mouseX - p.x, mouseY - p.y) <= p.hitRadius;
    });

    if (hit) {
      if (hoveredBodyId !== hit.id) setHoveredBodyId(hit.id);
      canvas.style.cursor = 'pointer';
    } else {
      if (hoveredBodyId !== null) setHoveredBodyId(null);
      canvas.style.cursor = 'grab';
    }
  };

  // Canvas Click (Hit testing to select and open 3D Modal)
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const hit = renderedPositionsRef.current.find((p) => {
      return Math.hypot(clickX - p.x, clickY - p.y) <= p.hitRadius;
    });

    if (hit) {
      setSelectedBodyId(hit.id);
      setIsModalOpen(true);
    }
  };

  // Copy verse to clipboard
  const handleCopyVerse = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Screen Container */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-800/40 shadow-2xl bg-[#060a1c]">
        {/* Canvas Surface with Hit Testing */}
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setHoveredBodyId(null)}
          className="w-full block cursor-grab active:cursor-grabbing transition-opacity"
          aria-label="Solar System interactive orbital simulation - Click any planet to open 3D model"
          data-testid="solar-system-canvas"
        />

        {/* Informative Hint Banner on Canvas */}
        <div className="absolute top-16 sm:top-20 inset-x-4 flex justify-center pointer-events-none">
          <div className="px-4 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 text-xs font-semibold text-cyan-200 shadow-lg pointer-events-auto flex items-center gap-2 animate-pulse">
            <span>{ui.canvasHint}</span>
          </div>
        </div>

        {/* Top Floating Control Bar */}
        <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 pointer-events-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold transition-colors"
              aria-label={isPlaying ? t.pause : t.play}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setSpeedMultiplier(1);
              }}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title={t.resetView}
              aria-label={t.resetView}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed & Zoom Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 pointer-events-auto">
            <span className="text-xs font-semibold text-slate-400 px-2 hidden sm:inline">
              {t.orbitSpeed}: {speedMultiplier}x
            </span>
            {[1, 5, 20].map((speed) => (
              <button
                key={speed}
                onClick={() => setSpeedMultiplier(speed)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${
                  speedMultiplier === speed ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {speed}x
              </button>
            ))}
            <div className="w-[1px] h-4 bg-slate-700 mx-1" />
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.2))}
              className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label={t.zoomIn}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
              className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label={t.zoomOut}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Planet Selection Strip at Bottom */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-900/50 shadow-2xl overflow-x-auto max-w-full pointer-events-auto">
            <button
              onClick={() => {
                setSelectedBodyId('sun');
                setIsModalOpen(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedBodyId === 'sun'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-amber-300 hover:bg-slate-800'
              }`}
            >
              ☀️ {ui.sun}
            </button>
            <button
              onClick={() => {
                setSelectedBodyId('betelgeuse');
                setIsModalOpen(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedBodyId === 'betelgeuse'
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                  : 'text-red-300 hover:bg-slate-800'
              }`}
            >
              ⭐ {ui.betelgeuse}
            </button>
            {planetsConfig.map((planet) => (
              <button
                key={planet.id}
                onClick={() => {
                  setSelectedBodyId(planet.id);
                  setIsModalOpen(true);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedBodyId === planet.id
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {planet.name[language] || planet.name.ar}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Body Telemetry Card */}
      {selectedBody && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 to-[#0b1026]/90 border border-cyan-800/40 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg"
                style={{ backgroundColor: selectedBody.color }}
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">
                  {selectedBody.name[language] || selectedBody.name.ar}
                </h3>
                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  {selectedBody.type}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Box className="w-4 h-4 text-cyan-100" />
                <span>{ui.openModalBtn}</span>
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed max-w-4xl mb-6">
            {selectedBody.description[language] || selectedBody.description.ar}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
              <div className="text-xs text-slate-400 mb-1">{ui.diameter}</div>
              <div className="text-sm sm:text-base font-bold text-white">
                {selectedBody.diameterKm.toLocaleString()} km
              </div>
            </div>
            {selectedBody.distanceFromSunKm !== undefined && (
              <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">{ui.distanceFromSun}</div>
                <div className="text-sm sm:text-base font-bold text-white">
                  {(selectedBody.distanceFromSunKm / 1000000).toFixed(1)} M km
                </div>
              </div>
            )}
            {selectedBody.surfaceTempCelsius !== undefined && (
              <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">{ui.surfaceTemp}</div>
                <div className="text-sm sm:text-base font-bold text-amber-400">
                  {selectedBody.surfaceTempCelsius}°C
                </div>
              </div>
            )}
            {selectedBody.orbitalPeriodDays !== undefined && (
              <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <div className="text-xs text-slate-400 mb-1">{ui.orbitalPeriod}</div>
                <div className="text-sm sm:text-base font-bold text-cyan-300">
                  {selectedBody.orbitalPeriodDays} {language === 'ar' ? 'يوم' : 'days'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3D CELESTIAL MODEL VIEWER POP-UP MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && selectedBody && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-6xl max-h-[94vh] flex flex-col bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden text-white">
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 p-3 sm:p-5 bg-slate-950/95 backdrop-blur-md border-b border-cyan-900/40">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                  style={{ backgroundColor: selectedBody.color }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>{selectedBody.name[language] || selectedBody.name.ar}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      3D
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">{ui.modalTitle}</p>
                </div>
              </div>

              {/* Quick Celestial Body Selector Tabs inside Modal */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setSelectedBodyId('sun')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedBodyId === 'sun'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-amber-300 hover:bg-slate-800'
                  }`}
                >
                  ☀️ {ui.sun}
                </button>
                {planetsConfig.map((planet) => (
                  <button
                    key={planet.id}
                    onClick={() => setSelectedBodyId(planet.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedBodyId === planet.id
                        ? 'bg-cyan-500 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {planet.name[language] || planet.name.ar}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedBodyId('betelgeuse')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedBodyId === 'betelgeuse'
                      ? 'bg-red-500 text-white'
                      : 'text-red-300 hover:bg-slate-800'
                  }`}
                >
                  ⭐ {ui.betelgeuse}
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                aria-label={ui.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Split 3D View and Scientific/Quranic Details */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: 3D Interactive Viewer Canvas */}
                <div className="lg:col-span-7 flex flex-col space-y-3">
                  <div className="rounded-2xl overflow-hidden border border-cyan-800/50 bg-black/60 shadow-inner">
                    <Celestial3DViewer
                      celestialBody={selectedBody}
                      language={language}
                      onClose={() => setIsModalOpen(false)}
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/30 text-xs text-cyan-200/90 leading-relaxed">
                    {ui.controlsNotice}
                  </div>
                </div>

                {/* Right: Technical Telemetry & Quranic Reflection */}
                <div className="lg:col-span-5 flex flex-col space-y-5">
                  
                  {/* 1. Technical Specifications Card */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 shadow-lg">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800 text-cyan-400 font-bold text-sm">
                      <Scale className="w-4 h-4 text-cyan-400" />
                      <h4>{ui.technicalSpecs}</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                        <span className="text-slate-400 block mb-0.5">{ui.diameter}</span>
                        <span className="font-bold text-white text-sm">
                          {selectedBody.diameterKm.toLocaleString()} km
                        </span>
                      </div>

                      {selectedBody.massKg && (
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                          <span className="text-slate-400 block mb-0.5">{ui.mass}</span>
                          <span className="font-bold text-white text-sm">
                            {selectedBody.massKg}
                          </span>
                        </div>
                      )}

                      {selectedBody.distanceFromSunKm !== undefined && (
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                          <span className="text-slate-400 block mb-0.5">{ui.distanceFromSun}</span>
                          <span className="font-bold text-white text-sm">
                            {(selectedBody.distanceFromSunKm / 1000000).toFixed(1)} M km
                          </span>
                        </div>
                      )}

                      {selectedBody.surfaceTempCelsius !== undefined && (
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                          <span className="text-slate-400 block mb-0.5">{ui.surfaceTemp}</span>
                          <span className="font-bold text-amber-300 text-sm">
                            {selectedBody.surfaceTempCelsius}°C
                          </span>
                        </div>
                      )}

                      {selectedBody.rotationPeriodHours !== undefined && (
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                          <span className="text-slate-400 block mb-0.5">{ui.rotationPeriod}</span>
                          <span className="font-bold text-cyan-300 text-sm">
                            {Math.abs(selectedBody.rotationPeriodHours)} h
                            {selectedBody.rotationPeriodHours < 0 ? (language === 'ar' ? ' (تراجعي)' : ' (retrograde)') : ''}
                          </span>
                        </div>
                      )}

                      {selectedBody.orbitalPeriodDays !== undefined && (
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                          <span className="text-slate-400 block mb-0.5">{ui.orbitalPeriod}</span>
                          <span className="font-bold text-cyan-300 text-sm">
                            {selectedBody.orbitalPeriodDays} {language === 'ar' ? 'يوم' : 'days'}
                          </span>
                        </div>
                      )}

                      {selectedBody.moonsCount !== undefined && (
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2">
                          <span className="text-slate-400 block mb-0.5">{ui.moons}</span>
                          <span className="font-bold text-emerald-400 text-sm">
                            {selectedBody.moonsCount} {language === 'ar' ? 'قمر طبيعي مؤكد' : 'confirmed moons'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Quranic Reflection & Tafsir Card */}
                  {selectedBody.quranicReflection && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-950/90 border border-emerald-600/30 shadow-xl space-y-4">
                      <div className="flex items-center justify-between gap-2 border-b border-emerald-900/40 pb-3">
                        <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                          <BookOpen className="w-4 h-4 text-emerald-400" />
                          <h4>{ui.quranicReflections}</h4>
                        </div>
                        <button
                          onClick={() => handleCopyVerse(selectedBody.quranicReflection?.verseText || '')}
                          className="flex items-center gap-1.5 text-xs text-emerald-400/90 hover:text-emerald-200 px-2.5 py-1 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-700/30 transition-colors"
                          title={ui.copyVerse}
                        >
                          {copiedVerse ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedVerse ? ui.verseCopied : ui.copyVerse}</span>
                        </button>
                      </div>

                      {/* Noble Verse Text */}
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-800/40 text-center">
                        <p className="font-serif text-lg sm:text-xl text-emerald-200 leading-loose">
                          ﴿ {selectedBody.quranicReflection.verseText} ﴾
                        </p>
                        <div className="mt-2 text-xs font-semibold text-emerald-400">
                          {selectedBody.quranicReflection.surah[language] || selectedBody.quranicReflection.surah.ar}
                          {selectedBody.quranicReflection.surahNumber ? ` (${selectedBody.quranicReflection.surahNumber})` : ''} - {language === 'ar' ? 'الآية' : 'Ayah'} {selectedBody.quranicReflection.ayahNumber}
                        </div>
                      </div>

                      {/* Classical Tafsir Summary */}
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-amber-300/90 flex items-center gap-1.5">
                          <span>📜</span>
                          <span>{ui.classicalTafsir}</span>
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                          {selectedBody.quranicReflection.tafsirSummary[language] || selectedBody.quranicReflection.tafsirSummary.ar}
                        </p>
                      </div>

                      {/* Scientific Contemplation */}
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-cyan-300/90 flex items-center gap-1.5">
                          <span>🔭</span>
                          <span>{ui.scientificReflection}</span>
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed bg-cyan-950/20 p-3 rounded-xl border border-cyan-900/40">
                          {selectedBody.quranicReflection.reflection[language] || selectedBody.quranicReflection.reflection.ar}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 bg-slate-950/80 border-t border-cyan-900/40">
              <span className="text-xs text-slate-400">
                {language === 'ar'
                  ? 'منصة COSMIC DISCOVERY - دراسة موثقة للكون برؤية علمية وتأملية'
                  : 'COSMIC DISCOVERY - Documented scientific and contemplative cosmic study'}
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
              >
                {ui.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
