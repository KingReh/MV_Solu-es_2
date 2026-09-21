import { useEffect, useRef } from 'react';

export type CanvasVariant = 'constellation' | 'waves' | 'particles' | 'trends' | 'flow' | 'subtle';

interface SectionAmbientCanvasProps {
  variant?: CanvasVariant;
  className?: string;
  intensity?: 'medium' | 'high';
}

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  currentAlpha: number;
  isHub?: boolean;
  pulseOffset?: number;
}

export function SectionAmbientCanvas({
  variant = 'constellation',
  className = '',
  intensity = 'high',
}: SectionAmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number = 0;
    let isRunning = false;
    let width = 0;
    let height = 0;
    let time = Math.random() * 100;

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const updateMouse = (clientX: number, clientY: number) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.active = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Initialize particles based on variant and density
    const isMobile = window.innerWidth < 768;
    const particleDensityFactor = isMobile ? 18000 : 13000;
    const count = Math.min(Math.floor((window.innerWidth * 700) / particleDensityFactor), isMobile ? 32 : 65);

    const particles: NodeParticle[] = [];
    for (let i = 0; i < count; i++) {
      const isHub = i % 6 === 0;
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || 600),
        vx: (Math.random() - 0.5) * (variant === 'trends' ? 0.3 : 0.4),
        vy: variant === 'trends' ? -Math.random() * 0.45 - 0.15 : (Math.random() - 0.5) * 0.4,
        radius: isHub ? Math.random() * 1.5 + 2.4 : Math.random() * 1.4 + 1.1,
        baseAlpha: isHub ? 0.75 : 0.38,
        currentAlpha: 0.35,
        isHub,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Ambient floating glow orbs
    const orbs = [
      {
        x: width * 0.2,
        y: height * 0.4,
        radius: isMobile ? 70 : 130,
        vx: 0.15,
        vy: 0.12,
        color: '229, 192, 123',
        alpha: intensity === 'high' ? 0.12 : 0.08,
      },
      {
        x: width * 0.8,
        y: height * 0.6,
        radius: isMobile ? 80 : 150,
        vx: -0.14,
        vy: -0.16,
        color: '212, 175, 55',
        alpha: intensity === 'high' ? 0.1 : 0.06,
      },
    ];

    const render = () => {
      if (!isRunning) return;
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Autonomous gentle focal wanderer
      const autoFocusX = width * 0.5 + Math.sin(time * 0.8) * (width * 0.28);
      const autoFocusY = height * 0.5 + Math.cos(time * 1.1) * (height * 0.25);

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.09;
        mouse.y += (mouse.targetY - mouse.y) * 0.09;
      } else {
        mouse.x += (autoFocusX - mouse.x) * 0.04;
        mouse.y += (autoFocusY - mouse.y) * 0.04;
      }

      // 1. Render ambient drifting light orbs
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const pulse = 1 + Math.sin(time * 1.3 + orb.x) * 0.12;
        const currentRadius = orb.radius * pulse;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(0.5, `rgba(${orb.color}, ${orb.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Interactive focal aura
      if (mouse.x > -500 && mouse.y > -500) {
        const auraRadius = isMobile ? 160 : 250;
        const auraGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, auraRadius);
        auraGrad.addColorStop(0, 'rgba(229, 192, 123, 0.14)');
        auraGrad.addColorStop(0.4, 'rgba(212, 175, 55, 0.05)');
        auraGrad.addColorStop(1, 'rgba(9, 13, 20, 0)');
        ctx.fillStyle = auraGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Variant Specific Graphics
      if (variant === 'waves' || variant === 'flow' || variant === 'subtle') {
        // Multi-tier flowing waves
        const waveCount = variant === 'waves' ? 3 : 2;
        for (let w = 0; w < waveCount; w++) {
          const baseY = height * (0.35 + w * 0.22);
          const alpha = 0.22 - w * 0.05;
          const strokeColor =
            w === 0 ? `rgba(229, 192, 123, ${alpha})` : w === 1 ? `rgba(212, 175, 55, ${alpha})` : `rgba(243, 232, 208, ${alpha})`;

          ctx.beginPath();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = w === 0 ? 1.8 : 1.2;

          for (let x = 0; x <= width; x += 10) {
            const freq = 0.003 - w * 0.0006;
            const speed = (w % 2 === 0 ? 1 : -1) * (0.8 + w * 0.3);
            const amp = 32 - w * 6;
            const y = baseY + Math.sin(x * freq + time * speed) * amp + Math.cos(x * 0.0018 - time * 0.5) * 16;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      }

      // 4. Particles and Constellations
      const maxDistance = isMobile ? 90 : 130;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse proximity boost
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const focusDist = isMobile ? 120 : 170;

        if (dist < focusDist) {
          const boost = (1 - dist / focusDist) * 0.55;
          p.currentAlpha = Math.min(p.baseAlpha + boost, 1.0);
        } else {
          p.currentAlpha += (p.baseAlpha - p.currentAlpha) * 0.05;
        }

        // Draw glowing hub halo
        if (p.isHub) {
          const pulse = Math.sin(time * 2.5 + (p.pulseOffset || 0)) * 0.25 + 0.75;
          const haloRadius = p.radius * (2.2 + pulse);

          const hubGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloRadius);
          hubGrad.addColorStop(0, `rgba(229, 192, 123, ${p.currentAlpha * 0.5 * pulse})`);
          hubGrad.addColorStop(0.5, `rgba(212, 175, 55, ${p.currentAlpha * 0.2 * pulse})`);
          hubGrad.addColorStop(1, 'rgba(229, 192, 123, 0)');

          ctx.fillStyle = hubGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw particle body
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isHub ? `rgba(243, 232, 208, ${p.currentAlpha})` : `rgba(229, 192, 123, ${p.currentAlpha * 0.85})`;
        ctx.fill();

        // Connect nearby nodes
        if (variant !== 'subtle') {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distX = p.x - p2.x;
            const distY = p.y - p2.y;
            const linkDist = Math.sqrt(distX * distX + distY * distY);

            if (linkDist < maxDistance) {
              const hubMultiplier = p.isHub || p2.isHub ? 1.35 : 1.0;
              const linkAlpha = (1 - linkDist / maxDistance) * 0.25 * hubMultiplier;

              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(229, 192, 123, ${linkAlpha})`;
              ctx.lineWidth = p.isHub || p2.isHub ? 1.1 : 0.75;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to only animate when this section is visible in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          isRunning = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [variant, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none w-full h-full z-0 opacity-100 ${className}`}
    />
  );
}
