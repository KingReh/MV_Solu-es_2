import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-[#F3E8D0] origin-left shadow-[0_0_8px_rgba(229,192,123,0.5)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
