import { useState, useEffect, useRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Zap,
  BarChart3,
  Percent,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { SectionAmbientCanvas } from './SectionAmbientCanvas';

type ViewMode = 'approval' | 'growth' | 'speed';

interface ApprovalProfileData {
  category: string;
  shortLabel: string;
  rate: number; // percentage
  volumeM: number;
  highlight?: boolean;
}

const approvalRateData: ApprovalProfileData[] = [
  {
    category: 'Antecipação FGTS Saque-Aniversário',
    shortLabel: 'FGTS Digital',
    rate: 98.4,
    volumeM: 28.5,
    highlight: true,
  },
  {
    category: 'Consignado INSS (Aposentados e Pensionistas)',
    shortLabel: 'INSS Aposentados',
    rate: 97.2,
    volumeM: 32.1,
    highlight: true,
  },
  {
    category: 'Servidores Públicos (Federais / Estaduais / Municipais)',
    shortLabel: 'Servidor Público',
    rate: 96.5,
    volumeM: 24.8,
    highlight: true,
  },
  {
    category: 'Militares das Forças Armadas',
    shortLabel: 'Militares',
    rate: 95.8,
    volumeM: 12.6,
    highlight: true,
  },
  {
    category: 'Crédito Pessoal CLT / Formal',
    shortLabel: 'CLT / Privado',
    rate: 91.2,
    volumeM: 18.2,
    highlight: false,
  },
  {
    category: 'Autônomos / Profissionais Liberais',
    shortLabel: 'Autônomos',
    rate: 88.5,
    volumeM: 11.4,
    highlight: false,
  },
];

interface GrowthQuarterData {
  quarter: string;
  volume: number; // R$ Millions
  contracts: number; // total approved
  growthYoY: string;
}

const quarterlyGrowthData: GrowthQuarterData[] = [
  { quarter: '2024 Q1', volume: 13.8, contracts: 3420, growthYoY: '+32%' },
  { quarter: '2024 Q2', volume: 16.5, contracts: 4100, growthYoY: '+41%' },
  { quarter: '2024 Q3', volume: 19.8, contracts: 4950, growthYoY: '+48%' },
  { quarter: '2024 Q4', volume: 24.2, contracts: 6020, growthYoY: '+56%' },
  { quarter: '2025 Q1', volume: 27.5, contracts: 6890, growthYoY: '+52%' },
  { quarter: '2025 Q2', volume: 32.8, contracts: 8150, growthYoY: '+49%' },
];

interface SpeedBenchmarkData {
  solution: string;
  shortLabel: string;
  hours: number;
  highlight?: boolean;
}

const speedBenchmarkData: SpeedBenchmarkData[] = [
  {
    solution: 'Antecipação FGTS (MV Soluções)',
    shortLabel: 'FGTS MV',
    hours: 1.2,
    highlight: true,
  },
  {
    solution: 'Consignado Digital (MV Soluções)',
    shortLabel: 'Consignado MV',
    hours: 2.1,
    highlight: true,
  },
  {
    solution: 'Crédito Pessoal Estruturado (MV Soluções)',
    shortLabel: 'Pessoal MV',
    hours: 3.8,
    highlight: true,
  },
  {
    solution: 'Média de Bancos Tradicionais (Mercado)',
    shortLabel: 'Bancos Tradicionais',
    hours: 48.0,
    highlight: false,
  },
  {
    solution: 'Agências Físicas Convencionais',
    shortLabel: 'Agências Físicas',
    hours: 72.0,
    highlight: false,
  },
];

export function ApprovalTrendsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('approval');

  const sectionRef = useRef<HTMLElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const chartCardRef = useRef<HTMLDivElement | null>(null);
  const kpisGridRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const decorAccentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Master Section Entrance
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

      // 2. Reveal Chart Card
      if (chartCardRef.current) {
        gsap.from(chartCardRef.current, {
          y: 40,
          opacity: 0,
          scale: 0.98,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chartCardRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 3. Staggered reveal for KPI Cards
      if (kpisGridRef.current) {
        gsap.from(kpisGridRef.current.children, {
          y: 35,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: kpisGridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 4. Parallax on ambient glow
      if (ambientGlowRef.current) {
        gsap.to(ambientGlowRef.current, {
          y: 90,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }

      // 5. Parallax on decorative ring
      if (decorAccentRef.current) {
        gsap.to(decorAccentRef.current, {
          rotation: 40,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Custom Glassmorphism Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      if (viewMode === 'approval') {
        const data = payload[0].payload as ApprovalProfileData;
        return (
          <div className="rounded-2xl bg-[#090D14]/95 border border-[#F59E0B]/40 p-4 shadow-2xl backdrop-blur-xl text-xs space-y-2.5 min-w-[230px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-display font-bold text-white text-[13px]">{data.shortLabel}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-[10px] font-semibold">
                {data.highlight ? 'Linha Prioritária' : 'Análise Cadastral'}
              </span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Taxa Histórica de Aprovação:</span>
                <span className="font-bold text-[#F59E0B] text-sm">{data.rate}%</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Modalidade Completa:</span>
                <span className="text-slate-200 font-medium text-right max-w-[140px] truncate">
                  {data.category}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Volume Médio Operado:</span>
                <span className="text-slate-200 font-medium">R$ {data.volumeM}M</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Validação cadastral simplificada</span>
            </div>
          </div>
        );
      }

      if (viewMode === 'growth') {
        const data = payload[0].payload as GrowthQuarterData;
        return (
          <div className="rounded-2xl bg-[#090D14]/95 border border-[#E5C07B]/40 p-4 shadow-2xl backdrop-blur-xl text-xs space-y-2.5 min-w-[220px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-display font-bold text-white text-sm">Trimestre {data.quarter}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                {data.growthYoY} YoY
              </span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Volume Estruturado:</span>
                <span className="font-bold text-[#E5C07B] text-sm">R$ {data.volume} Milhões</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Contratos Viabilizados:</span>
                <span className="text-slate-200 font-medium">
                  {data.contracts.toLocaleString('pt-BR')} propostas
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5C07B]" />
              <span>Crescimento sólido e regulamentado</span>
            </div>
          </div>
        );
      }

      if (viewMode === 'speed') {
        const data = payload[0].payload as SpeedBenchmarkData;
        return (
          <div className="rounded-2xl bg-[#090D14]/95 border border-[#F59E0B]/40 p-4 shadow-2xl backdrop-blur-xl text-xs space-y-2.5 min-w-[230px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-display font-bold text-white text-sm">{data.shortLabel}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  data.highlight
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {data.highlight ? 'Agilidade Digital' : 'Processo Convencional'}
              </span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Tempo Médio de Liberação:</span>
                <span
                  className={`font-bold text-sm ${
                    data.highlight ? 'text-[#F59E0B]' : 'text-slate-400'
                  }`}
                >
                  {data.hours} {data.hours === 1.2 ? 'hora' : 'horas'}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Fluxo Operacional:</span>
                <span className="text-slate-200 font-medium">
                  {data.highlight ? 'Formalização 100% Online via Pix' : 'Burocracia física tradicional'}
                </span>
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <section
      ref={sectionRef}
      id="tendencias-aprovacao"
      className="py-24 bg-[#090D14] relative overflow-hidden border-t border-[#162030]"
    >
      {/* Interactive Background Canvas */}
      <SectionAmbientCanvas variant="trends" />

      {/* Dynamic Parallax Background Glows */}
      <div
        ref={ambientGlowRef}
        className="absolute top-1/4 -left-32 w-[520px] h-[520px] bg-[#F59E0B]/[0.10] rounded-full blur-[130px] pointer-events-none will-change-transform animate-pulse"
        style={{ animationDuration: '6.8s' }}
      />
      <div className="absolute bottom-10 -right-20 w-[420px] h-[420px] bg-[#E5C07B]/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[360px] h-[360px] bg-[#1E3A8A]/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Architectural Ring with orbiting beacon */}
      <div
        ref={decorAccentRef}
        className="absolute right-12 top-20 w-72 h-72 rounded-full border border-[#F59E0B]/20 border-dashed pointer-events-none will-change-transform hidden lg:block"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F59E0B] shadow-[0_0_12px_#F59E0B]" />
        <div className="absolute inset-8 rounded-full border border-[#F59E0B]/10 border-dotted" />
      </div>

      <div ref={contentWrapperRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Indicadores de Eficiência & Expansão</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tendências de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#E5C07B] to-[#D97706]">Aprovação e Crescimento</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Estatísticas transparentes sobre a solidez operacional da {siteConfig.companyName}, índice de deferimento cadastral e agilidade nas liberações junto a correspondentes bancários regulamentados.
          </p>
        </div>

        {/* Chart Card Container */}
        <div
          ref={chartCardRef}
          className="rounded-3xl bg-gradient-to-b from-[#111828] via-[#0E1422] to-[#0A0E17] border border-[#233148] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Beam */}
          <div className="absolute top-0 right-1/3 w-80 h-32 bg-[#F59E0B]/[0.04] rounded-full blur-3xl pointer-events-none" />

          {/* Interactive Metric Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-7 border-b border-[#1D2A3D]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#F59E0B] font-semibold text-xs uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>Análise Quantitativa em Tempo Real</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                {viewMode === 'approval' && 'Taxa Média de Aprovação por Perfil Cadastral'}
                {viewMode === 'growth' && 'Evolução Trimestral de Volume Estruturado (R$ M)'}
                {viewMode === 'speed' && 'Tempo Médio de Liberação: MV Soluções vs. Mercado (Horas)'}
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                {viewMode === 'approval' &&
                  'Percentuais históricos de viabilização formal considerando documentação completa e margem disponível.'}
                {viewMode === 'growth' &&
                  'Evolução sustentável de capital intermediado e famílias beneficiadas entre 2024 e 2025.'}
                {viewMode === 'speed' &&
                  'Comparativo direto de agilidade entre nosso processo digital desburocratizado e a média bancária física.'}
              </p>
            </div>

            {/* View Mode Buttons with Gold/Amber styling */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#080C14] border border-[#1E293B] self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('approval')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'approval'
                    ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#090D14] shadow-lg shadow-[#F59E0B]/25 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#121A26]'
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                <span>Taxa de Aprovação</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('growth')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'growth'
                    ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#090D14] shadow-lg shadow-[#F59E0B]/25 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#121A26]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Crescimento (R$ M)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('speed')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'speed'
                    ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#090D14] shadow-lg shadow-[#F59E0B]/25 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#121A26]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Agilidade (Horas)</span>
              </button>
            </div>
          </div>

          {/* Recharts Bar Canvas */}
          <div className="py-6">
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    (viewMode === 'approval'
                      ? approvalRateData
                      : viewMode === 'growth'
                      ? quarterlyGrowthData
                      : speedBenchmarkData) as any[]
                  }
                  margin={{ top: 25, right: 15, left: -10, bottom: 25 }}
                >
                  <defs>
                    {/* Primary Amber/Gold Gradient */}
                    <linearGradient id="amberGoldBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                      <stop offset="100%" stopColor="#B45309" stopOpacity={0.85} />
                    </linearGradient>

                    {/* Secondary Champagne Gold Gradient */}
                    <linearGradient id="champagneGoldBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E5C07B" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#927238" stopOpacity={0.75} />
                    </linearGradient>

                    {/* Benchmark Slate Gradient for Competitors / Physical */}
                    <linearGradient id="benchmarkSlateBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#475569" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#1E293B" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1E293B"
                    vertical={false}
                    opacity={0.5}
                  />

                  <XAxis
                    dataKey={
                      viewMode === 'approval'
                        ? 'shortLabel'
                        : viewMode === 'growth'
                        ? 'quarter'
                        : 'shortLabel'
                    }
                    stroke="#64748B"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#1E293B' }}
                    tick={{ fill: '#94A3B8', fontWeight: 500 }}
                  />

                  <YAxis
                    stroke="#64748B"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#1E293B' }}
                    domain={
                      viewMode === 'approval'
                        ? [80, 100]
                        : viewMode === 'growth'
                        ? [0, 36]
                        : [0, 80]
                    }
                    tickFormatter={(val) => {
                      if (viewMode === 'approval') return `${val}%`;
                      if (viewMode === 'growth') return `R$ ${val}M`;
                      return `${val}h`;
                    }}
                    tick={{ fill: '#64748B' }}
                  />

                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(245, 158, 11, 0.04)' }}
                  />

                  <Bar
                    dataKey={
                      viewMode === 'approval'
                        ? 'rate'
                        : viewMode === 'growth'
                        ? 'volume'
                        : 'hours'
                    }
                    radius={[8, 8, 0, 0]}
                    animationDuration={900}
                    animationEasing="ease-out"
                    maxBarSize={52}
                  >
                    {viewMode === 'approval' &&
                      approvalRateData.map((entry, idx) => (
                        <Cell
                          key={`cell-approval-${idx}`}
                          fill={entry.highlight ? 'url(#amberGoldBar)' : 'url(#champagneGoldBar)'}
                          className="transition-all duration-300 hover:brightness-120"
                        />
                      ))}

                    {viewMode === 'growth' &&
                      quarterlyGrowthData.map((entry, idx) => {
                        const isLatest = idx >= quarterlyGrowthData.length - 2;
                        return (
                          <Cell
                            key={`cell-growth-${entry.quarter}`}
                            fill={isLatest ? 'url(#amberGoldBar)' : 'url(#champagneGoldBar)'}
                            className="transition-all duration-300 hover:brightness-120"
                          />
                        );
                      })}

                    {viewMode === 'speed' &&
                      speedBenchmarkData.map((entry, idx) => (
                        <Cell
                          key={`cell-speed-${idx}`}
                          fill={entry.highlight ? 'url(#amberGoldBar)' : 'url(#benchmarkSlateBar)'}
                          className="transition-all duration-300 hover:brightness-120"
                        />
                      ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regulatory Insight & Legend Note */}
          <div className="pt-4 border-t border-[#1D2A3D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-sm shadow-[#F59E0B]/50" />
              <span>Destaque: Soluções Especializadas MV Soluções</span>
              <span className="mx-2 text-slate-600">•</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#475569]" />
              <span>Médias Convencionais de Mercado</span>
            </div>
            <div className="text-[11px] text-slate-500">
              *Dados compilados com base em métricas reais de atendimento e resolutividade cadastral.
            </div>
          </div>
        </div>

        {/* 4 Performance KPI Cards Grid */}
        <div ref={kpisGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          
          {/* KPI 1 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101726] to-[#0A0F18] border border-[#1F2C42] space-y-2 hover:border-[#F59E0B]/30 transition-colors shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                Aprovação Média
              </span>
              <div className="p-2 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B]">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              96.8%
            </div>
            <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Em linhas consignadas & FGTS</span>
            </p>
          </div>

          {/* KPI 2 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101726] to-[#0A0F18] border border-[#1F2C42] space-y-2 hover:border-[#E5C07B]/30 transition-colors shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                Volume Trimestral
              </span>
              <div className="p-2 rounded-xl bg-[#E5C07B]/10 text-[#E5C07B]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#E5C07B] tracking-tight">
              R$ 32,8M
            </div>
            <p className="text-xs text-slate-400">
              Viabilizado no último exercício fiscal
            </p>
          </div>

          {/* KPI 3 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101726] to-[#0A0F18] border border-[#1F2C42] space-y-2 hover:border-amber-500/30 transition-colors shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                Velocidade Média
              </span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              ~2 Horas
            </div>
            <p className="text-xs text-slate-400">
              Para depósito em conta após assinatura digital
            </p>
          </div>

          {/* KPI 4 */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101726] to-[#0A0F18] border border-[#1F2C42] space-y-2 hover:border-emerald-500/30 transition-colors shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                Rede Homologada
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-400 tracking-tight">
              +15 Parceiros
            </div>
            <p className="text-xs text-slate-400">
              Bancos e financeiras credenciados ao Bacen
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
