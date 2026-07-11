import type { CSSProperties } from 'react'

interface AvatarProps {
  initials: string
  size?: number
  fontSize?: number
  style?: CSSProperties
}

/** Navy-gradient circular avatar with initials. */
export function Avatar({ initials, size = 32, fontSize = 11, style }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        background: 'linear-gradient(135deg, var(--eeds-navy-600), var(--eeds-navy-800))',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 600,
        ...style,
      }}
    >
      {initials}
    </div>
  )
}
