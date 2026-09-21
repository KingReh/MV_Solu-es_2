import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    // If running in an environment without window, exit
    if (typeof window === 'undefined') return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Initially position elements off-screen or centered, but hidden
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 1,
    });

    // High performance quickTo setters for 120fps tracking
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' });

    let isVisible = false;
    let isHovering = false;
    let activeMagneticTarget: HTMLElement | null = null;

    // Hide if mobile touch interaction is detected
    const onTouchStart = () => {
      isVisible = false;
      document.documentElement.classList.remove('custom-cursor-active');
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    // First mouse movement activates the cursor and syncs initial coordinates
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        document.documentElement.classList.add('custom-cursor-active');
        // Set coordinates directly on first move to eliminate jump
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }

      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      // Handle magnetic pull if hovering over an interactive element
      if (activeMagneticTarget) {
        const rect = activeMagneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const maxPull = 12;
        const pullFactor = 0.25;

        const clampedX = Math.max(Math.min(deltaX * pullFactor, maxPull), -maxPull);
        const clampedY = Math.max(Math.min(deltaY * pullFactor, maxPull), -maxPull);

        gsap.to(activeMagneticTarget, {
          x: clampedX,
          y: clampedY,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    // Mouse down / up tactile click feedback
    const onMouseDown = () => {
      gsap.to(ring, {
        scale: isHovering ? 1.3 : 0.75,
        backgroundColor: 'rgba(229, 192, 123, 0.35)',
        duration: 0.15,
      });
      gsap.to(dot, { scale: 0.5, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ring, {
        scale: isHovering ? 1.75 : 1,
        backgroundColor: isHovering ? 'rgba(229, 192, 123, 0.15)' : 'rgba(229, 192, 123, 0.05)',
        duration: 0.2,
      });
      gsap.to(dot, { scale: isHovering ? 0 : 1, duration: 0.2 });
    };

    // Window boundaries
    const onMouseLeaveWindow = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    const onMouseEnterWindow = (e: MouseEvent) => {
      isVisible = true;
      document.documentElement.classList.add('custom-cursor-active');
      gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
      gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
    };

    // Interactive element hover detection (buttons, links, inputs, tags)
    const onPointerOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-magnetic]'
      ) as HTMLElement | null;

      if (target) {
        isHovering = true;
        activeMagneticTarget = target;

        // Expand ring with gold aura
        gsap.to(ring, {
          scale: 1.75,
          borderColor: '#E5C07B',
          backgroundColor: 'rgba(229, 192, 123, 0.16)',
          boxShadow: '0 0 25px rgba(229, 192, 123, 0.45)',
          duration: 0.25,
          ease: 'power2.out',
        });

        // Dim central dot to prioritize button content
        gsap.to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
        });
      }
    };

    const onPointerOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-magnetic]'
      ) as HTMLElement | null;

      if (target) {
        isHovering = false;
        if (activeMagneticTarget) {
          // Snap element back to original position with subtle spring
          gsap.to(activeMagneticTarget, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1.1, 0.4)',
          });
          activeMagneticTarget = null;
        }

        // Restore default ring state
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(229, 192, 123, 0.65)',
          backgroundColor: 'rgba(229, 192, 123, 0.05)',
          boxShadow: '0 0 12px rgba(229, 192, 123, 0.2)',
          duration: 0.25,
          ease: 'power2.out',
        });

        // Restore central dot
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    // Attach listeners
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('pointermove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);
    document.addEventListener('mouseover', onPointerOver, { passive: true });
    document.addEventListener('mouseout', onPointerOut, { passive: true });

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      document.removeEventListener('mouseover', onPointerOver);
      document.removeEventListener('mouseout', onPointerOut);
    };
  }, []);

  return (
    <div className="custom-cursor-container pointer-events-none select-none">
      {/* Precision Core Dot (Gold glowing center) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#E5C07B] pointer-events-none z-[9999999] shadow-[0_0_10px_rgba(229,192,123,1)] will-change-transform"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Fluid Outer Ring with Magnetic Aura */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[#E5C07B] bg-[#E5C07B]/10 pointer-events-none z-[9999998] shadow-[0_0_18px_rgba(229,192,123,0.3)] will-change-transform"
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  );
}
