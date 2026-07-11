interface ToggleProps {
  on: boolean
  onToggle: () => void
  ariaLabel?: string
}

/** Pill switch used across notification preferences. */
export function Toggle({ on, onToggle, ariaLabel }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      style={{
        width: 38,
        height: 22,
        border: 0,
        borderRadius: 9999,
        padding: 2,
        cursor: 'pointer',
        background: on ? 'var(--eeds-navy-600)' : 'var(--eeds-ink-300)',
        transition: 'background var(--eeds-d-base) var(--eeds-ease-standard)',
        display: 'flex',
        justifyContent: on ? 'flex-end' : 'flex-start',
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: 'var(--eeds-shadow-sm)',
        }}
      />
    </button>
  )
}
