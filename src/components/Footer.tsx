import { useEffect, useRef } from 'react';
import { Shield, MessageSquare, ArrowUp, Lock } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../data/siteConfig';
import { gsap, ScrollTrigger } from '../lib/gsap';

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const upperGridRef = useRef<HTMLDivElement | null>(null);
  const disclaimerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Master Footer Entrance
      gsap.from(footerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Reveal Upper Footer Grid columns
      if (upperGridRef.current) {
        gsap.from(upperGridRef.current.children, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: upperGridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 2. Reveal Disclaimer & Bottom Bar
      if (disclaimerRef.current) {
        gsap.from(disclaimerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: disclaimerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      id="main-footer"
      className="bg-[#070A10] border-t border-[#1E293B] pt-16 pb-12 text-slate-400 text-xs overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper Footer Grid */}
        <div ref={upperGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center font-display font-black text-[#E5C07B] text-sm">
                MV
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                {siteConfig.companyName}
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Assessoria e intermediação de crédito sob medida. Atendimento humanizado, transparente e desburocratizado conduzido por{' '}
              <strong className="text-slate-200">{siteConfig.responsible}</strong>.
            </p>

            <div className="inline-flex items-center gap-2 text-[11px] text-emerald-400 px-3 py-1.5 rounded-lg bg-[#0E1522] border border-[#1E293B]">
              <Lock className="w-3.5 h-3.5" />
              <span>Ambiente digital seguro e em conformidade com a LGPD</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-semibold text-slate-200 uppercase tracking-wider text-xs">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#servicos" className="hover:text-[#E5C07B] transition-colors">
                  Empréstimo Pessoal
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#E5C07B] transition-colors">
                  Empréstimo Consignado
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-[#E5C07B] transition-colors">
                  Simulador de Crédito
                </a>
              </li>
              <li>
                <a href="#pilares" className="hover:text-[#E5C07B] transition-colors">
                  Diferenciais MV
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#E5C07B] transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-semibold text-slate-200 uppercase tracking-wider text-xs">
              Canal Oficial de Atendimento
            </h4>
            <div className="space-y-2 text-slate-300">
              <p>
                <strong className="text-white">Responsável:</strong> {siteConfig.responsible}
              </p>
              <p>
                <strong className="text-white">Horário:</strong> {siteConfig.operatingHours}
              </p>
              <p>
                <strong className="text-white">Atuação:</strong> {siteConfig.locationState}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppUrl(
                  `Olá, ${siteConfig.responsible}! Gostaria de atendimento pela ${siteConfig.companyName}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#E5C07B] hover:text-[#D4AF37] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar no WhatsApp Oficial &rarr;</span>
              </a>
            </div>
          </div>

        </div>

        {/* Regulatory & Anti-Fraud Disclaimer (Rule: no invented numbers, strong security warning) */}
        <div ref={disclaimerRef} className="pt-8 border-t border-[#1E293B] space-y-4">
          <div className="p-5 rounded-2xl bg-[#0B0F17] border border-[#1A2333] text-[11px] leading-relaxed text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <Shield className="w-4 h-4 text-[#E5C07B]" />
              <span>Aviso Legal & Diretrizes de Segurança</span>
            </div>
            <p>
              {siteConfig.disclaimer}
            </p>
            <p className="text-slate-500">
              * ALERTA DE SEGURANÇA: A {siteConfig.companyName} e {siteConfig.responsible} JAMAIS solicitam qualquer tipo de adiantamento financeiro,
              pagamento de boleto, Pix, taxas de cartório ou seguros para liberação de empréstimos. Caso receba esse tipo de solicitação em nosso nome, desconfie e reporte imediatamente.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} {siteConfig.companyName}. Todos os direitos reservados.
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
