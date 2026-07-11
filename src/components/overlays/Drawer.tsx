import type { ReactNode } from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

/** Right-side sliding drawer with a dimmed backdrop. */
export function Drawer({ open, onClose, children }: DrawerProps) {
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(14,17,25,.4)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ee-scroll"
        style={{
          width: 440,
          maxWidth: '92vw',
          height: '100%',
          background: '#fff',
          boxShadow: 'var(--eeds-shadow-modal)',
          overflowY: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}
