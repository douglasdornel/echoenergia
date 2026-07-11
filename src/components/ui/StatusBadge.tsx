import type { ReactNode } from 'react'
import type { StatusVariant } from '@/types'
import { statusColors } from '@/lib/status'

interface StatusBadgeProps {
  variant: StatusVariant
  children: ReactNode
  /** Optional leading icon element. */
  icon?: ReactNode
}

/** Rounded status pill with semantic colors. */
export function StatusBadge({ variant, children, icon }: StatusBadgeProps) {
  const c = statusColors(variant)
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 11,
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: 9999,
        background: c.bg,
        color: c.fg,
        border: `1px solid ${c.bd}`,
        whiteSpace: 'nowrap',
      }}
    >
      {icon ? <span style={{ fontSize: 11, display: 'inline-flex' }}>{icon}</span> : null}
      {children}
    </span>
  )
}
