import { ServiceItem, PillarItem, JourneyStep, FAQItem, SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  companyName: 'MV Soluções',
  legalEntity: 'MV Soluções Financeiras',
  responsible: 'Ailton Jr',
  role: 'Diretor e Especialista em Soluções de Crédito',
  tagline: 'Crédito sob medida, com agilidade e clareza absoluta.',
  description:
    'Estruturamos soluções financeiras personalizadas em empréstimo pessoal e consignado, com atendimento direto e sem intermediários burocráticos.',
  whatsappPlaceholder: '+55 (XX) 9XXXX-XXXX',
  // Placeholder padronizado sem inventar número real:
  whatsappRawNumber: '5500999999999',
  operatingHours: 'Segunda a Sexta, das 09h às 18h',
  locationState: 'Atendimento Digital em Todo o Território Nacional',
  disclaimer:
    'A MV Soluções atua na intermediação e assessoria de crédito. Todas as propostas estão sujeitas à análise de crédito e comprovação de requisitos pelas instituições parceiras. Não solicitamos depósitos antecipados para liberação de empréstimos.',
};

export const servicesData: ServiceItem[] = [
  {
    id: 'pessoal',
    title: 'Empréstimo Pessoal',
    tagline: 'Recursos rápidos para suas necessidades imediatas',
    badge: 'Maior Flexibilidade',
    description:
      'Solução ideal para quem busca autonomia financeira com rapidez. Adequado para reformas, quitação de dívidas mais onerosas, investimentos pontuais ou despesas inesperadas.',
    targetAudience: [
      'Profissionais com comprovação de renda',
      'Pessoas que buscam agilidade sem burocracias excessivas',
      'Quem deseja reorganizar as finanças pessoais',
    ],
    highlights: [
      'Análise personalizada conforme o seu momento financeiro',
      'Atendimento consultivo direto com Ailton Jr',
      'Flexibilidade na escolha do plano de pagamento',
      'Zero cobrança de taxas de adesão prévias',
    ],
    requirements: [
      'Documento oficial com foto (RG ou CNH)',
      'Comprovante de residência atualizado',
      'Comprovante de renda recente',
    ],
    iconName: 'UserCheck',
    whatsappDefaultMsg:
      'Olá, Ailton Jr! Gostaria de entender as opções e fazer uma simulação de Empréstimo Pessoal na MV Soluções.',
  },
  {
    id: 'consignado',
    title: 'Empréstimo Consignado',
    tagline: 'As melhores condições com desconto direto em folha',
    badge: 'Condições Mais Vantajosas',
    description:
      'Modalidade com parcelas descontadas diretamente no contracheque ou benefício. Por possuir garantia de recebimento, proporciona prazos estendidos e condições de contratação mais atrativas.',
    targetAudience: [
      'Aposentados e Pensionistas do INSS',
      'Servidores Públicos (Federais, Estaduais e Municipais)',
      'Militares e Forças Armadas',
    ],
    highlights: [
      'Prazos mais confortáveis para pagamento',
      'Desconto automático sem necessidade de boletos mensais',
      'Opções de portabilidade e refinanciamento de contratos',
      'Margem consignável avaliada com total transparência',
    ],
    requirements: [
      'Documento de identificação com CPF',
      'Extrato do benefício ou último contracheque',
      'Comprovante de residência atual',
    ],
    iconName: 'Landmark',
    whatsappDefaultMsg:
      'Olá, Ailton Jr! Tenho interesse em conhecer as condições de Empréstimo Consignado na MV Soluções.',
  },
  {
    id: 'analise',
    title: 'Análise de Crédito & Assessoria',
    tagline: 'Diagnóstico financeiro para encontrar a melhor rota',
    badge: 'Atendimento Sob Medida',
    description:
      'Caso você tenha dúvidas sobre qual modalidade se enquadra na sua realidade, nossa equipe realiza um diagnóstico preliminar para indicar a alternativa mais coerente com sua capacidade e objetivo.',
    targetAudience: [
      'Quem tem contratos ativos e quer reduzir custos',
      'Pessoas em dúvida sobre margem ou elegibilidade',
      'Quem precisa de clareza antes de qualquer compromisso',
    ],
    highlights: [
      'Orientação honesta: se não fizer sentido para você, nós avisamos',
      'Comunicação direta sem termos jurídicos indecifráveis',
      'Respostas ágeis no WhatsApp',
      'Total sigilo e proteção segundo a LGPD',
    ],
    requirements: [
      'Relato do seu objetivo financeiro',
      'Informação básica de renda e ocupação',
    ],
    iconName: 'ShieldCheck',
    whatsappDefaultMsg:
      'Olá, Ailton Jr! Gostaria de solicitar uma Análise de Crédito e Assessoria para entender qual a melhor alternativa para mim.',
  },
];

export const pillarsData: PillarItem[] = [
  {
    id: 'speed',
    title: 'Agilidade Operacional',
    description:
      'Processamento célere desde o primeiro contato até o retorno da viabilidade, respeitando a urgência do seu momento.',
    metricLabel: 'Retorno Prioritário',
    iconName: 'Zap',
  },
  {
    id: 'clarity',
    title: 'Transparência Rigorosa',
    description:
      'Sem surpresas nas entrelinhas. Todos os parâmetros, valores e condições são explicados com clareza antes de qualquer envio.',
    metricLabel: 'Clareza Total',
    iconName: 'Eye',
  },
  {
    id: 'human',
    title: 'Atendimento Humano',
    description:
      'Você fala diretamente com quem resolve. Comunicação próxima, atenciosa e liderada por Ailton Jr, sem robôs impessoais.',
    metricLabel: 'Contato Direto',
    iconName: 'HeartHandshake',
  },
  {
    id: 'security',
    title: 'Proteção & Conformidade',
    description:
      'Seus dados são tratados com estrita confidencialidade e segurança, em plena conformidade com as diretrizes da LGPD.',
    metricLabel: 'Sigilo Garantido',
    iconName: 'Lock',
  },
];

