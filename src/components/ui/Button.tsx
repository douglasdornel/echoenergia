import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { Icon } from './Icon'

type Variant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  /** Lucide icon name rendered before the label. */
  icon?: string
  /** Icon-only square button (no label). */
  iconOnly?: boolean
  height?: number
  children?: ReactNode
}

/** EEDS action button — orange primary CTA or outlined secondary. */
export function Button({
  variant = 'primary',
  icon,
  iconOnly,
  height = 40,
  children,
  style,
  ...rest
}: ButtonProps) {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height,
    padding: iconOnly ? '0 12px' : '0 16px',
    borderRadius: 8,
    fontFamily: 'var(--eeds-font-body)',
    fontSize: 14,
    fontWeight: variant === 'primary' ? 600 : 500,
    cursor: 'pointer',
  }
  const variantStyle: CSSProperties =
    variant === 'primary'
      ? { border: 0, background: 'var(--eeds-orange-400)', color: '#fff', boxShadow: 'var(--eeds-shadow-sm)' }
      : { border: '1px solid var(--eeds-ink-300)', background: '#fff', color: 'var(--eeds-ink-700)' }

  return (
    <button style={{ ...base, ...variantStyle, ...style }} {...rest}>
      {icon ? (
        <span style={{ fontSize: 16, display: 'inline-flex' }}>
          <Icon name={icon} />
        </span>
      ) : null}
      {children}
    </button>
  )
}
