/* ============================================================
   Mock datasets — the single source of sample content for the
   portal. The service layer (src/services/*) reads from here;
   swapping to a real API means changing only the services.
   Values are ported verbatim from the design prototype.
   ============================================================ */

import type {
  AccessProfile,
  ChartBar,
  ChatMessage,
  Course,
  Deal,
  FunnelStage,
  IndicativeProposal,
  Kpi,
  Lead,
  NotificationGroup,
  NotificationPrefRow,
  PipelineStage,
  RecurringPayment,
  Repasse,
  SalesAgent,
  SupportCase,
  UpfrontPayment,
} from '@/types'

export const CURRENT_USER = {
  nome: 'Renata Campos',
  cargo: 'Consultora comercial',
  email: 'renata.campos@solarengconsultoria.com.br',
  iniciais: 'RC',
  cpf: '148.220.331-09',
  celular: '(31) 99145-2208',
}

export const PARTNER = {
  razaoSocial: 'SolarEng Consultoria em Energia Ltda',
  nomeCurto: 'SolarEng Consultoria',
  cnpj: '29.482.110/0001-55',
  tipo: 'Escritório de engenharia',
  telefone: '(31) 3045-7700',
  site: 'solarengconsultoria.com.br',
  endereco: {
    cep: '30130-110',
    logradouro: 'Av. Afonso Pena, 1500 · Sala 1204',
    uf: 'MG',
    cidade: 'Belo Horizonte',
  },
  banco: {
    banco: '341 · Itaú Unibanco',
    agencia: '1582',
    conta: '48210-0',
    pix: '29.482.110/0001-55',
    titular: 'SolarEng Consultoria em Energia Ltda',
  },
}

/* -------------------- Dashboard -------------------- */

export const KPIS: Kpi[] = [
  { label: 'Comissão do mês', value: '', unit: '', change: '+12%', trend: 'up', icon: 'CircleDollarSign', accent: 'navy' },
  { label: 'Recorrência ativa', value: '', unit: '/mês', change: '+4%', trend: 'up', icon: 'Repeat', accent: 'orange' },
  { label: 'Pipeline ativo', value: 'R$ 11,2', unit: 'mi', change: '+2', trend: 'up', icon: 'Workflow', accent: 'info' },
  { label: 'Contratos fechados', value: '14', unit: 'no ano', change: '+3', trend: 'up', icon: 'Handshake', accent: 'success' },
]

/** Raw commission figures used to compute the two currency KPIs. */
export const KPI_VALUES = {
  comissaoMes: 48720,
  recorrenciaAtiva: 21340,
}

export const CHART: ChartBar[] = [
  { label: 'Nov', up: 18, rec: 9 },
  { label: 'Dez', up: 26, rec: 11 },
  { label: 'Jan', up: 14, rec: 13 },
  { label: 'Fev', up: 31, rec: 15 },
  { label: 'Mar', up: 22, rec: 16 },
  { label: 'Abr', up: 38, rec: 18 },
  { label: 'Mai', up: 29, rec: 20 },
  { label: 'Jun', up: 27, rec: 21 },
]

export const FUNIL: FunnelStage[] = [
  { stage: 'Qualificação', qtd: '6', valor: 3800000, w: '85%', cor: 'var(--eeds-ink-400)' },
  { stage: 'Proposta enviada', qtd: '4', valor: 4200000, w: '62%', cor: 'var(--eeds-info-fg)' },
  { stage: 'Negociação', qtd: '3', valor: 2600000, w: '44%', cor: 'var(--eeds-warning-fg)' },
  { stage: 'Fechamento', qtd: '2', valor: 1900000, w: '28%', cor: 'var(--eeds-success-fg)' },
]

export const PROX_REPASSES: Repasse[] = [
  { empresa: 'Cerâmica Planalto', tipo: 'Upfront', quando: 'Vence 28/06', valor: 38400, status: 'Programado', statusVariant: 'info', upfront: true },
  { empresa: 'Frigorífico Vale Verde', tipo: 'Recorrência · jun/26', quando: 'Vence 30/06', valor: 6210, status: 'Em análise', statusVariant: 'warning', upfront: false },
  { empresa: 'Indústria Beta Plásticos', tipo: 'Recorrência · jun/26', quando: 'Vence 30/06', valor: 4980, status: 'Programado', statusVariant: 'info', upfront: false },
  { empresa: 'Cooperativa Agro Sul', tipo: 'Upfront', quando: 'Pago 12/06', valor: 52100, status: 'Pago', statusVariant: 'success', upfront: true },
]

