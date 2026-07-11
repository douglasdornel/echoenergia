import { Icon } from '@/components/ui/Icon'

/** Small grey square close button used on drawers and modals. */
export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Fechar"
      style={{
        border: 0,
        background: 'var(--eeds-ink-100)',
        width: 32,
        height: 32,
        borderRadius: 8,
        cursor: 'pointer',
        color: 'var(--eeds-ink-600)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
      }}
    >
      <Icon name="X" />
    </button>
  )
}
