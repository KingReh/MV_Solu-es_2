export type LoanCategory = 'pessoal' | 'consignado' | 'analise';

export interface ServiceItem {
  id: LoanCategory;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  targetAudience: string[];
  highlights: string[];
  requirements: string[];
  iconName: 'UserCheck' | 'Landmark' | 'ShieldCheck';
  whatsappDefaultMsg: string;
}

export interface PillarItem {
  id: string;
  title: string;
  description: string;
  metricLabel: string;
  iconName: 'Zap' | 'Eye' | 'HeartHandshake' | 'Lock';
}

export interface JourneyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  timing: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'geral' | 'consignado' | 'pessoal' | 'seguranca' | 'prazos' | string;
  badge?: string;
  highlights?: string[];
  alert?: string;
}

export interface SimulationState {
  category: LoanCategory;
  amount: number;
  installments: number;
  fullName: string;
  phone: string;
  purpose: string;
}

export interface SiteConfig {
  companyName: string;
  legalEntity: string;
  responsible: string;
  role: string;
  tagline: string;
  description: string;
  whatsappPlaceholder: string;
  whatsappRawNumber: string; // Placeholder string for future real number
  operatingHours: string;
  locationState: string;
  disclaimer: string;
}