export const CARTEIRA = [
  { empresa: 'Indústria Beta Plásticos', valor: 4980 },
  { empresa: 'Cooperativa Agro Sul', valor: 7320 },
  { empresa: 'Cerâmica Planalto', valor: 3210 },
]

export const DASHBOARD_ACCUM = {
  acumAno: 412800,
  acumUpfront: 286400,
  acumRecorr: 126400,
  mrr: 21340,
}

/* -------------------- Leads -------------------- */

export const LEADS: Lead[] = [
  { id: 'LD-1042', empresa: 'Metalúrgica Andrade S.A.', contato: 'João Mendes', cargo: 'Diretor Industrial', fone: '(31) 99812-4471', email: 'joao.mendes@andrademetal.com.br', sub: 'SE/CO', mw: 1.8, origem: 'Indicação', status: 'Qualificado', statusVariant: 'brand', data: '18/06' },
  { id: 'LD-1041', empresa: 'Frigorífico Vale Verde', contato: 'Carla Souza', cargo: 'Gerente de Operações', fone: '(54) 99640-2210', email: 'carla.souza@valeverde.com.br', sub: 'S', mw: 3.2, origem: 'Prospecção', status: 'Em contato', statusVariant: 'warning', data: '17/06' },
  { id: 'LD-1039', empresa: 'Rede Supermercados Bahia', contato: 'Pedro Lima', cargo: 'CFO', fone: '(71) 99155-8830', email: 'pedro.lima@superbahia.com.br', sub: 'NE', mw: 2.4, origem: 'Site', status: 'Novo', statusVariant: 'info', data: '16/06' },
  { id: 'LD-1036', empresa: 'Têxtil Nordeste Ltda', contato: 'Ana Ferreira', cargo: 'Diretora', fone: '(85) 98744-1190', email: 'ana@textilnordeste.com.br', sub: 'NE', mw: 1.1, origem: 'Evento', status: 'Novo', statusVariant: 'info', data: '14/06' },
  { id: 'LD-1030', empresa: 'Cerâmica Planalto', contato: 'Roberto Dias', cargo: 'Sócio', fone: '(62) 99320-7765', email: 'roberto@ceramicaplanalto.com.br', sub: 'SE/CO', mw: 0.9, origem: 'Indicação', status: 'Convertido', statusVariant: 'success', data: '09/06' },
  { id: 'LD-1028', empresa: 'Laticínios Serra Azul', contato: 'Marina Castro', cargo: 'Compras', fone: '(35) 99201-3344', email: 'marina@serraazul.com.br', sub: 'SE/CO', mw: 1.5, origem: 'Prospecção', status: 'Descartado', statusVariant: 'neutral', data: '05/06' },
]

/* -------------------- Pipeline / Opportunities -------------------- */

export const PIPELINE: PipelineStage[] = [
  {
    stage: 'Qualificação',
    opps: [
      { empresa: 'Têxtil Nordeste Ltda', mw: 1.1, prazo: 24, valor: 5.6, prob: 35, owner: 'RC', dias: 3 },
      { empresa: 'Rede Supermercados Bahia', mw: 2.4, prazo: 36, valor: 18.4, prob: 40, owner: 'RC', dias: 8 },
    ],
  },
  {
    stage: 'Proposta enviada',
    opps: [
      { empresa: 'Metalúrgica Andrade S.A.', mw: 1.8, prazo: 36, valor: 13.8, prob: 55, owner: 'RC', dias: 2 },
      { empresa: 'Frigorífico Vale Verde', mw: 3.2, prazo: 48, valor: 32.6, prob: 50, owner: 'JP', dias: 5 },
    ],
  },
  {
    stage: 'Negociação',
    opps: [{ empresa: 'Indústria Beta Plásticos', mw: 2.1, prazo: 36, valor: 16.1, prob: 70, owner: 'RC', dias: 1 }],
  },
  {
    stage: 'Fechamento',
    opps: [{ empresa: 'Cooperativa Agro Sul', mw: 4.0, prazo: 48, valor: 40.8, prob: 90, owner: 'RC', dias: 0 }],
  },
]

