import type { StatusVariant } from '@/types'

/** Background/foreground/border triple for a status pill or icon tint. */
export interface StatusColors {
  bg: string
  fg: string
  bd: string
}

const MAP: Record<StatusVariant, StatusColors> = {
  info: {
    bg: 'var(--eeds-info-bg)',
    fg: 'var(--eeds-info-fg)',
    bd: 'var(--eeds-info-border)',
  },
  warning: {
    bg: 'var(--eeds-warning-bg)',
    fg: 'var(--eeds-warning-fg)',
    bd: 'var(--eeds-warning-border)',
  },
  success: {
    bg: 'var(--eeds-success-bg)',
    fg: 'var(--eeds-success-fg)',
    bd: 'var(--eeds-success-border)',
  },
  danger: {
    bg: 'var(--eeds-danger-bg)',
    fg: 'var(--eeds-danger-fg)',
    bd: 'var(--eeds-danger-border)',
  },
  neutral: {
    bg: 'var(--eeds-ink-100)',
    fg: 'var(--eeds-ink-700)',
    bd: 'var(--eeds-ink-200)',
  },
  brand: {
    bg: 'var(--eeds-navy-50)',
    fg: 'var(--eeds-navy-700)',
    bd: 'var(--eeds-navy-200)',
  },
  orange: {
    bg: 'var(--eeds-orange-50)',
    fg: 'var(--eeds-orange-600)',
    bd: 'var(--eeds-orange-200)',
  },
}

/** Resolve semantic colors for a status variant (falls back to neutral). */
export function statusColors(variant: StatusVariant): StatusColors {
  return MAP[variant] ?? MAP.neutral
}
