import type { CSSProperties } from 'react'

interface FieldProps {
  label: string
  defaultValue?: string
  placeholder?: string
  mono?: boolean
  type?: string
  style?: CSSProperties
}

const labelStyle: CSSProperties = {
  fontSize: 10,
  textTransform: 'uppercase',
  letterSpacing: '.06em',
  color: 'var(--eeds-ink-600)',
  fontWeight: 500,
  margin: '0 0 6px',
}

/** Labeled text input. Uncontrolled (defaultValue) — form is presentational. */
export function Field({ label, defaultValue, placeholder, mono, type = 'text', style }: FieldProps) {
  return (
    <div style={style}>
      <p style={labelStyle}>{label}</p>
      <input
        className="ee-input"
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: 42,
          padding: '0 12px',
          border: '1px solid var(--eeds-ink-200)',
          borderRadius: 8,
          fontFamily: mono ? 'var(--eeds-font-mono)' : 'var(--eeds-font-body)',
          fontSize: 14,
          color: 'var(--eeds-ink-800)',
          outline: 'none',
          background: '#fff',
        }}
      />
    </div>
  )
}
