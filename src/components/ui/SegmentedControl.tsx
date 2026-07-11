interface Segment<T extends string> {
  value: T
  label: string
}

interface SegmentedControlProps<T extends string> {
  segments: Segment<T>[]
  value: T
  onChange: (value: T) => void
}

/** Pill segmented control (tabs) used on quote / payments / account. */
export function SegmentedControl<T extends string>({ segments, value, onChange }: SegmentedControlProps<T>) {
  return (
    <div
      style={{
        display: 'inline-flex',
        background: 'var(--eeds-ink-100)',
        borderRadius: 10,
        padding: 3,
      }}
    >
      {segments.map((s) => {
        const active = s.value === value
        return (
          <button
            key={s.value}
            type="button"
            onClick={() => onChange(s.value)}
            style={{
              height: 34,
              padding: '0 18px',
              border: 0,
              borderRadius: 8,
              fontFamily: 'var(--eeds-font-body)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              background: active ? '#fff' : 'transparent',
              color: active ? 'var(--eeds-navy-700)' : 'var(--eeds-ink-500)',
              boxShadow: active ? 'var(--eeds-shadow-sm)' : 'none',
            }}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