export const PIPELINE_STAGE_COLORS = [
  'var(--eeds-ink-400)',
  'var(--eeds-info-fg)',
  'var(--eeds-warning-fg)',
  'var(--eeds-success-fg)',
]

/* -------------------- Negotiations -------------------- */

export const DEALS: Deal[] = [
  { empresa: 'Cooperativa Agro Sul', boleta: 'BLT-20451', mw: 4.0, prazo: 48, valor: 40.8, upfront: 81600, data: '02/06/26', status: 'Ativo', statusVariant: 'success' },
  { empresa: 'Indústria Beta Plásticos', boleta: 'BLT-20438', mw: 2.1, prazo: 36, valor: 16.1, upfront: 32200, data: '21/05/26', status: 'Ativo', statusVariant: 'success' },
  { empresa: 'Cerâmica Planalto', boleta: 'BLT-20402', mw: 0.9, prazo: 24, valor: 4.6, upfront: 9200, data: '30/04/26', status: 'Ativo', statusVariant: 'success' },
  { empresa: 'Atacadão Centro-Oeste', boleta: 'BLT-20377', mw: 3.5, prazo: 60, valor: 44.2, upfront: 88400, data: '12/04/26', status: 'Em implantação', statusVariant: 'warning' },
  { empresa: 'Hospital Santa Clara', boleta: 'BLT-20341', mw: 1.4, prazo: 36, valor: 10.7, upfront: 21400, data: '28/03/26', status: 'Ativo', statusVariant: 'success' },
]

export const PROPOSTAS: IndicativeProposal[] = [
  { empresa: 'Rede Supermercados Bahia', sub: 'NE', mw: 2.4, prazo: 36, status: 'Em análise', statusVariant: 'warning', data: 'Solicitado 16/06' },
  { empresa: 'Metalúrgica Andrade S.A.', sub: 'SE/CO', mw: 1.8, prazo: 36, status: 'Disponível', statusVariant: 'success', data: 'Recebido 18/06', preco: 289 },
]

/* -------------------- Payments -------------------- */

export const UPFRONT_PAYMENTS: UpfrontPayment[] = [
  { empresa: 'Cerâmica Planalto', boleta: 'BLT-20402', valor: 9200, data: '28/06/26', status: 'Programado', statusVariant: 'info' },
  { empresa: 'Cooperativa Agro Sul', boleta: 'BLT-20451', valor: 81600, data: '12/06/26', status: 'Pago', statusVariant: 'success' },
  { empresa: 'Indústria Beta Plásticos', boleta: 'BLT-20438', valor: 32200, data: '05/06/26', status: 'Pago', statusVariant: 'success' },
  { empresa: 'Hospital Santa Clara', boleta: 'BLT-20341', valor: 21400, data: '10/04/26', status: 'Pago', statusVariant: 'success' },
]

export const RECURRING_PAYMENTS: RecurringPayment[] = [
  { empresa: 'Cooperativa Agro Sul', comp: 'jun/26', mwh: 2102, rs: 2.0, valor: 4204, status: 'Programado', statusVariant: 'info' },
  { empresa: 'Indústria Beta Plásticos', comp: 'jun/26', mwh: 920, rs: 2.0, valor: 1840, status: 'Em análise', statusVariant: 'warning' },
  { empresa: 'Cerâmica Planalto', comp: 'jun/26', mwh: 394, rs: 2.0, valor: 788, status: 'Programado', statusVariant: 'info' },
  { empresa: 'Cooperativa Agro Sul', comp: 'mai/26', mwh: 2208, rs: 2.0, valor: 4416, status: 'Pago', statusVariant: 'success' },
  { empresa: 'Indústria Beta Plásticos', comp: 'mai/26', mwh: 1015, rs: 2.0, valor: 2030, status: 'Pago', statusVariant: 'success' },
]

export const PAYMENTS_SUMMARY = {
  upfrontPrev: 9200,
  recorrMes: 6832,
  totalAno: 412800,
}

/* -------------------- Trainings -------------------- */

