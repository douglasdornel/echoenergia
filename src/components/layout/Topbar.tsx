import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { UserMenu } from './UserMenu'
import { titleForPath } from './nav'

export function Topbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'rgba(255,255,255,.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--eeds-ink-200)',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        gap: 16,
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--eeds-font-display)',
          fontSize: 18,
          fontWeight: 600,
          color: 'var(--eeds-ink-800)',
          margin: 0,
        }}
      >
        {titleForPath(pathname)}
      </h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => navigate('/notificacoes')}
          aria-label="Notificações"
          style={{
            background: 'transparent',
            border: 0,
            padding: 10,
            borderRadius: 8,
            color: 'var(--eeds-ink-600)',
            cursor: 'pointer',
            position: 'relative',
            display: 'inline-flex',
          }}
        >
          <span style={{ fontSize: 18, display: 'inline-flex' }}>
            <Icon name="Bell" />
          </span>
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 7,
              height: 7,
              background: 'var(--eeds-orange-400)',
              borderRadius: '50%',
              boxShadow: '0 0 0 2px #fff',
            }}
          />
        </button>
        <UserMenu />
      </div>
    </header>
  )
}
