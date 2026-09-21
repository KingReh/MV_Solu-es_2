import { useEffect, useRef } from 'react';
import { MessageSquare, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../data/siteConfig';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { SectionAmbientCanvas } from './SectionAmbientCanvas';

export function TrustDirectorSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const parallaxImgRef = useRef<HTMLImageElement | null>(null);
  const monogramRef = useRef<HTMLDivElement | null>(null);
  const floatingBadgeRef = useRef<HTMLDivElement | null>(null);
  const ambientGlow1Ref = useRef<HTMLDivElement | null>(null);
  const ambientGlow2Ref = useRef<HTMLDivElement | null>(null);
  const decorAccentRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Master Card Entrance (Fade-in, subtle scale and slide-up)
      if (cardContainerRef.current) {
        gsap.from(cardContainerRef.current, {
          y: 45,
          opacity: 0,
          scale: 0.98,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 1. Reveal Section Content
      gsap.from(leftColRef.current, {
        y: 35,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(rightColRef.current, {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // 2. Parallax scrub on leadership photo/visual
      if (parallaxImgRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -14, scale: 1.2 },
          {
            yPercent: 14,
            scale: 1.03,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Monogram 3D floating parallax elevation
      if (monogramRef.current) {
        gsap.to(monogramRef.current, {
          y: -18,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 4. Floating badge parallax
      if (floatingBadgeRef.current) {
        gsap.to(floatingBadgeRef.current, {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // 5. Ambient background glow parallax scrub
      if (ambientGlow1Ref.current) {
        gsap.to(ambientGlow1Ref.current, {
          y: 100,
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (ambientGlow2Ref.current) {
        gsap.to(ambientGlow2Ref.current, {
          y: -85,
          scale: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.6,
          },
        });
      }

      // 6. Decorative architectural accent ring
      if (decorAccentRingRef.current) {
        gsap.to(decorAccentRingRef.current, {
          rotation: 45,
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative bg-[#0B101A] border-t border-[#1E293B] overflow-hidden"
    >
      {/* Interactive Background Canvas */}
      <SectionAmbientCanvas variant="subtle" />

      {/* Background glow with multi-plane parallax drift */}
      <div
        ref={ambientGlow1Ref}
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-[#E5C07B]/[0.10] rounded-full blur-[130px] pointer-events-none will-change-transform animate-pulse"
        style={{ animationDuration: '6.5s' }}
      />
      <div
        ref={ambientGlow2Ref}
        className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-[#D4AF37]/[0.08] rounded-full blur-[120px] pointer-events-none will-change-transform"
      />
      <div
        className="absolute top-10 left-1/3 w-[360px] h-[360px] bg-[#1E3A8A]/20 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Decorative architectural circle accent with orbiting beacon */}
      <div
        ref={decorAccentRingRef}
        className="absolute -right-16 top-16 w-72 h-72 rounded-full border border-[#E5C07B]/20 border-dashed pointer-events-none will-change-transform hidden md:block"
        style={{ transformOrigin: 'center center' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#E5C07B] shadow-[0_0_12px_#E5C07B]" />
        <div className="absolute inset-8 rounded-full border border-[#E5C07B]/10 border-dotted" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div ref={cardContainerRef} className="rounded-3xl bg-gradient-to-br from-[#121926] to-[#0D121D] border border-[#232F47] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Leadership statement */}
            <div ref={leftColRef} className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A2436] border border-[#2D3E5E] text-xs text-[#E5C07B] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atendimento Consultivo e Personalizado</span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  &ldquo;A intermediação de crédito precisa ser transparente, sem meias-palavras e sem taxas ocultas.&rdquo;
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Na <strong>{siteConfig.companyName}</strong>, acreditamos que você merece ser atendido por quem realmente compreende
                  a complexidade das decisões financeiras. Por isso, nosso canal principal é direto e conduzido com seriedade para
                  que você saiba exatamente o que esperar antes de assinar qualquer contrato.
                </p>
              </div>

              {/* 3 Core Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Isenção total de taxas prévias</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-[#E5C07B] shrink-0 mt-0.5" />
                  <span>Diagnóstico orientativo e ágil</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Processamento seguro e confidencial</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl(
                    `Olá, ${siteConfig.responsible}! Gostaria de conversar sobre as soluções de crédito da ${siteConfig.companyName}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E5C07B] to-[#D4AF37] text-[#090D14] font-bold text-sm hover:brightness-105 transition-all shadow-md shadow-[#E5C07B]/10 group"
                >
                  <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Chamar {siteConfig.responsible} no WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Right Column: Responsible Profile Badge with Parallax Atmosphere */}
            <div ref={rightColRef} className="lg:col-span-5 flex flex-col items-center">
              
              <div className="w-full max-w-md rounded-2xl bg-[#090D14] border border-[#1E293B] overflow-hidden shadow-xl">
                
                {/* Visual Atmosphere Header with Parallax Scrub */}
                <div className="relative h-44 overflow-hidden border-b border-[#1E293B]">
                  <img
                    ref={parallaxImgRef}
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                    alt="Atendimento consultivo e humanizado na MV Soluções"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-[#090D14]/40 to-transparent" />
                  <div
                    ref={floatingBadgeRef}
                    className="absolute bottom-3 left-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#090D14]/80 backdrop-blur-md border border-[#1E293B] text-[10px] text-[#E5C07B] font-semibold uppercase tracking-wider will-change-transform"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Canal Oficial de Atendimento</span>
                  </div>
                </div>

                <div className="p-6 text-center space-y-3">
                  {/* Monogram Badge with 3D Pop-out Parallax */}
                  <div
                    ref={monogramRef}
                    className="w-16 h-16 -mt-12 mx-auto rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#121A28] border-2 border-[#334155] flex items-center justify-center text-xl font-display font-black text-[#E5C07B] shadow-2xl relative z-10 will-change-transform"
                  >
                    AJ
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold text-white tracking-tight">
                      {siteConfig.responsible}
                    </h4>
                    <p className="text-xs text-[#E5C07B] font-medium mt-0.5">
                      {siteConfig.role}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {siteConfig.companyName}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1E293B]/70 text-[11px] text-slate-400 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Disponível: {siteConfig.operatingHours}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