export const COURSES: Course[] = [
  { titulo: 'Fundamentos do mercado livre (ACL)', modulo: 'Trilha base', dur: '42 min', prog: 100, nivel: 'Iniciante' },
  { titulo: 'Como originar e qualificar leads', modulo: 'Vendas', dur: '35 min', prog: 60, nivel: 'Iniciante' },
  { titulo: 'Montando uma cotação vencedora', modulo: 'Vendas', dur: '28 min', prog: 20, nivel: 'Intermediário' },
  { titulo: 'Modelos de comissionamento Echo', modulo: 'Comercial', dur: '31 min', prog: 0, nivel: 'Intermediário' },
  { titulo: 'Negociação e fechamento de contratos', modulo: 'Avançado', dur: '46 min', prog: 0, nivel: 'Avançado', requiresPrecoBase: true },
  { titulo: 'Precificação e preço base (Ouro+)', modulo: 'Avançado', dur: '52 min', prog: 0, nivel: 'Avançado', requiresPrecoBase: true },
]

/* -------------------- Support -------------------- */

export const CHAT_MESSAGES: ChatMessage[] = [
  { from: 'agent', nome: 'Echo · Suporte ao parceiro', txt: 'Olá, Renata. Sou a Lúcia, do time de suporte ao parceiro. Como posso ajudar hoje?', hora: '09:12' },
  { from: 'me', txt: 'Bom dia! A comissão recorrente da Cooperativa Agro Sul de maio ainda aparece como "em análise". Consegue verificar?', hora: '09:14' },
  { from: 'agent', nome: 'Echo · Suporte ao parceiro', txt: 'Claro. O repasse de maio foi conciliado com a CCEE e já está aprovado — cai na sua conta dia 30/06 junto com a competência de junho.', hora: '09:16' },
  { from: 'me', txt: 'Perfeito, obrigada!', hora: '09:16' },
]

export const SUPPORT_CASES: SupportCase[] = [
  { id: 'CASE-00041288', assunto: 'Divergência no cálculo da comissão recorrente · Cooperativa Agro Sul', tipo: 'Dúvida', status: 'Em Andamento', statusVariant: 'info', sla: 'No Prazo', slaVariant: 'success', criado: '18/06/2026 09:12' },
  { id: 'CASE-00041102', assunto: 'Solicitação de material de apresentação atualizado', tipo: 'Solicitação', status: 'Aguardando Cliente', statusVariant: 'warning', sla: 'Próximo do Vencimento', slaVariant: 'warning', criado: '14/06/2026 16:40' },
  { id: 'CASE-00040977', assunto: 'Atualização de dados bancários para repasse', tipo: 'Solicitação', status: 'Resolvido', statusVariant: 'success', sla: '—', slaVariant: 'neutral', criado: '06/06/2026 11:05' },
]

/* -------------------- Notifications -------------------- */

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    quando: 'Hoje',
    items: [
      { tipo: 'Comissão', icon: 'HandCoins', variant: 'success', titulo: 'Upfront da Cooperativa Agro Sul foi pago', desc: 'R$ 81.600,00 creditados na sua conta cadastrada.', hora: '08:42', unread: true },
      { tipo: 'Oportunidade', icon: 'Workflow', variant: 'info', titulo: 'Frigorífico Vale Verde avançou para “Proposta enviada”', desc: 'A cotação enviada há 2 dias foi visualizada pelo cliente.', hora: '07:30', unread: true },
    ],
  },
  {
    quando: 'Esta semana',
    items: [
      { tipo: 'Suporte', icon: 'Headphones', variant: 'info', titulo: 'Resposta no chamado CASE-00041288', desc: 'Lúcia, do suporte ao parceiro, respondeu sua dúvida.', hora: 'Ontem · 09:16', unread: false },
      { tipo: 'Proposta', icon: 'FileText', variant: 'warning', titulo: 'Proposta indicativa disponível', desc: 'Preço base recebido para Metalúrgica Andrade S.A.: R$ 289,00 /MWh.', hora: '18/06 · 14:05', unread: false },
      { tipo: 'Nível', icon: 'Award', variant: 'success', titulo: 'Você está a 12 MW do nível Diamante', desc: 'Feche mais contratos nos próximos 12 meses para destravar comissões maiores.', hora: '16/06 · 10:00', unread: false },
    ],
  },
]

/* -------------------- Account -------------------- */

