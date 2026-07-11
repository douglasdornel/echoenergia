import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Field } from '@/components/ui/Field'
import { CloseButton } from './CloseButton'
import { statusColors } from '@/lib/status'
import { ACCESS_PROFILES, DEFAULT_INVITE_NOTIF, INVITE_NOTIFICATION_PREFS } from '@/data/mock'

const sectionLabel = {
  fontSize: 10,
  textTransform: 'uppercase' as const,
  letterSpacing: '.06em',
  color: 'var(--eeds-ink-600)',
  fontWeight: 600 as const,
}

export function InviteAgentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [profile, setProfile] = useState<string>('agente')
  const [notif, setNotif] = useState<Record<string, boolean>>(DEFAULT_INVITE_NOTIF)

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 70,
        background: 'rgba(14,17,25,.4)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ee-scroll"
        style={{
          width: 620,
          maxWidth: '94vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#fff',
          borderRadius: 16,
          boxShadow: 'var(--eeds-shadow-modal)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '24px 24px 0' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--eeds-font-display)', fontSize: 18, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: 0 }}>
              Convidar agente
            </h3>
            <p style={{ fontSize: 13, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
              Envie um convite por e-mail e defina o perfil de acesso ao portal.
            </p>
          </div>
          <CloseButton onClick={onClose} />
        </div>

        <div style={{ padding: '20px 24px' }}>
          <p style={{ ...sectionLabel, margin: '0 0 10px' }}>Dados do agente</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <Field label="Nome" placeholder="Nome" />
            <Field label="Sobrenome" placeholder="Sobrenome" />
            <Field label="E-mail" placeholder="email@empresa.com.br" />
            <Field label="Telefone" placeholder="(00) 00000-0000" mono />
          </div>

          <p style={{ ...sectionLabel, fontWeight: 500, margin: '18px 0 10px' }}>Perfil de acesso</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ACCESS_PROFILES.map((p) => {
              const sel = profile === p.id
              return (
                <div
                  key={p.id}
                  onClick={() => setProfile(p.id)}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: 16,
                    border: `1px solid ${sel ? 'var(--eeds-navy-600)' : 'var(--eeds-ink-200)'}`,
                    boxShadow: sel ? '0 0 0 1px var(--eeds-navy-600)' : 'none',
                    background: sel ? 'var(--eeds-navy-50)' : '#fff',
                    borderRadius: 12,
                    cursor: 'pointer',
                    transition:
                      'background var(--eeds-d-base) var(--eeds-ease-standard), border-color var(--eeds-d-base) var(--eeds-ease-standard)',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: sel ? 'var(--eeds-navy-600)' : 'var(--eeds-ink-100)',
                      color: sel ? '#fff' : 'var(--eeds-ink-500)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                    }}
                  >
                    <Icon name={p.icon} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: 0 }}>{p.nome}</p>
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          flexShrink: 0,
                          border: `2px solid ${sel ? 'var(--eeds-navy-600)' : 'var(--eeds-ink-300)'}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {sel ? <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--eeds-navy-600)' }} /> : null}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '2px 0 10px' }}>{p.resumo}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {p.bullets.map((b) => (
                        <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <span style={{ fontSize: 14, display: 'inline-flex', color: 'var(--eeds-success-fg)', flexShrink: 0, marginTop: 1 }}>
                            <Icon name="CircleCheck" />
                          </span>
                          <span style={{ fontSize: 13, color: 'var(--eeds-ink-700)', lineHeight: 1.45 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <p style={{ ...sectionLabel, margin: '20px 0 10px' }}>Configuração de notificações</p>
          <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '0 0 12px' }}>
            Escolha sobre o que este agente será avisado por e-mail e no portal.
          </p>
          <div style={{ border: '1px solid var(--eeds-ink-200)', borderRadius: 12, overflow: 'hidden' }}>
            {INVITE_NOTIFICATION_PREFS.map((n) => {
              const on = !!notif[n.id]
              const c = statusColors(n.variant)
              return (
                <div
                  key={n.id}
                  onClick={() => setNotif((prev) => ({ ...prev, [n.id]: !prev[n.id] }))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderBottom: '1px solid var(--eeds-ink-100)',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      flexShrink: 0,
                      background: c.bg,
                      color: c.fg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                    }}
                  >
                    <Icon name={n.icon} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--eeds-ink-800)', margin: 0 }}>{n.label}</p>
                    <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '1px 0 0' }}>{n.desc}</p>
                  </div>
                  <div
                    style={{
                      width: 38,
                      height: 22,
                      borderRadius: 9999,
                      flexShrink: 0,
                      padding: 2,
                      background: on ? 'var(--eeds-navy-600)' : 'var(--eeds-ink-300)',
                      transition: 'background var(--eeds-d-base) var(--eeds-ease-standard)',
                      display: 'flex',
                      justifyContent: on ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: 'var(--eeds-shadow-sm)' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '0 24px 24px' }}>
          <button
            onClick={onClose}
            style={{
              height: 42,
              padding: '0 18px',
              border: '1px solid var(--eeds-ink-300)',
              background: '#fff',
              color: 'var(--eeds-ink-700)',
              borderRadius: 10,
              fontFamily: 'var(--eeds-font-body)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: 42,
              padding: '0 18px',
              border: 0,
              background: 'var(--eeds-orange-400)',
              color: '#fff',
              borderRadius: 10,
              fontFamily: 'var(--eeds-font-body)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: 'var(--eeds-shadow-sm)',
            }}
          >
            <span style={{ fontSize: 16, display: 'inline-flex' }}>
              <Icon name="Send" />
            </span>{' '}
            Enviar convite
          </button>
        </div>
      </div>
    </div>
  )
}
