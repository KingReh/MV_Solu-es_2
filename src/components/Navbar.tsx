import { useState, useEffect } from 'react';
import { MessageSquare, Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../data/siteConfig';

interface NavbarProps {
  onOpenQuickModal?: () => void;
}

export function Navbar({ onOpenQuickModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Soluções', href: '#servicos' },
    { label: 'Diferenciais', href: '#pilares' },
    { label: 'Simulador', href: '#simulador' },
    { label: 'Como Funciona', href: '#jornada' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090D14]/90 backdrop-blur-md border-b border-[#1E293B] py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#"
            id="nav-logo"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#E5C07B]/50 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#334155] flex items-center justify-center shadow-inner group-hover:border-[#E5C07B]/60 transition-colors">
              <span className="font-display font-extrabold text-base tracking-wider bg-gradient-to-r from-[#E5C07B] to-[#F3E8D0] bg-clip-text text-transparent">
                MV
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                {siteConfig.companyName}
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B]" />
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Soluções Financeiras & Crédito
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav-links" className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-[#E5C07B] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E5C07B] hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Status badge & Direct WhatsApp CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101623] border border-[#1E293B] text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Atendimento Direto: <strong className="text-white font-medium">{siteConfig.responsible}</strong></span>
            </div>

            <a
              id="nav-whatsapp-cta"
              href={buildWhatsAppUrl(
                `Olá, ${siteConfig.responsible}! Estou no site da ${siteConfig.companyName} e gostaria de tirar dúvidas sobre as opções de crédito.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C07B] to-[#D4AF37] text-[#090D14] font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#E5C07B]/10 group"
            >
              <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Chamar no WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={buildWhatsAppUrl(`Olá, ${siteConfig.responsible}! Gostaria de atendimento via WhatsApp.`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="p-2.5 rounded-xl bg-[#E5C07B] text-[#090D14]"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#101623] border border-[#1E293B] text-slate-300 hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden bg-[#0B101A] border-b border-[#1E293B] px-4 pt-3 pb-6 space-y-4 shadow-2xl transition-all"
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#101623] border border-[#1E293B] text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Atendimento direto com {siteConfig.responsible}</span>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-slate-200 hover:text-[#E5C07B] hover:bg-[#101623] transition-colors font-medium text-base flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#1E293B]/60">
            <a
              href={buildWhatsAppUrl(
                `Olá, ${siteConfig.responsible}! Estou navegando no site da ${siteConfig.companyName} e gostaria de iniciar meu atendimento.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#E5C07B] to-[#D4AF37] text-[#090D14] font-bold text-sm shadow-lg shadow-[#E5C07B]/10"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Iniciar Atendimento no WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sem cobrança antecipada • Consulta sigilosa</span>
          </div>
        </div>
      )}
    </header>
  );
}