export const NOTIFICATION_PREF_ROWS: NotificationPrefRow[] = [
  { id: 'comissao', icon: 'HandCoins', variant: 'success', label: 'Comissões e pagamentos', desc: 'Repasses upfront e recorrentes creditados ou programados' },
  { id: 'oport', icon: 'Workflow', variant: 'info', label: 'Oportunidades', desc: 'Mudanças de estágio e cotações visualizadas pelo cliente' },
  { id: 'proposta', icon: 'FileText', variant: 'warning', label: 'Propostas indicativas', desc: 'Preço base recebido e propostas liberadas' },
  { id: 'suporte', icon: 'Headphones', variant: 'info', label: 'Atendimento', desc: 'Respostas e atualizações nos chamados de suporte' },
  { id: 'novidades', icon: 'Sparkles', variant: 'warning', label: 'Novidades e treinamentos', desc: 'Novas vídeo-aulas, campanhas e comunicados da Echo' },
]

/** Default state of the account notification matrix (email/portal per event). */
export const DEFAULT_NOTIFICATION_PREFS: Record<string, boolean> = {
  comissaoEmail: true,
  comissaoPortal: true,
  oportEmail: true,
  oportPortal: true,
  propostaEmail: true,
  propostaPortal: true,
  suporteEmail: false,
  suportePortal: true,
  novidadesEmail: false,
  novidadesPortal: false,
}

export const SALES_AGENTS: SalesAgent[] = [
  { nome: 'Renata Campos', cargo: 'Administradora da conta', email: 'renata.campos@solarengconsultoria.com.br', clientes: 14, status: 'Ativo', statusVariant: 'success', acesso: 'Total', admin: true },
  { nome: 'Bruno Tavares', cargo: 'Agente de vendas', email: 'bruno.tavares@solarengconsultoria.com.br', clientes: 6, status: 'Ativo', statusVariant: 'success', acesso: 'Própria carteira', admin: false },
  { nome: 'Letícia Moraes', cargo: 'Agente de vendas', email: 'leticia.moraes@solarengconsultoria.com.br', clientes: 3, status: 'Ativo', statusVariant: 'success', acesso: 'Própria carteira', admin: false },
  { nome: 'Diego Antunes', cargo: 'Agente de vendas', email: 'diego.antunes@solarengconsultoria.com.br', clientes: 0, status: 'Convite pendente', statusVariant: 'warning', acesso: 'Própria carteira', admin: false },
]

/* -------------------- Invite modal -------------------- */

export const ACCESS_PROFILES: AccessProfile[] = [
  {
    id: 'admin',
    nome: 'Administrador',
    icon: 'ShieldCheck',
    resumo: 'Acesso total à conta do parceiro',
    bullets: ['Enxerga toda a carteira de clientes do parceiro', 'Gerencia agentes, convites e dados bancários', 'Acompanha todas as comissões upfront e recorrentes'],
  },
  {
    id: 'agente',
    nome: 'Agente de vendas',
    icon: 'Briefcase',
    resumo: 'Origina e acompanha a própria carteira',
    bullets: ['Vê apenas os clientes que ele mesmo originou', 'Registra leads, cria oportunidades e gera cotações', 'Acompanha as comissões dos seus próprios negócios'],
  },
  {
    id: 'consulta',
    nome: 'Consulta',
    icon: 'Eye',
    resumo: 'Somente leitura, sem edição',
    bullets: ['Visualiza relatórios e o andamento das negociações', 'Não cria leads, cotações nem altera cadastros', 'Indicado para sócios e back-office de apoio'],
  },
]

/** Invite-modal notification toggles (per event type). */
export const INVITE_NOTIFICATION_PREFS: NotificationPrefRow[] = [
  { id: 'comissao', icon: 'HandCoins', variant: 'success', label: 'Comissões e pagamentos', desc: 'Repasses upfront e recorrentes creditados ou programados' },
  { id: 'oportunidade', icon: 'Workflow', variant: 'info', label: 'Oportunidades', desc: 'Mudanças de estágio e cotações visualizadas pelo cliente' },
  { id: 'suporte', icon: 'Headphones', variant: 'info', label: 'Atendimento', desc: 'Respostas e atualizações nos chamados de suporte' },
  { id: 'novidades', icon: 'Sparkles', variant: 'warning', label: 'Novidades e treinamentos', desc: 'Novas vídeo-aulas, campanhas e comunicados da Echo' },
]

export const DEFAULT_INVITE_NOTIF: Record<string, boolean> = {
  comissao: true,
  oportunidade: true,
  suporte: true,
  novidades: false,
}
