import { useState } from 'react';
import { MessageSquare, X, ArrowRight, Shield } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../data/siteConfig';

export function WhatsAppFloatingButton() {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Floating conversational preview bubble */}
      {tooltipVisible && (
        <div className="mb-3 max-w-xs rounded-2xl bg-[#101622] border border-[#2A3852] p-4 shadow-2xl animate-fade-in relative text-left">
          <button
            type="button"
            onClick={() => setTooltipVisible(false)}
            className="absolute top-2.5 right-2.5 text-slate-500 hover:text-slate-300 p-1"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white tracking-wide">
              {siteConfig.responsible} • {siteConfig.companyName}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Olá! Precisa de uma orientação rápida sobre Empréstimo Pessoal ou Consignado? Estou à disposição no WhatsApp.
          </p>

          <a
            href={buildWhatsAppUrl(
              `Olá, ${siteConfig.responsible}! Estou no site da ${siteConfig.companyName} e gostaria de iniciar um atendimento.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-[#E5C07B] hover:bg-[#D4AF37] text-[#090D14] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Conversar Agora</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-2 justify-center">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span>Atendimento oficial e seguro</span>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <div className="relative group">
        <a
          id="floating-whatsapp-btn"
          href={buildWhatsAppUrl(
            `Olá, ${siteConfig.responsible}! Gostaria de atendimento direto com a ${siteConfig.companyName}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setTooltipVisible(true)}
          className="flex items-center gap-3 py-3.5 px-4 rounded-full bg-gradient-to-r from-[#E5C07B] to-[#D4AF37] text-[#090D14] font-bold text-xs sm:text-sm shadow-xl shadow-[#E5C07B]/25 hover:brightness-110 active:scale-95 transition-all"
          aria-label="Atendimento via WhatsApp com Ailton Jr"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-600 border-2 border-white" />
          </div>
          <span className="hidden sm:inline font-bold">Falar com Ailton Jr</span>
        </a>
      </div>
    </div>
  );
}
