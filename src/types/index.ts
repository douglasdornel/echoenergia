/* ============================================================
   Domain types for the Echo Energia partner portal.
   These describe the shape returned by the service layer
   (src/services/*), which today reads from mock data but is
   structured so a real backend can replace it transparently.
   ============================================================ */

/** Semantic status variant used by StatusBadge and icon tints. */
export type StatusVariant =
  | 'info'
  | 'warning'
  | 'success'
  | 'danger'
  | 'neutral'
  | 'brand'
  | 'orange'

/** Partner tier ladder — drives commission rates, features and locks. */
export type TierName = 'Bronze' | 'Prata' | 'Ouro' | 'Diamante'

export type DashboardVariant = 'Resumo executivo' | 'Foco em comissões'

export interface Tier {
  nome: TierName
  /** Upfront commission, percent over contract value. */
  upfront: number
  /** Recurring commission, R$ per MWh consumed. */
  recorr: number
  cor: string
  /** Whether the tier can request an indicative base price. */
  precoBase: boolean
  atualMW: number
  proxMW: number | null
  prox: TierName | 'Topo' | null
}

/** Submarket code (SIN submercado). */
export type Submercado = 'SE/CO' | 'S' | 'NE' | 'N'

export interface Lead {
  id: string
  empresa: string
  contato: string
  cargo: string
  fone: string
  email: string
  sub: Submercado
  /** Average demand in MW. */
  mw: number
  origem: string
  status: string
  statusVariant: StatusVariant
  data: string
}

export interface Opportunity {
  empresa: string
  mw: number
  prazo: number
  /** Estimated contract value in R$ millions. */
  valor: number
  /** Probability of closing, 0–100. */
  prob: number
  owner: string
  /** Days in current stage (0 = today). */
  dias: number
}

export interface PipelineStage {
  stage: string
  opps: Opportunity[]
}

export interface Deal {
  empresa: string
  boleta: string
  mw: number
  prazo: number
  /** Contract value in R$ millions. */
  valor: number
  /** Upfront commission in R$. */
  upfront: number
  data: string
  status: string
  statusVariant: StatusVariant
}

export interface IndicativeProposal {
  empresa: string
  sub: Submercado
  mw: number
  prazo: number
  status: string
  statusVariant: StatusVariant
  data: string
  /** Base price in R$/MWh, when available. */
  preco?: number
}

export interface UpfrontPayment {
  empresa: string
  boleta: string
  valor: number
  data: string
  status: string
  statusVariant: StatusVariant
}

export interface RecurringPayment {
  empresa: string
  /** Competência (billing month), e.g. "jun/26". */
  comp: string
  /** Consumption in MWh. */
  mwh: number
  /** R$ per MWh. */
  rs: number
  valor: number
  status: string
  statusVariant: StatusVariant
}

export interface PaymentsSummary {
  upfrontPrev: number
  recorrMes: number
  totalAno: number
}

export interface Course {
  titulo: string
  modulo: string
  dur: string
  /** Progress 0–100. */
  prog: number
  nivel: string
  /** Requires a tier that unlocks base price (Ouro+). */
  requiresPrecoBase?: boolean
}

export interface Benefit {
  nome: string
  valor: string
  icon: string
  unlocked: boolean
}

export type ChatSender = 'me' | 'agent'

export interface ChatMessage {
  from: ChatSender
  nome?: string
  txt: string
  hora: string
}

export interface SupportCase {
  id: string
  assunto: string
  tipo: string
  status: string
  statusVariant: StatusVariant
  sla: string
  slaVariant: StatusVariant
  criado: string
}

export interface NotificationItem {
  tipo: string
  icon: string
  variant: StatusVariant
  titulo: string
  desc: string
  hora: string
  unread: boolean
}

export interface NotificationGroup {
  quando: string
  items: NotificationItem[]
}

export interface SalesAgent {
  nome: string
  cargo: string
  email: string
  clientes: number
  status: string
  statusVariant: StatusVariant
  acesso: string
  admin: boolean
}

/** A row in the account-level notification preferences matrix. */
export interface NotificationPrefRow {
  id: string
  icon: string
  variant: StatusVariant
  label: string
  desc: string
}

/** Access profile shown in the invite-agent modal. */
export interface AccessProfile {
  id: 'admin' | 'agente' | 'consulta'
  nome: string
  icon: string
  resumo: string
  bullets: string[]
}

export interface DashboardData {
  kpis: Kpi[]
  chart: ChartBar[]
  funil: FunnelStage[]
  proxRepasses: Repasse[]
  carteira: CarteiraItem[]
  acumAno: number
  acumUpfront: number
  acumRecorr: number
  mrr: number
}

export interface Kpi {
  label: string
  value: string
  unit: string
  change: string
  trend: 'up' | 'down'
  icon: string
  accent: 'navy' | 'orange' | 'info' | 'success'
}

export interface ChartBar {
  label: string
  up: number
  rec: number
}

export interface FunnelStage {
  stage: string
  qtd: string
  valor: number
  w: string
  cor: string
}

export interface Repasse {
  empresa: string
  tipo: string
  quando: string
  valor: number
  status: string
  statusVariant: StatusVariant
  upfront: boolean
}

export interface CarteiraItem {
  empresa: string
  valor: number
}
