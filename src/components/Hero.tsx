import { useState, useEffect, useRef } from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Zap, Lock, ChevronRight, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../data/siteConfig';
import { HeroCanvas } from './HeroCanvas';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface ProfileOption {
  id: string;
  tabLabel: string;
  title: string;
  badge: string;
  speed: string;
  summary: string;
  keyFeature: string;
  whatsappMsg: string;
}

const PROFILE_OPTIONS: ProfileOption[] = [
  {
    id: 'inss',
    tabLabel: 'INSS',
    title: 'Aposentados & Pensionistas',
    badge: 'Desconto em Folha',
    speed: 'Aprovação em ~2h',
    summary: 'Taxas reduzidas com débito direto no benefício e aprovação sem consulta ao SPC/Serasa.',
    keyFeature: 'Margem consignável legal com até 84 parcelas',
    whatsappMsg: `Olá, ${siteConfig.responsible}! Sou aposentado/pensionista do INSS e gostaria de consultar margem e condições para Consignado.`,
  },
  {
    id: 'fgts',
    tabLabel: 'FGTS / CLT',
    title: 'Trabalhador com Saldo FGTS',
    badge: 'Sem Boleto Mensal',
    speed: 'Crédito via Pix',
    summary: 'Antecipe até 10 parcelas do saque-aniversário sem comprometer seu salário do mês.',
    keyFeature: 'Débito automático no fundo a cada ano',
    whatsappMsg: `Olá, ${siteConfig.responsible}! Tenho saldo no FGTS e gostaria de simular a antecipação do Saque-Aniversário via Pix.`,
  },
  {
    id: 'servidor',
    tabLabel: 'Servidor',
    title: 'Servidores Públicos & Militares',
    badge: 'Condições Especiais',
    speed: 'Prazos até 96x',
    summary: 'Linhas exclusivas para servidores municipais, estaduais, federais e Forças Armadas.',
    keyFeature: 'Prazos estendidos e taxas diferenciadas de convênio',
    whatsappMsg: `Olá, ${siteConfig.responsible}! Sou servidor público e gostaria de cotar condições para crédito consignado.`,
  },
  {
    id: 'pessoal',
    tabLabel: 'Crédito Pessoal',
    title: 'Autônomos & Pessoas Físicas',
    badge: 'Sob Medida',
    speed: 'Análise em 24h',
    summary: 'Crédito estruturado com parcelas pré-fixadas e planejamento adequado à sua renda.',
    keyFeature: 'Avaliação personalizada para o seu momento financeiro',
    whatsappMsg: `Olá, ${siteConfig.responsible}! Gostaria de receber uma avaliação para Empréstimo Pessoal estruturado.`,
  },
];

