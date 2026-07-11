import type { ReactNode } from 'react'

interface ScreenProps {
  children: ReactNode
  maxWidth?: number
}

/** Padded, centered, animated screen container (mirrors .ee-fade wrappers). */
export function Screen({ children, maxWidth = 1400 }: ScreenProps) {
  return (
    <div className="ee-fade" style={{ padding: 24, maxWidth, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
  )
}
