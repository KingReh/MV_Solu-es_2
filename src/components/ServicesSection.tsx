import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Check, ArrowRight, UserCheck, Landmark, ShieldCheck, Sparkles } from 'lucide-react';
import { servicesData, siteConfig, buildWhatsAppUrl } from '../data/siteConfig';
import { LoanCategory } from '../types';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { SectionAmbientCanvas } from './SectionAmbientCanvas';

interface ServiceVisual {
  imageUrl: string;
  imageAlt: string;
  caption: string;
}

const serviceVisuals: Record<LoanCategory, ServiceVisual> = {
  pessoal: {
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Planejamento e organização financeira pessoal',
    caption: 'Autonomia para concretizar planos e reorganizar suas metas com tranquilidade.',
  },
  consignado: {
    imageUrl:
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Segurança financeira e estabilidade para aposentados e servidores',
    caption: 'Prazos estendidos e tranquilidade de parcelas fixas descontadas em folha.',
  },
  analise: {
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Arquitetura e diagnóstico de crédito estratégico',
    caption: 'Avaliação técnica e consultiva para encontrar a melhor rota para seu perfil.',
  },
};

export function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<LoanCategory>('pessoal');
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const tabsNavRef = useRef<HTMLDivElement | null>(null);
  const showcaseCardRef = useRef<HTMLDivElement | null>(null);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const parallaxImgRef = useRef<HTMLImageElement | null>(null);
  const imgFloatingTagRef = useRef<HTMLDivElement | null>(null);
  const detailsContentRef = useRef<HTMLDivElement | null>(null);
  const ambientGlow1Ref = useRef<HTMLDivElement | null>(null);
  const ambientGlow2Ref = useRef<HTMLDivElement | null>(null);
  const decorRingRef = useRef<HTMLDivElement | null>(null);

  const selectedService = servicesData.find((s) => s.id === selectedCategory) || servicesData[0];
  const currentVisual = serviceVisuals[selectedCategory];

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

      // 1. Staggered reveal for Header (Badge, Title, Description)
      if (headerRef.current) {
        const headerChildren = headerRef.current.children;
        gsap.from(headerChildren, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 2. Staggered entrance for Category Navigation Tabs
      if (tabsNavRef.current) {
        gsap.from(tabsNavRef.current, {
          y: 30,
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tabsNavRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 3. Staggered reveal of Showcase Card & Internal Sub-elements
      if (showcaseCardRef.current) {
        // Main container reveal
        gsap.from(showcaseCardRef.current, {
          y: 55,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: showcaseCardRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });

        // Staggered internal blocks reveal (image wrapper, highlights items, requirements)
        const highlightItems = gsap.utils.toArray<HTMLElement>('.service-highlight-item');
        if (highlightItems.length > 0) {
          gsap.from(highlightItems, {
            x: 25,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: showcaseCardRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        const audienceItems = gsap.utils.toArray<HTMLElement>('.service-audience-item');
        if (audienceItems.length > 0) {
          gsap.from(audienceItems, {
            x: -20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: showcaseCardRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }

      // 4. Dynamic Image Scroll-Scale Transformation & Parallax Scrub
      // Scales image down smoothly from 1.28 to 1.04 while moving vertically
      if (parallaxImgRef.current && showcaseCardRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          {
            scale: 1.28,
            yPercent: -14,
          },
          {
            scale: 1.04,
            yPercent: 14,
            ease: 'none',
            scrollTrigger: {
              trigger: showcaseCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 5. Image Wrapper subtle 3D-tilt / depth scale on scroll
      if (imgWrapperRef.current && showcaseCardRef.current) {
        gsap.fromTo(
          imgWrapperRef.current,
          {
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          },
          {
            boxShadow: '0 25px 50px -12px rgba(229,192,123,0.15)',
            ease: 'none',
            scrollTrigger: {
              trigger: showcaseCardRef.current,
              start: 'top center',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // 6. Floating Tag multi-plane parallax
      if (imgFloatingTagRef.current && showcaseCardRef.current) {
        gsap.to(imgFloatingTagRef.current, {
          y: -32,
          ease: 'none',
          scrollTrigger: {
            trigger: showcaseCardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // 7. Ambient background glows parallax scrub
      if (ambientGlow1Ref.current) {
        gsap.to(ambientGlow1Ref.current, {
          y: 95,
          scale: 1.15,
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

      // 8. Decorative geometric ring parallax rotation & drift
      if (decorRingRef.current) {
        gsap.to(decorRingRef.current, {
          y: 70,
          rotation: 35,
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

  // Animate content and image smoothly on tab switch
  const handleCategoryChange = (category: LoanCategory) => {
    if (category === selectedCategory) return;

    if (detailsContentRef.current) {
      gsap.to(detailsContentRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedCategory(category);
          
          // Animate details container back in
          gsap.to(detailsContentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });

          // Animate new image reveal with scale transition
          if (parallaxImgRef.current) {
            gsap.fromTo(
              parallaxImgRef.current,
              { scale: 1.24, filter: 'blur(3px)' },
              {
                scale: 1.06,
                filter: 'blur(0px)',
                duration: 0.65,
                ease: 'power2.out',
              }
            );
          }
        },
      });
    } else {
      setSelectedCategory(category);
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#E5C07B]" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-[#E5C07B]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#E5C07B]" />;
      default:
        return <UserCheck className="w-5 h-5 text-[#E5C07B]" />;
    }
  };

  return (
    <section ref={sectionRef} id="servicos" className="py-24 relative bg-[#090D14] overflow-hidden">
      {/* Interactive Background Canvas */}
      <SectionAmbientCanvas variant="waves" />

      {/* Background ambient lights with multi-plane parallax drift */}
      <div
        ref={ambientGlow1Ref}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#E5C07B]/[0.10] rounded-full blur-[130px] pointer-events-none will-change-transform animate-pulse"
        style={{ animationDuration: '6.5s' }}
      />
      <div
        ref={ambientGlow2Ref}
        className="absolute bottom-1/4 -left-12 w-[420px] h-[420px] bg-[#D4AF37]/[0.08] rounded-full blur-[120px] pointer-events-none will-change-transform"
      />
      <div
        className="absolute top-1/2 left-1/3 w-[360px] h-[360px] bg-[#1E3A8A]/20 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Decorative architectural circle accent with orbiting beacon */}
      <div
        ref={decorRingRef}
        className="absolute -left-20 top-1/3 w-80 h-80 rounded-full border border-[#E5C07B]/20 border-dashed pointer-events-none will-change-transform hidden lg:block"
        style={{ transformOrigin: 'center center' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#E5C07B] shadow-[0_0_12px_#E5C07B]" />
        <div className="absolute inset-8 rounded-full border border-[#E5C07B]/10 border-dotted" />
      </div>

      <div ref={contentWrapperRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101622] border border-[#1E293B] text-xs font-semibold uppercase tracking-widest text-[#E5C07B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Linhas de Crédito & Atuação</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Soluções desenhadas para a sua realidade.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Cada cliente possui uma demanda única. Conheça as modalidades operadas pela{' '}
            <strong className="text-slate-200">{siteConfig.companyName}</strong> e converse diretamente com{' '}
            <strong className="text-slate-200">{siteConfig.responsible}</strong>.
          </p>
        </div>

        {/* Category Navigation Bar (Interactive Tabs) */}
        <div ref={tabsNavRef} className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#101622] border border-[#1E293B] rounded-2xl max-w-2xl w-full">
            {servicesData.map((service) => {
              const isActive = selectedCategory === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleCategoryChange(service.id)}
                  className={`flex-1 py-3 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1A2333] to-[#161F31] text-[#E5C07B] shadow-md border border-[#2A3852]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="hidden sm:inline">{getServiceIcon(service.iconName)}</span>
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Service Detailed Showcase with Parallax & Scroll Scale Image */}
        <div
          ref={showcaseCardRef}
          className="rounded-3xl bg-gradient-to-b from-[#111724] to-[#0D121D] border border-[#1E293B] p-6 sm:p-10 shadow-2xl transition-all"
        >
          <div ref={detailsContentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left overview & Parallax Editorial Image */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#1A2436] border border-[#2D3E5E]">
                    {getServiceIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#E5C07B] uppercase tracking-wider block">
                      {selectedService.badge}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
                  {selectedService.description}
                </p>

                {/* Editorial Parallax Image Container with Scroll Scale Transformation */}
                <div
                  ref={imgWrapperRef}
                  className="mt-5 relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-[#222E42] group shadow-inner transition-shadow"
                >
                  {/* Floating Depth Tag */}
                  <div
                    ref={imgFloatingTagRef}
                    className="absolute top-3 right-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#090D14]/85 border border-[#E5C07B]/40 backdrop-blur-md text-[11px] font-semibold text-[#E5C07B] shadow-xl"
                  >
                    <Sparkles className="w-3 h-3 text-[#E5C07B]" />
                    <span>Assessoria {siteConfig.companyName}</span>
                  </div>

                  <img
                    ref={parallaxImgRef}
                    src={currentVisual.imageUrl}
                    alt={currentVisual.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover will-change-transform"
                    style={{ transformOrigin: 'center center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-[#090D14]/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-[11px] text-slate-300 font-medium bg-[#090D14]/85 backdrop-blur-md px-3 py-2 rounded-xl border border-[#1E293B]">
                    {currentVisual.caption}
                  </div>
                </div>

                {/* Target Audience List */}
                <div className="mt-6 pt-5 border-t border-[#1E293B]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Para quem é indicado:
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedService.targetAudience.map((item, idx) => (
                      <li key={idx} className="service-audience-item flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href={buildWhatsAppUrl(selectedService.whatsappDefaultMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[#E5C07B] to-[#D4AF37] text-[#090D14] font-bold text-sm hover:brightness-105 transition-all shadow-lg shadow-[#E5C07B]/15 group w-full sm:w-auto"
                >
                  <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Consultar Condições para {selectedService.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right column: Highlights and Documentation Check */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Highlights Card */}
              <div className="p-6 rounded-2xl bg-[#090D14]/80 border border-[#1E293B]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5C07B] mb-4">
                  Diferenciais desta Solução:
                </h4>
                <div className="space-y-3">
                  {selectedService.highlights.map((highlight, idx) => (
                    <div key={idx} className="service-highlight-item flex items-start gap-3">
                      <div className="p-1 rounded bg-[#E5C07B]/10 text-[#E5C07B] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transparent Checklist */}
              <div className="p-6 rounded-2xl bg-[#090D14]/80 border border-[#1E293B]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                  Documentação Básica Solicitada:
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Para agilizar a análise com os bancos parceiros, tenha à mão os seguintes itens:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.requirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-lg bg-[#141B29] border border-[#232E45] text-xs text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-[#1E293B]/70 text-[11px] text-slate-500">
                  Importante: Todos os documentos são enviados de forma segura e avaliados estritamente conforme a LGPD.
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
