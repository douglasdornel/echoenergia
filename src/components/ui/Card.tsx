import type { CSSProperties, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  padding?: number | string
  radius?: number
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

/** White surface card with the EEDS border + card shadow. */
export function Card({ children, padding = 20, radius = 12, style, className, onClick }: CardProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: '#fff',
        border: '1px solid var(--eeds-ink-200)',
        borderRadius: radius,
        boxShadow: 'var(--eeds-shadow-card)',
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
