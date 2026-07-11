import type { Tier, TierName } from '@/types'

/** Ordered tier ladder. */
export const TIER_ORDER: TierName[] = ['Bronze', 'Prata', 'Ouro', 'Diamante']

/** Lucide icon name per tier. */
export const TIER_ICON: Record<TierName, string> = {
  Bronze: 'Award',
  Prata: 'Medal',
  Ouro: 'Crown',
  Diamante: 'Gem',
}

/** Full tier definitions — commission rates, feature gates and MW bands. */
export const TIERS: Record<TierName, Tier> = {
  Bronze: {
    nome: 'Bronze',
    upfront: 1.0,
    recorr: 1.0,
    cor: '#9098AB',
    precoBase: false,
    atualMW: 0,
    proxMW: 5,
    prox: 'Prata',
  },
  Prata: {
    nome: 'Prata',
    upfront: 1.5,
    recorr: 1.5,
    cor: '#646E85',
    precoBase: false,
    atualMW: 5,
    proxMW: 15,
    prox: 'Ouro',
  },
  Ouro: {
    nome: 'Ouro',
    upfront: 2.0,
    recorr: 2.0,
    cor: '#F97316',
    precoBase: true,
    atualMW: 15,
    proxMW: 40,
    prox: 'Diamante',
  },
  Diamante: {
    nome: 'Diamante',
    upfront: 2.5,
    recorr: 3.0,
    cor: '#1E2C7A',
    precoBase: true,
    atualMW: 40,
    proxMW: null,
    prox: null,
  },
}

export function getTier(name: TierName): Tier {
  return TIERS[name]
}

/** Progress percent toward the next tier (mirrors prototype heuristic). */
export function tierProgressPct(tier: Tier): number {
  return tier.proxMW ? Math.round(((tier.atualMW + 7) / tier.proxMW) * 100) : 100
}

export interface QuoteInputs {
  volume: number
  prazo: number
  preco: number
  /** Override upfront percent; null → use tier default. */
  upfrontPct?: number | null
  /** Override recurring R$/MWh; null → use tier default. */
  recorrRS?: number | null
}

export interface QuoteResult {
  upPct: number
  recRS: number
  mwhMes: number
  valorMes: number
  valorTotal: number
  upfront: number
  recorrMes: number
  recorrTotal: number
  total: number
}

/** Load factor applied to nameplate MW to derive monthly consumption. */
const LOAD_FACTOR = 0.6
const HOURS_PER_MONTH = 730

/**
 * Live commission simulation. Ported 1:1 from the prototype's
 * computeQuote so figures match the mockups exactly.
 */
export function computeQuote(tier: Tier, inputs: QuoteInputs): QuoteResult {
  const upPct = inputs.upfrontPct == null ? tier.upfront : inputs.upfrontPct
  const recRS = inputs.recorrRS == null ? tier.recorr : inputs.recorrRS
  const mwhMes = inputs.volume * HOURS_PER_MONTH * LOAD_FACTOR
  const valorMes = mwhMes * inputs.preco
  const valorTotal = valorMes * inputs.prazo
  const upfront = (valorTotal * upPct) / 100
  const recorrMes = mwhMes * recRS
  const recorrTotal = recorrMes * inputs.prazo
  const total = upfront + recorrTotal
  return {
    upPct,
    recRS,
    mwhMes,
    valorMes,
    valorTotal,
    upfront,
    recorrMes,
    recorrTotal,
    total,
  }
}
