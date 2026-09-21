import { useEffect, useRef } from 'react';
import { Clock, ArrowRight, MessageSquare, Compass } from 'lucide-react';
import { journeySteps, siteConfig, buildWhatsAppUrl } from '../data/siteConfig';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { SectionAmbientCanvas } from './SectionAmbientCanvas';

export function JourneySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const ambientGlow1Ref = useRef<HTMLDivElement | null>(null);
  const ambientGlow2Ref = useRef<HTMLDivElement | null>(null);
  const decorLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Master Section Entrance (Fade-in and Slide-up)
      if (contentWrapperRef.current) {
        gsap.from(contentWrapperRef.current, {
          y: 45,
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

      // 1. Reveal Header
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

      // 2. Sequential Step Cards Stagger
      const stepCards = gsap.utils.toArray<HTMLElement>('.journey-card');
      gsap.from(stepCards, {
        y: 50,
        opacity: 0,
        scale: 0.94,
        stagger: 0.18,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // 3. Parallax Scrub on Step Numbers
      const numbers = gsap.utils.toArray<HTMLElement>('.journey-step-number');
      numbers.forEach((num, idx) => {
        gsap.to(num, {
          y: idx % 2 === 0 ? -20 : 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });

      // 4. Parallax on ambient glow elements
      if (ambientGlow1Ref.current) {
        gsap.to(ambientGlow1Ref.current, {
          y: 90,
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
          y: -75,
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

      // 5. Parallax on background connecting timeline guideline
      if (decorLineRef.current) {
        gsap.to(decorLineRef.current, {
          x: 40,
          opacity: 0.8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // 6. Reveal Bottom CTA Banner
      gsap.from(bannerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="jornada" className="py-24 relative bg-[#090D14] overflow-hidden">
      {/* Interactive Background Canvas */}
      <SectionAmbientCanvas variant="flow" />

      {/* Background ambient lighting with parallax */}
      <div
        ref={ambientGlow1Ref}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#E5C07B]/[0.10] rounded-full blur-[130px] pointer-events-none will-change-transform animate-pulse"
        style={{ animationDuration: '7s' }}
      />
      <div
        ref={ambientGlow2Ref}
        className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-[#D4AF37]/[0.08] rounded-full blur-[120px] pointer-events-none will-change-transform"
      />
      <div
        className="absolute bottom-10 left-1/3 w-[360px] h-[360px] bg-[#1E3A8A]/20 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Decorative timeline connecting background beam */}
      <div
        ref={decorLineRef}
        className="absolute top-1/2 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#E5C07B]/25 to-transparent pointer-events-none will-change-transform hidden lg:block shadow-[0_0_10px_rgba(229,192,123,0.3)]"
      />

      <div ref={contentWrapperRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101622] border border-[#1E293B] text-xs font-semibold uppercase tracking-widest text-[#E5C07B]">
            <Compass className="w-3.5 h-3.5" />
            <span>Passo a Passo Descomplicado</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Como acontece o seu atendimento.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Eliminamos filas e intermediários. Da primeira mensagem à liberação dos recursos,
            você é acompanhado em cada etapa com total transparência.
          </p>
        </div>

        {/* 4-Step Timeline Grid with GSAP Stagger */}
        <div ref={stepsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {journeySteps.map((step, index) => (
            <div
              key={step.step}
              className="journey-card relative rounded-2xl bg-[#101622] border border-[#1E293B] p-6 flex flex-col justify-between hover:border-[#E5C07B]/40 transition-colors duration-300 group shadow-lg"
            >
              <div>
                {/* Step number badge & timing */}
                <div className="flex items-center justify-between mb-5">
                  <span className="journey-step-number font-display text-3xl font-extrabold text-slate-600 group-hover:text-[#E5C07B] transition-colors">
                    {step.step}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#090D14] border border-[#1E293B] text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-[#E5C07B]" />
                    <span>{step.timing}</span>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-1 tracking-tight">
                  {step.title}
                </h3>
                <span className="text-xs text-[#E5C07B] font-medium block mb-3">
                  {step.subtitle}
                </span>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress track cue */}
              <div className="pt-6 mt-4 border-t border-[#1E293B]/70 flex items-center justify-between text-[11px] text-slate-500">
                <span>Etapa {index + 1} de 4</span>
                <div className="w-6 h-[2px] bg-[#1E293B] group-hover:bg-[#E5C07B] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Track CTA */}
        <div
          ref={bannerRef}
          className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#111724] via-[#141C2B] to-[#111724] border border-[#232F47] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl"
        >
          <div className="space-y-1 max-w-xl">
            <h4 className="font-display text-xl font-bold text-white">
              Pronto para dar o primeiro passo com segurança?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Converse diretamente com <strong className="text-white">{siteConfig.responsible}</strong> pelo WhatsApp sem nenhum compromisso.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl(
              `Olá, ${siteConfig.responsible}! Gostaria de dar o primeiro passo e entender minhas possibilidades de crédito na ${siteConfig.companyName}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E5C07B] to-[#D4AF37] text-[#090D14] font-bold text-sm hover:brightness-105 transition-all shrink-0 shadow-lg shadow-[#E5C07B]/10 group"
          >
            <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Iniciar no WhatsApp</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
