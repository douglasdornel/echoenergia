import { NavLink, useNavigate } from 'react-router-dom'
import { NAV, isSeparator } from './nav'
import { Icon } from '@/components/ui/Icon'
import { useSettings } from '@/context/SettingsContext'
import { useAuth } from '@/context/AuthContext'
import { PARTNER } from '@/data/mock'
import { TIER_ICON, tierProgressPct } from '@/lib/tiers'

const eyebrow = {
  fontSize: 10,
  textTransform: 'uppercase' as const,
  letterSpacing: '.06em',
  fontWeight: 500 as const,
}

export function Sidebar() {
  const { tierName, tier } = useSettings()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const pct = tierProgressPct(tier)
  const proxNivel = tier.prox ?? 'Topo'

  return (
    <aside
      style={{
        width: 264,
        background: '#fff',
        borderRight: '1px solid var(--eeds-ink-200)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          borderBottom: '1px solid var(--eeds-ink-100)',
        }}
      >
        <img src="/assets/echoenergia-logo.png" alt="Echo Energia" style={{ height: 26 }} />
      </div>

      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--eeds-ink-100)' }}>
        <p style={{ ...eyebrow, color: 'var(--eeds-ink-500)', margin: 0 }}>Parceiro comercial</p>
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: '4px 0 6px' }}>
          {PARTNER.nomeCurto}
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 9px',
            borderRadius: 9999,
            background: 'var(--eeds-orange-50)',
            border: '1px solid var(--eeds-orange-200)',
          }}
        >
          <span style={{ fontSize: 13, display: 'inline-flex', color: 'var(--eeds-orange-500)' }}>
            <Icon name={TIER_ICON[tierName]} />
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--eeds-orange-600)' }}>Parceiro {tierName}</span>
        </div>
      </div>

      <nav className="ee-scroll" style={{ padding: 12, flex: 1, overflowY: 'auto' }}>
        {NAV.map((entry, i) => {
          if (isSeparator(entry)) {
            return (
              <p
                key={`sep-${i}`}
                style={{ ...eyebrow, color: 'var(--eeds-ink-400)', fontWeight: 600, margin: '14px 12px 6px' }}
              >
                {entry.label}
              </p>
            )
          }
          return (
            <NavLink
              key={entry.id}
              to={entry.path}
              end={entry.path === '/'}
              style={({ isActive }) => ({
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                height: 40,
                padding: '0 12px',
                borderRadius: 8,
                fontFamily: 'var(--eeds-font-body)',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 2,
                textDecoration: 'none',
                background: isActive ? 'var(--eeds-navy-50)' : 'transparent',
                color: isActive ? 'var(--eeds-navy-700)' : 'var(--eeds-ink-600)',
                transition:
                  'background var(--eeds-d-base) var(--eeds-ease-standard), color var(--eeds-d-base) var(--eeds-ease-standard)',
              })}
            >
              {({ isActive }) => (
                <>
                  <span style={{ fontSize: 18, display: 'inline-flex' }}>
                    <Icon name={entry.icon} />
                  </span>
                  <span>{entry.label}</span>
                  {entry.badge ? (
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontFamily: 'var(--eeds-font-mono)',
                        fontSize: 10,
                        fontWeight: 600,
                        background: 'var(--eeds-orange-400)',
                        color: '#fff',
                        borderRadius: 9999,
                        padding: '1px 7px',
                      }}
                    >
                      {entry.badge}
                    </span>
                  ) : null}
                  {isActive ? (
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 8,
                        bottom: 8,
                        width: 2,
                        background: 'var(--eeds-orange-400)',
                        borderRadius: '0 2px 2px 0',
                      }}
                    />
                  ) : null}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div style={{ padding: 12, borderTop: '1px solid var(--eeds-ink-100)' }}>
        <button
          onClick={() => navigate('/nivel')}
          style={{
            width: '100%',
            textAlign: 'left',
            border: '1px solid var(--eeds-ink-200)',
            background: 'var(--eeds-ink-50)',
            borderRadius: 12,
            padding: 12,
            cursor: 'pointer',
            marginBottom: 8,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--eeds-ink-700)' }}>Rumo a {proxNivel}</span>
            <span
              style={{
                fontFamily: 'var(--eeds-font-mono)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--eeds-orange-500)',
              }}
            >
              {pct}%
            </span>
          </div>
          <div style={{ height: 6, background: 'var(--eeds-ink-200)', borderRadius: 9999, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                background: 'linear-gradient(90deg, var(--eeds-orange-400), var(--eeds-orange-300))',
                borderRadius: 9999,
              }}
            />
          </div>
        </button>
        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            height: 38,
            padding: '0 12px',
            border: 0,
            background: 'transparent',
            borderRadius: 8,
            fontFamily: 'var(--eeds-font-body)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--eeds-ink-500)',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 16, display: 'inline-flex' }}>
            <Icon name="LogOut" />
          </span>{' '}
          Sair
        </button>
      </div>
    </aside>
  )
}
