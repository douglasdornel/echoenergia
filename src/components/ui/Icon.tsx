import type { CSSProperties } from 'react'
import { ICON_REGISTRY } from './icons'

interface IconProps {
  name: string
  /** Any CSS size; defaults to 1em so it scales with font-size. */
  size?: number | string
  color?: string
  style?: CSSProperties
  className?: string
  strokeWidth?: number
}

/**
 * Lucide icon by name. Mirrors the prototype's buildIco: 1em box,
 * 1.75 stroke, currentColor, block display. Only icons registered
 * in icons.ts are available (keeps the bundle lean).
 */
export function Icon({ name, size = '1em', color, style, className, strokeWidth = 1.75 }: IconProps) {
  const Cmp = ICON_REGISTRY[name]
  if (!Cmp) return null
  return (
    <Cmp
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={{ display: 'block', ...style }}
    />
  )
}
