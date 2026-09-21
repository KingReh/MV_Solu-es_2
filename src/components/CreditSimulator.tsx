import { useState, useEffect, useRef } from 'react';
import { Calculator, MessageSquare, Send, ShieldAlert, Sparkles, User, Phone, Briefcase, FileText } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../data/siteConfig';
import { LoanCategory } from '../types';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { SectionAmbientCanvas } from './SectionAmbientCanvas';

export function CreditSimulator() {
  const [category, setCategory] = useState<LoanCategory>('pessoal');
  const [amount, setAmount] = useState<number>(10000);
  const [installments, setInstallments] = useState<number>(36);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('Profissional CLT / Autônomo');
  const [customNote, setCustomNote] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const formColRef = useRef<HTMLDivElement | null>(null);
  const previewColRef = useRef<HTMLDivElement | null>(null);
  const ambientGlow1Ref = useRef<HTMLDivElement | null>(null);
  const ambientGlow2Ref = useRef<HTMLDivElement | null>(null);
  const decorRingRef = useRef<HTMLDivElement | null>(null);

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

      // Reveal Header
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

      // Reveal Columns with Stagger
      gsap.from([formColRef.current, previewColRef.current], {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formColRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Elevated parallax scrub on the preview ticket column
      gsap.to(previewColRef.current, {
        y: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Multi-plane parallax on background ambient glows
      if (ambientGlow1Ref.current) {
        gsap.to(ambientGlow1Ref.current, {
          y: 95,
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
          y: -80,
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

      // Decorative architectural ring
      if (decorRingRef.current) {
        gsap.to(decorRingRef.current, {
          y: 60,
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

  const amountPresets = [3000, 5000, 10000, 20000, 35000, 50000];

  const categoryLabels: Record<LoanCategory, string> = {
    pessoal: 'Empréstimo Pessoal',
    consignado: 'Empréstimo Consignado',
    analise: 'Análise de Crédito / Avaliação',
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Build the structured WhatsApp message
  const generatedMessage = `Olá, ${siteConfig.responsible}! Gostaria de fazer uma simulação personalizada na ${siteConfig.companyName}.

📋 *DADOS DA MINHA CONSULTA:*
• *Modalidade:* ${categoryLabels[category]}
• *Valor Pretendido:* ${formatCurrency(amount)}
• *Prazo Estimado Desejado:* ${installments}x
• *Nome:* ${fullName.trim() || '[Não informado]'}
• *Telefone/WhatsApp:* ${phone.trim() || '[Informado no próprio chat]'}
• *Perfil/Ocupação:* ${occupation}
${customNote.trim() ? `• *Observação:* ${customNote.trim()}` : ''}

Por favor, como podemos proceder com a avaliação das opções disponíveis?`;

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(generatedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      ref={sectionRef}
      id="simulador"
      className="py-24 relative bg-[#0B101A] border-t border-[#1E293B] overflow-hidden"
    >
      {/* Interactive Background Canvas */}
      <SectionAmbientCanvas variant="particles" />

      {/* Background ambient glow with multi-plane parallax */}
      <div
        ref={ambientGlow1Ref}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[520px] h-[520px] bg-[#E5C07B]/[0.10] rounded-full blur-[130px] pointer-events-none will-change-transform animate-pulse"
        style={{ animationDuration: '7s' }}
      />
      <div
        ref={ambientGlow2Ref}
        className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#D4AF37]/[0.08] rounded-full blur-[120px] pointer-events-none will-change-transform"
      />
      <div
        className="absolute top-10 right-1/4 w-[350px] h-[350px] bg-[#1E3A8A]/20 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Decorative architectural circle accent with orbiting beacon */}
      <div
        ref={decorRingRef}
        className="absolute -right-16 top-1/4 w-72 h-72 rounded-full border border-[#E5C07B]/20 border-dashed pointer-events-none will-change-transform hidden lg:block"
        style={{ transformOrigin: 'center center' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#E5C07B] shadow-[0_0_12px_#E5C07B]" />
        <div className="absolute inset-8 rounded-full border border-[#E5C07B]/10 border-dotted" />
      </div>

      <div ref={contentWrapperRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101622] border border-[#1E293B] text-xs font-semibold uppercase tracking-widest text-[#E5C07B]">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador Orientativo & Atendimento WhatsApp</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Monte sua intenção de crédito em segundos.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Ajuste o valor e a modalidade desejada. Ao clicar em enviar, uma mensagem estruturada será criada para atendimento direto com{' '}
            <strong className="text-slate-200">{siteConfig.responsible}</strong>.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div
            ref={formColRef}
            className="lg:col-span-7 bg-[#101622] border border-[#1E293B] rounded-3xl p-6 sm:p-8 shadow-xl space-y-7"
          >
            
            {/* Step 1: Select Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                1. Selecione a Modalidade
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['pessoal', 'consignado', 'analise'] as LoanCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                      category === cat
                        ? 'bg-gradient-to-r from-[#1A2333] to-[#141C2B] text-[#E5C07B] border-[#E5C07B]/50 shadow-md'
                        : 'bg-[#090D14] text-slate-400 border-[#1E293B] hover:text-white hover:border-[#334155]'
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Amount Slider & Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  2. Valor Estimado Pretendido
                </label>
                <span className="font-display text-2xl font-bold text-[#E5C07B]">
                  {formatCurrency(amount)}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#E5C07B] transition-all"
              />

              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>R$ 1.000</span>
                <span>R$ 50.000</span>
                <span>R$ 100.000+</span>
              </div>

              {/* Amount Quick Presets */}
              <div className="flex flex-wrap gap-2 mt-3">
                {amountPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      amount === preset
                        ? 'bg-[#E5C07B] text-[#090D14] font-bold'
                        : 'bg-[#090D14] text-slate-400 hover:text-white border border-[#1E293B]'
                    }`}
                  >
                    {formatCurrency(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Installments */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                3. Prazo Estimado Desejado: <span className="text-[#E5C07B] font-bold">{installments} meses</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {[12, 24, 36, 48, 60, 72, 84].map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setInstallments(inst)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition-all ${
                      installments === inst
                        ? 'bg-[#E5C07B] text-[#090D14] border-[#E5C07B]'
                        : 'bg-[#090D14] text-slate-400 border-[#1E293B] hover:text-white'
                    }`}
                  >
                    {inst}x
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Contact fields to personalize the WhatsApp message */}
            <div className="pt-3 border-t border-[#1E293B] space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                4. Seus Dados para Atendimento Personalizado
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#090D14] border border-[#1E293B] focus:border-[#E5C07B] text-slate-200 placeholder-slate-600 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      placeholder="Seu WhatsApp (com DDD)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#090D14] border border-[#1E293B] focus:border-[#E5C07B] text-slate-200 placeholder-slate-600 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <select
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#090D14] border border-[#1E293B] focus:border-[#E5C07B] text-slate-200 text-xs focus:outline-none transition-colors"
                    >
                      <option value="Aposentado ou Pensionista INSS">Aposentado ou Pensionista INSS</option>
                      <option value="Servidor Público">Servidor Público (Federal/Estadual/Municipal)</option>
                      <option value="Militar das Forças Armadas">Militar das Forças Armadas</option>
                      <option value="Profissional CLT / Carteira Assinada">Profissional CLT / Carteira Assinada</option>
                      <option value="Profissional Autônomo / Empresário">Profissional Autônomo / Empresário</option>
                      <option value="Outro perfil">Outro perfil</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Alguma observação (opcional)"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#090D14] border border-[#1E293B] focus:border-[#E5C07B] text-slate-200 placeholder-slate-600 text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: WhatsApp Dispatch Card & Transparent Notice */}
          <div ref={previewColRef} className="lg:col-span-5 space-y-5">
            
            {/* Structured Message Ticket */}
            <div className="rounded-3xl bg-gradient-to-b from-[#121A2A] to-[#0E1420] border border-[#2A3852] p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Pré-visualização da Consulta
                  </span>
                </div>
                <span className="text-[11px] text-[#E5C07B] font-semibold">
                  Envio para {siteConfig.responsible}
                </span>
              </div>

              {/* Message Box */}
              <div className="my-5 p-4 rounded-2xl bg-[#090D14] border border-[#1E293B] font-mono text-[12px] text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-[#E5C07B]/30">
                {generatedMessage}
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#E5C07B] to-[#D4AF37] text-[#090D14] font-bold text-sm flex items-center justify-center gap-3 hover:brightness-105 active:scale-[0.98] transition-all shadow-xl shadow-[#E5C07B]/20 group cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Enviar Simulação no WhatsApp</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#101622] hover:bg-[#151E2E] border border-[#1E293B] text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  {copied ? '✓ Mensagem copiada com sucesso!' : 'Copiar texto da mensagem'}
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E293B]/70 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-[#E5C07B]" />
                <span>Atendimento humanizado sem espera excessiva</span>
              </div>
            </div>

            {/* Strict Regulatory Notice (adhering to rule: no fake rates, clear explanation) */}
            <div className="rounded-2xl bg-[#101622]/90 border border-[#1E293B] p-4 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-[#E5C07B] font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>Nota de Transparência e Segurança</span>
              </div>
              <p className="leading-relaxed">
                Esta simulação possui caráter meramente orientativo. As taxas de juros, CET (Custo Efetivo Total),
                prazos e valor final das parcelas são estipulados de acordo com a política de crédito das instituições
                financeiras parceiras após análise formal do CPF e documentação.
              </p>
              <p className="text-[11px] text-slate-500">
                A {siteConfig.companyName} nunca solicita adiantamentos ou depósitos para aprovação ou liberação de qualquer modalidade de crédito.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
