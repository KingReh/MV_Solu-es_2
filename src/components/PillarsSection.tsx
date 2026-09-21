import { useEffect, useRef } from 'react';
import { Zap, Eye, HeartHandshake, Lock } from 'lucide-react';
import { pillarsData, siteConfig } from '../data/siteConfig';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { SectionAmbientCanvas } from './SectionAmbientCanvas';

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const decorAccentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Master Section Entrance (Fade-in and Slide-up)
      if (contentWrapperRef.current) {
        gsap.from(contentWrapperRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 2. Reveal Section Header
      gsap.from(headerRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // 3. Staggered reveal for Pillars Cards
      const cards = gsap.utils.toArray<HTMLElement>('.pillar-card');
      gsap.from(cards, {
        y: 45,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });

      // 3. Subtle Parallax differentiation on cards
      cards.forEach((card, i) => {
        const offset = i % 2 === 0 ? 25 : -18;
        gsap.to(card, {
          y: offset,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // 4. Parallax on ambient glow background
      if (ambientGlowRef.current) {
        gsap.to(ambientGlowRef.current, {
          y: 80,
          scale: 1.25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 5. Parallax on decorative architectural line / ring
      if (decorAccentRef.current) {
        gsap.to(decorAccentRef.current, {
          y: -50,
          rotation: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#E5C07B]" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-[#E5C07B]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#E5C07B]" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-[#E5C07B]" />;
      default:
        return <Zap className="w-5 h-5 text-[#E5C07B]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pilares"
      className="py-24 relative bg-[#0B101A] border-y border-[#1E293B] overflow-hidden"
    >
      {/* Interactive Background Canvas */}
      <SectionAmbientCanvas variant="constellation" />

      {/* Background ambient subtle glow with parallax */}
      <div
        ref={ambientGlowRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[480px] h-[480px] bg-[#E5C07B]/[0.08] rounded-full blur-[130px] pointer-events-none will-change-transform animate-pulse"
        style={{ animationDuration: '7s' }}
      />
      <div
        className="absolute bottom-6 right-12 w-80 h-80 bg-[#1E3A8A]/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Decorative architectural circle accent with orbiting beacon */}
      <div
        ref={decorAccentRef}
        className="absolute right-10 top-12 w-64 h-64 rounded-full border border-[#E5C07B]/20 border-dashed pointer-events-none will-change-transform hidden md:block"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#E5C07B] shadow-[0_0_10px_#E5C07B]" />
        <div className="absolute inset-6 rounded-full border border-[#E5C07B]/10 border-dotted" />
      </div>

      <div ref={contentWrapperRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5C07B] font-semibold">
              <span className="w-6 h-[1px] bg-[#E5C07B]" />
              <span>Princípios e Diferenciais</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              A solidez de uma assessoria que valoriza o seu tempo e a sua confiança.
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Eliminamos os vícios do mercado tradicional: aqui você tem clareza dos critérios, diálogo direto com{' '}
            <span className="text-white font-medium">{siteConfig.responsible}</span> e condução responsável.
          </p>
        </div>

        {/* 4 Pillars Grid with GSAP Parallax and Reveal */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillarsData.map((pillar) => (
            <div
              key={pillar.id}
              className="pillar-card group relative rounded-2xl bg-[#101622] hover:bg-[#131B2B] border border-[#1E293B] hover:border-[#E5C07B]/40 p-6 flex flex-col justify-between transition-colors duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#1A2333] border border-[#27354E] flex items-center justify-center group-hover:border-[#E5C07B]/40 transition-colors">
                    {getIcon(pillar.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#090D14] border border-[#1E293B] text-[#E5C07B]">
                    {pillar.metricLabel}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#E5C07B] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#1E293B]/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Compromisso MV</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B]/40 group-hover:bg-[#E5C07B] transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
