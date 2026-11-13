import React, { useEffect, useRef } from 'react';

interface PointerState {
  x: number;
  y: number;
  active: boolean;
  vx: number;
  vy: number;
}

interface CosmicParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  alpha: number;
  color: string;
  phase: number;
  isSpark?: boolean;
  life?: number;
  maxLife?: number;
}

interface HeroParticlesProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

const PARTICLE_COLORS = [
  '56, 189, 248',  // Cyan-400
  '129, 140, 248', // Indigo-400
  '251, 191, 36',  // Amber-400 starlight
  '226, 232, 240', // Slate-200 starlight
];

export const HeroParticles: React.FC<HeroParticlesProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || 1024;
    let height = container.clientHeight || 680;
    let animFrameId = 0;

    const pointer: PointerState = {
      x: width / 2,
      y: height / 2,
      active: false,
      vx: 0,
      vy: 0,
    };

    const particles: CosmicParticle[] = [];

    const buildParticles = (w: number, h: number) => {
      particles.length = 0;
      const area = w * h;
      const targetCount = Math.max(42, Math.min(95, Math.floor(area / 12500)));

      for (let i = 0; i < targetCount; i++) {
        const speed = 0.14 + Math.random() * 0.28;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseRadius: 1.1 + Math.random() * 2.1,
          alpha: 0.35 + Math.random() * 0.55,
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth || 1024;
      height = container.clientHeight || 680;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        buildParticles(width, height);
      }
    };

    resizeCanvas();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => resizeCanvas())
        : null;
    resizeObserver?.observe(container);

    const spawnTrailSpark = (x: number, y: number, vx: number, vy: number) => {
      if (particles.length > 130) return;
      particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: vx * 0.08 + (Math.random() - 0.5) * 0.7,
        vy: vy * 0.08 + (Math.random() - 0.5) * 0.7,
        baseRadius: 1.2 + Math.random() * 1.4,
        alpha: 0.85,
        color: Math.random() > 0.35 ? '56, 189, 248' : '251, 191, 36',
        phase: 0,
        isSpark: true,
        life: 0,
        maxLife: 36 + Math.random() * 22,
      });
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const nx = clientX - rect.left;
      const ny = clientY - rect.top;
      const dx = nx - pointer.x;
      const dy = ny - pointer.y;
      pointer.vx = dx;
      pointer.vy = dy;
      pointer.x = nx;
      pointer.y = ny;
      pointer.active = true;

      if (!prefersReducedMotion && Math.hypot(dx, dy) > 4) {
        spawnTrailSpark(nx, ny, dx, dy);
      }
    };

    const handleMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const handleMouseLeave = () => {
      pointer.active = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => {
      pointer.active = false;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    const drawFrame = (timeMs: number) => {
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient cursor halo when hovering HeroSection
      if (pointer.active) {
        const halo = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          170
        );
        halo.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
        halo.addColorStop(0.5, 'rgba(99, 102, 241, 0.06)');
        halo.addColorStop(1, 'rgba(4, 7, 20, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 170, 0, Math.PI * 2);
        ctx.fill();
      }

      const interactionRadius = 155;
      const linkDistance = 115;

      // Update particle kinematics
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.isSpark) {
          p.life = (p.life || 0) + 1;
          if (p.life >= (p.maxLife || 40)) {
            particles.splice(i, 1);
            continue;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.alpha = Math.max(0, 0.85 * (1 - p.life / (p.maxLife || 40)));
        } else if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // React organically to pointer movement (gentle cosmic pull + orbital tangent)
          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 8 && dist < interactionRadius) {
              const force = (1 - dist / interactionRadius) * 0.032;
              p.vx += (dx / dist) * force - (dy / dist) * force * 0.45;
              p.vy += (dy / dist) * force + (dx / dist) * force * 0.45;
            }
          }

          // Smooth speed damping back to natural drift velocity
          const speed = Math.hypot(p.vx, p.vy);
          if (speed > 1.35) {
            p.vx *= 0.95;
            p.vy *= 0.95;
          }
        }

        // Twinkle & glow radius
        const twinkle = prefersReducedMotion
          ? 1
          : 0.78 + 0.22 * Math.sin(timeMs * 0.002 + p.phase);
        let boost = 1;
        if (pointer.active && !p.isSpark) {
          const dist = Math.hypot(pointer.x - p.x, pointer.y - p.y);
          if (dist < interactionRadius) {
            boost = 1 + (1 - dist / interactionRadius) * 0.85;
          }
        }

        const drawRadius = p.baseRadius * boost;
        const drawAlpha = Math.min(1, p.alpha * twinkle * (boost > 1 ? 1.2 : 1));

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${drawAlpha.toFixed(3)})`;
        ctx.fill();

        if (drawRadius > 2.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${(drawAlpha * 0.14).toFixed(3)})`;
          ctx.fill();
        }
      }

      // Draw constellation links between nearby ambient particles & interactive pointer links
      ctx.lineWidth = 0.85;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        if (a.isSpark) continue;

        if (pointer.active) {
          const pdx = pointer.x - a.x;
          const pdy = pointer.y - a.y;
          const pDist = Math.hypot(pdx, pdy);
          if (pDist < interactionRadius) {
            const lineAlpha = (1 - pDist / interactionRadius) * 0.42;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (b.isSpark) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.18;
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animFrameId = window.requestAnimationFrame(drawFrame);
      }
    };

    animFrameId = window.requestAnimationFrame(drawFrame);

    return () => {
      if (animFrameId) window.cancelAnimationFrame(animFrameId);
      resizeObserver?.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="hero-particle-canvas"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
