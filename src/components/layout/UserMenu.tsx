import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/context/AuthContext'
import { CURRENT_USER } from '@/data/mock'

interface MenuEntry {
  label: string
  icon: string
  to?: string
  danger?: boolean
}

const ENTRIES: (MenuEntry | 'sep')[] = [
  { label: 'Minha conta', icon: 'User', to: '/conta?tab=usuario' },
  { label: 'Cadastro do parceiro', icon: 'Building2', to: '/conta?tab=parceiro' },
  { label: 'Agentes de venda', icon: 'Users', to: '/conta?tab=agentes' },
  { label: 'Notificações', icon: 'Bell', to: '/notificacoes' },
  { label: 'Atendimento', icon: 'Headphones', to: '/atendimento' },
  'sep',
  { label: 'Sair', icon: 'LogOut', danger: true },
]

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: 6,
          borderRadius: 8,
          cursor: 'pointer',
          background: open ? 'var(--eeds-ink-100)' : 'transparent',
        }}
      >
        <Avatar initials={CURRENT_USER.iniciais} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--eeds-ink-700)',
          }}
        >
          <span>{CURRENT_USER.nome}</span>
          <span
            style={{
              fontSize: 14,
              display: 'inline-flex',
              color: 'var(--eeds-ink-500)',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform var(--eeds-d-base) var(--eeds-ease-standard)',
            }}
          >
            <Icon name="ChevronDown" />
          </span>
        </div>
      </div>

      {open ? (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: 248,
            background: '#fff',
            border: '1px solid var(--eeds-ink-200)',
            borderRadius: 12,
            boxShadow: 'var(--eeds-shadow-pop)',
            padding: 6,
            zIndex: 50,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 10px 12px',
              borderBottom: '1px solid var(--eeds-ink-100)',
              marginBottom: 6,
            }}
          >
            <Avatar initials={CURRENT_USER.iniciais} size={38} fontSize={12} />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: 0 }}>
                {CURRENT_USER.nome}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: 'var(--eeds-ink-500)',
                  margin: '2px 0 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {CURRENT_USER.email}
              </p>
            </div>
          </div>
          {ENTRIES.map((entry, i) => {
            if (entry === 'sep') return null
            return (
              <button
                key={i}
                className="ee-menu-item"
                onClick={() => {
                  setOpen(false)
                  if (entry.danger) logout()
                  else if (entry.to) navigate(entry.to)
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  height: 38,
                  padding: '0 10px',
                  border: 0,
                  background: 'transparent',
                  borderRadius: 8,
                  fontFamily: 'var(--eeds-font-body)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: entry.danger ? 'var(--eeds-danger-fg)' : 'var(--eeds-ink-700)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    display: 'inline-flex',
                    color: entry.danger ? 'var(--eeds-danger-fg)' : 'var(--eeds-ink-400)',
                  }}
                >
                  <Icon name={entry.icon} />
                </span>
                <span>{entry.label}</span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
