import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  currentAlpha: number;
  isHub: boolean;
  pulsePhase: number;
}

interface FloatingOrb {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  baseAlpha: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
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

    const updateCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCoords(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Generate responsive particles with higher density and distinct visual layers
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile
      ? Math.min(Math.floor((window.innerWidth * window.innerHeight) / 14000), 45)
      : Math.min(Math.floor((window.innerWidth * window.innerHeight) / 12000), 95);

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isHub = i % 7 === 0;
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || 700),
        vx: (Math.random() - 0.5) * (isHub ? 0.3 : 0.45),
        vy: (Math.random() - 0.5) * (isHub ? 0.3 : 0.45),
        radius: isHub ? Math.random() * 1.6 + 2.4 : Math.random() * 1.5 + 1.1,
        baseAlpha: isHub ? Math.random() * 0.25 + 0.65 : Math.random() * 0.35 + 0.35,
        currentAlpha: 0.4,
        isHub,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Floating large ambient luminescence orbs
    const floatingOrbs: FloatingOrb[] = [
      {
        x: width * 0.25,
        y: height * 0.3,
        radius: isMobile ? 80 : 140,
        vx: 0.18,
        vy: 0.12,
        color: '229, 192, 123',
        baseAlpha: 0.14,
      },
      {
        x: width * 0.75,
        y: height * 0.65,
        radius: isMobile ? 90 : 160,
        vx: -0.15,
        vy: -0.18,
        color: '212, 175, 55',
        baseAlpha: 0.12,
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        radius: isMobile ? 70 : 120,
        vx: 0.12,
        vy: -0.14,
        color: '243, 232, 208',
        baseAlpha: 0.08,
      },
    ];

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Autonomous gentle ambient wandering when mouse is inactive (ensures vivid life on mobile & idle desktop)
      const autoFocusX = width * 0.5 + Math.sin(time * 0.7) * (width * 0.28);
      const autoFocusY = height * 0.4 + Math.cos(time * 0.9) * (height * 0.18);

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.09;
        mouse.y += (mouse.targetY - mouse.y) * 0.09;
      } else {
        mouse.x += (autoFocusX - mouse.x) * 0.04;
        mouse.y += (autoFocusY - mouse.y) * 0.04;
      }

      // 1. Draw large drifting ambient energy orbs
      for (const orb of floatingOrbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const pulseScale = 1 + Math.sin(time * 1.2 + orb.x) * 0.12;
        const currentRadius = orb.radius * pulseScale;

        const orbGrad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
        orbGrad.addColorStop(0, `rgba(${orb.color}, ${orb.baseAlpha})`);
        orbGrad.addColorStop(0.5, `rgba(${orb.color}, ${orb.baseAlpha * 0.4})`);
        orbGrad.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw interactive luminous focal aura
      if (mouse.x > -500 && mouse.y > -500) {
        const auraRadius = isMobile ? 180 : 280;
        const auraGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, auraRadius);
        auraGrad.addColorStop(0, 'rgba(229, 192, 123, 0.16)');
        auraGrad.addColorStop(0.4, 'rgba(212, 175, 55, 0.06)');
        auraGrad.addColorStop(1, 'rgba(9, 13, 20, 0)');

        ctx.fillStyle = auraGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Draw luminous flowing wave ribbons (clearly apparent geometric rhythm)
      const waveConfigs = [
        {
          color: 'rgba(229, 192, 123, 0.24)',
          glowColor: 'rgba(229, 192, 123, 0.12)',
          baseY: height * 0.68,
          amplitude1: 42,
          freq1: 0.0032,
          speed1: 1.1,
          amplitude2: 24,
          freq2: 0.0018,
          speed2: 0.7,
          width: 2.0,
        },
        {
          color: 'rgba(212, 175, 55, 0.18)',
          glowColor: 'rgba(212, 175, 55, 0.08)',
          baseY: height * 0.58,
          amplitude1: 34,
          freq1: 0.0028,
          speed1: -0.9,
          amplitude2: 20,
          freq2: 0.0014,
          speed2: 0.5,
          width: 1.5,
        },
        {
          color: 'rgba(243, 232, 208, 0.14)',
          glowColor: 'rgba(243, 232, 208, 0.05)',
          baseY: height * 0.42,
          amplitude1: 30,
          freq1: 0.0036,
          speed1: 0.8,
          amplitude2: 18,
          freq2: 0.0022,
          speed2: -0.6,
          width: 1.2,
        },
        {
          color: 'rgba(148, 163, 184, 0.16)',
          glowColor: 'rgba(148, 163, 184, 0.06)',
          baseY: height * 0.28,
          amplitude1: 26,
          freq1: 0.0024,
          speed1: -0.7,
          amplitude2: 16,
          freq2: 0.0016,
          speed2: 0.4,
          width: 1.2,
        },
      ];

      for (const wave of waveConfigs) {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.width;

        for (let x = 0; x <= width; x += 10) {
          const yOffset =
            Math.sin(x * wave.freq1 + time * wave.speed1) * wave.amplitude1 +
            Math.cos(x * wave.freq2 + time * wave.speed2) * wave.amplitude2;
          const y = wave.baseY + yOffset;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 4. Update & Render Constellation Network
      const maxDistance = isMobile ? 95 : 135;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Soft screen wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Proximity glow to focal point
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distToFocus = Math.sqrt(dx * dx + dy * dy);
        const focusRadius = isMobile ? 130 : 180;

        if (distToFocus < focusRadius) {
          const boost = (1 - distToFocus / focusRadius) * 0.55;
          p.currentAlpha = Math.min(p.baseAlpha + boost, 1.0);
        } else {
          p.currentAlpha += (p.baseAlpha - p.currentAlpha) * 0.05;
        }

        // Hub nodes have a dynamic pulsating halo
        if (p.isHub) {
          const pulse = Math.sin(time * 2.5 + p.pulsePhase) * 0.25 + 0.75;
          const haloRadius = p.radius * (2.4 + pulse);

          const hubGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloRadius);
          hubGrad.addColorStop(0, `rgba(229, 192, 123, ${p.currentAlpha * 0.6 * pulse})`);
          hubGrad.addColorStop(0.5, `rgba(212, 175, 55, ${p.currentAlpha * 0.25 * pulse})`);
          hubGrad.addColorStop(1, 'rgba(229, 192, 123, 0)');

          ctx.fillStyle = hubGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw particle body
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isHub
          ? `rgba(243, 232, 208, ${p.currentAlpha})`
          : `rgba(229, 192, 123, ${p.currentAlpha * 0.9})`;
        ctx.fill();

        // Connect nearby nodes with glowing links
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distX = p.x - p2.x;
          const distY = p.y - p2.y;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < maxDistance) {
            // Lines between hub nodes or near the cursor are brighter
            const hubMultiplier = p.isHub || p2.isHub ? 1.4 : 1.0;
            const linkAlpha = (1 - dist / maxDistance) * 0.28 * hubMultiplier;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(229, 192, 123, ${linkAlpha})`;
            ctx.lineWidth = p.isHub || p2.isHub ? 1.2 : 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    let isRunning = false;
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
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-ambient-canvas"
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-100"
    />
  );
}