export const journeySteps: JourneyStep[] = [
  {
    step: '01',
    title: 'Contato Inicial',
    subtitle: 'Conversa sem compromisso',
    description:
      'Você nos chama no WhatsApp informando sua necessidade ou preenche a simulação orientativa aqui no site.',
    timing: 'Poucos minutos',
  },
  {
    step: '02',
    title: 'Avaliação Consultiva',
    subtitle: 'Verificação do seu perfil',
    description:
      'Analisamos sua demanda de forma individual, identificando se a melhor saída é Pessoal, Consignado ou Reorganização.',
    timing: 'Retorno rápido',
  },
  {
    step: '03',
    title: 'Apresentação da Proposta',
    subtitle: 'Parâmetros transparentes',
    description:
      'Apresentamos as condições reais com total clareza de parcelas, prazos e documentos necessários para formalização.',
    timing: 'Você decide no seu ritmo',
  },
  {
    step: '04',
    title: 'Formalização e Liberação',
    subtitle: 'Concretização da operação',
    description:
      'Após a aprovação formal pelos parceiros homologados, o recurso é creditado diretamente na sua conta bancária.',
    timing: 'Conforme regras da modalidade',
  },
];

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'seguranca',
    question: 'A MV Soluções cobra algum valor adiantado para liberar o empréstimo?',
    answer:
      'Não. Jamais cobramos qualquer depósito, taxa de cadastro, taxa de avalista ou valor prévio. Cobrança antecipada é prática ilegal. Nossa assessoria é 100% remunerada pelas instituições financeiras parceiras somente após a aprovação e pagamento da operação.',
    alert: 'Alerta de Segurança: Jamais realize transferências, depósitos ou Pix para liberação de crédito.',
  },
  {
    id: 'faq-2',
    category: 'consignado',
    question: 'Quem tem direito ao Empréstimo Consignado e como funciona a margem?',
    answer:
      'O crédito consignado é destinado a aposentados e pensionistas do INSS, servidores públicos (federais, estaduais e municipais) e militares. As parcelas são descontadas diretamente em folha de pagamento ou benefício, respeitando o limite da margem consignável em vigor.',
    highlights: [
      'Aposentados e pensionistas do INSS',
      'Servidores públicos municipais, estaduais e federais',
      'Militares das Forças Armadas',
      'Desconto automático em folha sem necessidade de boletos',
    ],
  },
  {
    id: 'faq-3',
    category: 'consignado',
    question: 'Como funciona a Antecipação do Saque-Aniversário do FGTS?',
    answer:
      'A modalidade viabiliza o adiantamento de até 10 parcelas anuais do saldo do FGTS. As parcelas são debitadas diretamente do fundo a cada ano, mantendo seu salário mensal intacto.',
    highlights: [
      'Não gera boleto mensal nem consome sua renda corrente',
      'Crédito disponibilizado via Pix logo após a aprovação',
      'Válido para contas ativas e inativas do FGTS',
    ],
  },
  {
    id: 'faq-4',
    category: 'pessoal',
    question: 'Quem possui restrição cadastral (SPC/Serasa) pode contratar?',
    answer:
      'Sim. As linhas com garantia — como o Consignado INSS/Servidores e a Antecipação do FGTS — não realizam consulta restritiva ao SPC ou Serasa, pois a garantia é baseada no saldo do fundo ou no benefício.',
    highlights: [
      'Aprovação vinculada à margem ou saldo disponível',
      'Alternativa eficiente para quitar pendências financeiras com taxas menores',
    ],
  },
  {
    id: 'faq-5',
    category: 'documentos',
    question: 'Quais documentos são exigidos para iniciar a análise?',
    answer:
      'O processo é totalmente digital. Você envia as fotos dos documentos diretamente pelo canal de atendimento:',
    highlights: [
      'Documento de identificação com foto (RG ou CNH dentro da validade)',
      'Comprovante de endereço recente (últimos 90 dias)',
      'Extrato do benefício (INSS) ou contracheque recente (Servidores)',
      'Autorização de consulta liberada no aplicativo do FGTS (quando aplicável)',
    ],
  },
  {
    id: 'faq-6',
    category: 'prazos',
    question: 'Qual é o prazo médio para o dinheiro cair na conta?',
    answer:
      'A velocidade depende da modalidade contratada e da homologação do convênio pagador:',
    highlights: [
      'Antecipação FGTS: Crédito em até 2 horas via Pix após a formalização',
      'Consignado INSS: De poucas horas até 1 dia útil após averbação da Dataprev',
      'Assinatura digital direta no celular com biometria facial',
    ],
  },
];

export function buildWhatsAppUrl(customMessage: string): string {
  const number = siteConfig.whatsappRawNumber;
  const encoded = encodeURIComponent(customMessage.trim());
  return `https://wa.me/${number}?text=${encoded}`;
}
