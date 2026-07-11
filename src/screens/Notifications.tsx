import { Screen } from '@/components/ui/Screen'
import { Icon } from '@/components/ui/Icon'
import { useResource } from '@/hooks/useResource'
import { notificationsService } from '@/services'
import { statusColors } from '@/lib/status'

export function Notifications() {
  const groups = useResource(notificationsService.groups)
  const unread = groups.reduce((a, g) => a + g.items.filter((i) => i.unread).length, 0)

  return (
    <Screen maxWidth={840}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
        <div>
          <h2
            style={{
              fontFamily: 'var(--eeds-font-display)',
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--eeds-ink-800)',
              margin: 0,
              letterSpacing: '-.02em',
            }}
          >
            Notificações
          </h2>
          <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
            Você tem {unread} notificações não lidas.
          </p>
        </div>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            height: 38,
            padding: '0 14px',
            border: '1px solid var(--eeds-ink-300)',
            background: '#fff',
            color: 'var(--eeds-ink-700)',
            borderRadius: 8,
            fontFamily: 'var(--eeds-font-body)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 15, display: 'inline-flex' }}>
            <Icon name="CheckCheck" />
          </span>{' '}
          Marcar todas como lidas
        </button>
      </div>

      {groups.map((g) => (
        <div key={g.quando}>
          <p
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '.06em',
              color: 'var(--eeds-ink-500)',
              fontWeight: 600,
              margin: '18px 0 10px',
            }}
          >
            {g.quando}
          </p>
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--eeds-ink-200)',
              borderRadius: 12,
              boxShadow: 'var(--eeds-shadow-card)',
              overflow: 'hidden',
            }}
          >
            {g.items.map((n, i) => {
              const c = statusColors(n.variant)
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '16px 18px',
                    borderBottom: '1px solid var(--eeds-ink-100)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: c.bg,
                      color: c.fg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                    }}
                  >
                    <Icon name={n.icon} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--eeds-ink-500)', fontWeight: 600 }}>
                        {n.tipo}
                      </span>
                      {n.unread ? (
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--eeds-orange-400)', display: 'inline-block' }} />
                      ) : null}
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-800)', margin: '0 0 2px' }}>{n.titulo}</p>
                    <p style={{ fontSize: 13, color: 'var(--eeds-ink-500)', margin: 0, lineHeight: 1.45 }}>{n.desc}</p>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--eeds-font-mono)',
                      fontSize: 11,
                      color: 'var(--eeds-ink-400)',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {n.hora}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </Screen>
  )
}
