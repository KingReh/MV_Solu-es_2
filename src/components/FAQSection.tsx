import { useState, useEffect, useRef, useMemo } from 'react';
import {
  ChevronDown,
  MessageSquare,
  HelpCircle,
  Search,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  Clock,
  FileText,
  Landmark,
  Phone,
  Sparkles,
  X,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { faqData, siteConfig, buildWhatsAppUrl } from '../data/siteConfig';
import { FAQItem } from '../types';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { SectionAmbientCanvas } from './SectionAmbientCanvas';

type CategoryFilter = 'todas' | 'seguranca' | 'consignado' | 'documentos' | 'prazos' | 'pessoal';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('todas');

  const sectionRef = useRef<HTMLElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const searchFilterRef = useRef<HTMLDivElement | null>(null);
  const faqListRef = useRef<HTMLDivElement | null>(null);
  const supportCardRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);

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
      if (headerRef.current) {
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
      }

      // 2. Reveal Search and Filters
      if (searchFilterRef.current) {
        gsap.from(searchFilterRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: searchFilterRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 3. Staggered FAQ Items Reveal
      if (faqListRef.current) {
        gsap.from(faqListRef.current, {
          y: 35,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqListRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 4. Reveal Support Card
      if (supportCardRef.current) {
        gsap.from(supportCardRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: supportCardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 5. Parallax on ambient glow
      if (ambientGlowRef.current) {
        gsap.to(ambientGlowRef.current, {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  // Filter logic: search query and category pill
  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        selectedCategory === 'todas' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        (item.highlights && item.highlights.some((h) => h.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const categories = [
    { id: 'todas', label: 'Todas as Dúvidas', icon: HelpCircle },
    { id: 'seguranca', label: 'Segurança & Golpes', icon: ShieldCheck },
    { id: 'consignado', label: 'Consignado & FGTS', icon: Landmark },
    { id: 'pessoal', label: 'Crédito Pessoal & Restrição', icon: Sparkles },
    { id: 'documentos', label: 'Documentação', icon: FileText },
    { id: 'prazos', label: 'Prazos & Liberação', icon: Clock },
  ];

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 relative bg-[#090D14] border-t border-[#1E293B] overflow-hidden"
    >
      {/* Interactive Background Canvas */}
      <SectionAmbientCanvas variant="subtle" />

      {/* Background ambient lighting with parallax */}
      <div
        ref={ambientGlowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#F59E0B]/[0.08] rounded-full blur-[140px] pointer-events-none will-change-transform animate-pulse"
        style={{ animationDuration: '7.5s' }}
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 bg-[#1E3A8A]/20 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        className="absolute top-10 right-10 w-72 h-72 bg-[#E5C07B]/[0.06] rounded-full blur-[110px] pointer-events-none"
      />

      {/* Decorative architectural circle accent with orbiting beacon */}
      <div
        className="absolute -left-16 top-1/3 w-72 h-72 rounded-full border border-[#E5C07B]/20 border-dashed pointer-events-none hidden lg:block"
        style={{ transformOrigin: 'center center' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#E5C07B] shadow-[0_0_12px_#E5C07B]" />
        <div className="absolute inset-8 rounded-full border border-[#E5C07B]/10 border-dotted" />
      </div>

      <div ref={contentWrapperRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center space-y-3 mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#223048] text-xs font-semibold uppercase tracking-widest text-[#E5C07B]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Central de Esclarecimentos & Transparência</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#E5C07B] to-[#D97706]">Frequentes</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Respostas claras e transparentes sobre modalidades de crédito, prazos de liberação, documentação e conformidade regulamentar na {siteConfig.companyName}.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div ref={searchFilterRef} className="space-y-4 mb-10 max-w-4xl mx-auto">
          
          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar dúvida... ex: FGTS, antecipado, documentos, INSS, prazos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#0D131F] border border-[#202C3F] focus:border-[#F59E0B] text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all shadow-lg shadow-black/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
                title="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E5C07B] text-[#090D14] shadow-md shadow-[#E5C07B]/20 font-bold'
                      : 'bg-[#0E1420] text-slate-400 hover:text-slate-200 border border-[#1E293B] hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Main Content Layout: FAQ List (8 cols) + Support Panel (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Accordion Items */}
          <div ref={faqListRef} className="lg:col-span-8 space-y-4">
            
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center rounded-3xl bg-[#0E1420] border border-[#1E293B] space-y-4">
                <HelpCircle className="w-10 h-10 text-[#E5C07B] mx-auto opacity-70" />
                <h3 className="font-display font-bold text-white text-base">
                  Nenhuma dúvida encontrada para "{searchQuery}"
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Não se preocupe! Você pode falar diretamente com nossa equipe no WhatsApp para tirar sua dúvida específica agora mesmo.
                </p>
                <div className="pt-2">
                  <a
                    href={buildWhatsAppUrl(
                      `Olá, ${siteConfig.responsible}! Tenho uma dúvida que não encontrei no site: "${searchQuery}". Poderia me ajudar?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#090D14] font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-[#F59E0B]/20 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Perguntar no WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              filteredFaqs.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-[#101726] border-[#F59E0B]/40 shadow-xl shadow-black/60'
                        : 'bg-[#0E1420] border-[#1C2638] hover:border-[#2C3B54]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={isOpen}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 text-slate-200 hover:text-white transition-colors focus:outline-none cursor-pointer group"
                    >
                      <div className="space-y-1.5 pr-2">
                        {item.badge && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/25">
                            {item.badge}
                          </span>
                        )}
                        <h3 className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-[#E5C07B] transition-colors leading-snug">
                          {item.question}
                        </h3>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 mt-0.5 ${
                          isOpen
                            ? 'bg-[#E5C07B] text-[#090D14] border-[#E5C07B] rotate-180 shadow-md shadow-[#E5C07B]/30'
                            : 'bg-[#141C2B] text-slate-400 border-[#243046] group-hover:text-white group-hover:border-slate-600'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1C2638] bg-[#0A0F18]/70 space-y-4">
                        <p>{item.answer}</p>

                        {/* Security Alert Callout */}
                        {item.alert && (
                          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                            <ShieldAlert className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-medium">{item.alert}</span>
                          </div>
                        )}

                        {/* Bullet Highlights */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] uppercase tracking-wider font-bold text-[#E5C07B] block">
                              Pontos de Destaque:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {item.highlights.map((highlight, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="flex items-center gap-2 text-xs text-slate-300 bg-[#121A28]/80 p-2 rounded-lg border border-[#1E2B3E]"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contextual WhatsApp Trigger Button */}
                        <div className="pt-2 flex items-center justify-between border-t border-[#1A2436] text-[11px] text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-[#E5C07B]" />
                            <span>Atendimento individual e confidencial</span>
                          </span>

                          <a
                            href={buildWhatsAppUrl(
                              `Olá, ${siteConfig.responsible}! Gostaria de tirar uma dúvida sobre: "${item.question}".`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#E5C07B] hover:text-white font-semibold transition-colors cursor-pointer group/btn"
                          >
                            <span>Conversar sobre isso</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}

          </div>

          {/* Right Column: Sticky Quick Help & Official Channel Card */}
          <div ref={supportCardRef} className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            
            {/* Direct Support Card */}
            <div className="rounded-3xl bg-gradient-to-b from-[#111828] to-[#0A0E17] border border-[#233148] p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5">
              
              {/* Card Aura */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#F59E0B]/[0.035] rounded-full blur-2xl pointer-events-none" />

              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Canal Oficial Aberto
                  </span>
                </div>
                <span className="text-[11px] text-[#E5C07B] font-semibold">
                  Resposta Rápida
                </span>
              </div>

              {/* Specialist Profile Teaser */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#121A28] border border-[#334155] flex items-center justify-center text-base font-display font-black text-[#E5C07B]">
                    AJ
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">
                      {siteConfig.responsible}
                    </h4>
                    <p className="text-[11px] text-[#E5C07B]">{siteConfig.role}</p>
                    <p className="text-[10px] text-slate-400">Atendimento humanizado</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2">
                  Tem uma situação específica com sua margem, benefício ou saldo do FGTS? Fazemos o levantamento das possibilidades sem qualquer custo.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={buildWhatsAppUrl(
                    `Olá, ${siteConfig.responsible}! Estou na seção de Dúvidas e gostaria de conversar sobre a melhor opção para o meu perfil.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#090D14] font-bold text-xs flex items-center justify-center gap-2.5 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#F59E0B]/25 group cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Falar com Ailton Jr no WhatsApp</span>
                </a>

                <a
                  href="tel:67998827010"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#121A28] hover:bg-[#182336] border border-[#1E293B] text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E5C07B]" />
                  <span>Ligar: (67) 99882-7010</span>
                </a>
              </div>

              {/* Guarantees Box */}
              <div className="pt-4 border-t border-[#1E293B] space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>100% Gratuito: Zero taxas antecipadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{siteConfig.operatingHours}</span>
                </div>
              </div>

            </div>

            {/* Quick Question Prompts */}
            <div className="p-5 rounded-2xl bg-[#0B1019] border border-[#1A2536] space-y-2.5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                Tópicos Mais Procurados:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Cobrança antecipada',
                  'Margem consignável',
                  'Antecipação FGTS',
                  'Negativado',
                  'Prazos via Pix',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-[#121926] hover:bg-[#1B2638] text-[11px] text-slate-300 hover:text-[#E5C07B] border border-[#1E293B] transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