export function Hero() {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('inss');
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);
  const trustBarRef = useRef<HTMLDivElement | null>(null);

  const currentProfile = PROFILE_OPTIONS.find((p) => p.id === selectedProfileId) || PROFILE_OPTIONS[0];
  const ambientGlow1Ref = useRef<HTMLDivElement | null>(null);
  const ambientGlow2Ref = useRef<HTMLDivElement | null>(null);
  const orbitRingRef = useRef<HTMLDivElement | null>(null);
  const floatingBadgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          titleRef.current,
          {
            y: 35,
            opacity: 0,
            duration: 1.1,
          },
          '-=0.5'
        )
        .from(
          descRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.7'
        )
        .from(
          ctaGroupRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          trustBarRef.current,
          {
            y: 15,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          rightColRef.current,
          {
            x: 40,
            opacity: 0,
            scale: 0.96,
            duration: 1.1,
          },
          '-=1.0'
        );

      // 2. Multi-plane Parallax on scroll using ScrollTrigger scrub
      // Left storytelling column moves down slowly creating a cinematic camera pan
      gsap.to(leftColRef.current, {
        y: 65,
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Right interactive card moves counter-wise with higher elevation
      gsap.to(rightColRef.current, {
        y: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Floating accent badge has independent foreground parallax
      if (floatingBadgeRef.current) {
        gsap.to(floatingBadgeRef.current, {
          y: -50,
          rotation: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Decorative ambient background glows with opposing speeds
      if (ambientGlow1Ref.current) {
        gsap.to(ambientGlow1Ref.current, {
          y: 90,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (ambientGlow2Ref.current) {
        gsap.to(ambientGlow2Ref.current, {
          y: -70,
          scale: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Decorative geometric orbit ring rotating and translating softly
      if (orbitRingRef.current) {
        gsap.to(orbitRingRef.current, {
          rotation: 40,
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
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
      id="hero-section"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Interactive Background Canvas */}
      <HeroCanvas />

      {/* Decorative gradient radial lights with multi-plane parallax drift */}
      <div
        ref={ambientGlow1Ref}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[450px] bg-[#E5C07B]/[0.12] rounded-full blur-[130px] pointer-events-none will-change-transform animate-pulse"
        style={{ animationDuration: '6s' }}
      />
      <div
        ref={ambientGlow2Ref}
        className="absolute top-1/3 right-6 w-[460px] h-[360px] bg-[#D4AF37]/[0.09] rounded-full blur-[120px] pointer-events-none will-change-transform"
      />
      <div
        className="absolute bottom-6 left-10 w-[380px] h-[280px] bg-[#1E3A8A]/25 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Decorative geometric orbit line for spatial architecture */}
      <div
        ref={orbitRingRef}
        className="absolute -right-20 top-1/4 w-[480px] h-[480px] rounded-full border border-[#E5C07B]/20 border-dashed pointer-events-none will-change-transform hidden lg:block"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Orbiting glowing node */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#E5C07B] shadow-[0_0_12px_#E5C07B]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#E5C07B] animate-ping opacity-60" />
        
        {/* Inner concentric ring */}
        <div className="absolute inset-10 rounded-full border border-[#E5C07B]/15 border-dotted" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Storytelling & Editorial Impact */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col space-y-7 text-left">
            
            {/* Tag / Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#101623]/80 border border-[#1E293B] text-xs text-slate-300 w-fit backdrop-blur-sm shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-[#E5C07B] animate-pulse" />
              <span className="font-medium tracking-wide uppercase text-[11px] text-[#E5C07B]">
                Assessoria de Crédito
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Atendimento Digital Nacional</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1
                ref={titleRef}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
              >
                Crédito estruturado com{' '}
                <span className="bg-gradient-to-r from-[#E5C07B] via-[#F3E8D0] to-[#D4AF37] bg-clip-text text-transparent italic">
                  clareza, agilidade
                </span>{' '}
                e respeito ao seu momento.
              </h1>
              <p
                ref={descRef}
                className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed pt-2"
              >
                Conectamos você às soluções mais vantajosas do mercado em <strong>Empréstimo Consignado</strong>,{' '}
                <strong>Antecipação do FGTS</strong> e <strong>Crédito Pessoal</strong>, com transparência total e respostas rápidas.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div ref={ctaGroupRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                id="hero-primary-whatsapp-btn"
                href={buildWhatsAppUrl(
                  `Olá, ${siteConfig.responsible}! Gostaria de conhecer as soluções de crédito da ${siteConfig.companyName} e receber uma orientação personalizada.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[#E5C07B] to-[#D4AF37] text-[#090D14] font-bold text-base hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-[#E5C07B]/15 group"
              >
                <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Conversar com Ailton Jr</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#simulador"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#101622] hover:bg-[#161F31] border border-[#1E293B] text-slate-200 hover:text-white font-semibold text-base transition-all group"
              >
                <span>Simulação Orientativa</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Credibility Micro-Points */}
            <div
              ref={trustBarRef}
              className="pt-4 border-t border-[#1E293B]/70 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Sem Taxa Prévia</p>
                  <p className="text-slate-400">Isenção total de adiantamentos</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#E5C07B]/10 text-[#E5C07B] border border-[#E5C07B]/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Aprovação Ágil</p>
                  <p className="text-slate-400">Liberação direta via Pix</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-500/10 text-slate-300 border border-slate-700">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Regulação Bacen</p>
                  <p className="text-slate-400">Instituições homologadas</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Profile Router (Agile Diagnostic) */}
          <div ref={rightColRef} className="lg:col-span-5 relative">
            
            {/* Ambient gold floating accent badge */}
            <div
              ref={floatingBadgeRef}
              className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A2438] border border-[#E5C07B]/40 shadow-xl backdrop-blur-md will-change-transform"
            >
              <Award className="w-3.5 h-3.5 text-[#E5C07B]" />
              <span className="text-[11px] font-bold text-slate-200">Correspondente Homologado</span>
            </div>

            <div className="relative rounded-2xl bg-gradient-to-b from-[#121A28] to-[#0D131F] border border-[#232D42] p-6 sm:p-7 shadow-2xl backdrop-blur-md">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E5C07B]" />
                  <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                    Qual é o seu perfil hoje?
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E293B] text-emerald-400 font-semibold border border-[#2A3852]">
                  {currentProfile.speed}
                </span>
              </div>

              {/* Profile Selector Chips */}
              <div className="grid grid-cols-2 gap-2 my-4">
                {PROFILE_OPTIONS.map((option) => {
                  const isSelected = option.id === selectedProfileId;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedProfileId(option.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between border ${
                        isSelected
                          ? 'bg-[#1E293B] text-[#E5C07B] border-[#E5C07B]/50 shadow-md shadow-[#E5C07B]/10'
                          : 'bg-[#0A0E17] text-slate-400 hover:text-slate-200 border-[#1E293B] hover:border-[#2A3852]'
                      }`}
                    >
                      <span>{option.tabLabel}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#E5C07B]' : 'bg-transparent'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Active Profile Recommendation Box */}
              <div className="space-y-4 pt-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                      Opção Recomendada:
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#E5C07B]/15 text-[#E5C07B] font-bold">
                      {currentProfile.badge}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-white tracking-tight">
                    {currentProfile.title}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {currentProfile.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#090D14]/80 border border-[#1E293B] text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{currentProfile.keyFeature}</span>
                </div>

                {/* WhatsApp Action Button for this profile */}
                <div className="pt-2">
                  <a
                    href={buildWhatsAppUrl(currentProfile.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E5C07B] to-[#D4AF37] hover:brightness-110 text-[#090D14] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#E5C07B]/10 group"
                  >
                    <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Consultar {currentProfile.tabLabel} no WhatsApp</span>
                  </a>
                </div>

                {/* Fast link to full simulator */}
                <div className="text-center pt-1">
                  <a
                    href="#simulador"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#E5C07B] transition-colors"
                  >
                    <span>Deseja calcular parcelas? Abrir simulador detalhado</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
