import { useState } from 'react'
import { Screen } from '@/components/ui/Screen'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useResource } from '@/hooks/useResource'
import { supportService } from '@/services'
import { nowHM } from '@/lib/format'
import type { ChatMessage } from '@/types'

export function Support() {
  const initialMsgs = useResource(supportService.messages)
  const cases = useResource(supportService.cases)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMsgs)
  const [draft, setDraft] = useState('')

  const send = () => {
    const txt = draft.trim()
    if (!txt) return
    setMessages((m) => [...m, { from: 'me', txt, hora: nowHM() }])
    setDraft('')
  }

  return (
    <Screen>
      <div style={{ marginBottom: 20 }}>
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
          Atendimento
        </h2>
        <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
          Fale com o time de suporte ao parceiro e acompanhe seus chamados.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* chat */}
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--eeds-ink-200)',
            borderRadius: 16,
            boxShadow: 'var(--eeds-shadow-card)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: 560,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px 20px',
              background: 'linear-gradient(135deg, var(--eeds-navy-700), var(--eeds-navy-800))',
              color: '#fff',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              <Icon name="Headphones" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Suporte ao parceiro</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--eeds-success-fg)', display: 'inline-block' }} />
                Online · responde em até 5 min
              </p>
            </div>
          </div>

          <div
            className="ee-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              background: 'var(--eeds-ink-50)',
            }}
          >
            {messages.map((m, i) => {
              const mine = m.from === 'me'
              return (
                <div key={i} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '76%' }}>
                    {m.nome ? (
                      <p
                        style={{
                          fontSize: 10,
                          textTransform: 'uppercase',
                          letterSpacing: '.06em',
                          color: 'var(--eeds-ink-500)',
                          fontWeight: 600,
                          margin: '0 0 4px 2px',
                        }}
                      >
                        {m.nome}
                      </p>
                    ) : null}
                    <div
                      style={{
                        background: mine ? 'var(--eeds-navy-600)' : '#fff',
                        color: mine ? '#fff' : 'var(--eeds-ink-800)',
                        border: `1px solid ${mine ? 'var(--eeds-navy-600)' : 'var(--eeds-ink-200)'}`,
                        borderRadius: 14,
                        padding: '10px 14px',
                        fontSize: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      {m.txt}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--eeds-font-mono)',
                        fontSize: 10,
                        color: 'var(--eeds-ink-400)',
                        margin: '4px 2px 0',
                        textAlign: mine ? 'right' : 'left',
                      }}
                    >
                      {m.hora}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ padding: '14px 16px', borderTop: '1px solid var(--eeds-ink-100)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              aria-label="Anexar"
              style={{ border: 0, background: 'transparent', color: 'var(--eeds-ink-400)', cursor: 'pointer', fontSize: 18, display: 'inline-flex', padding: 8 }}
            >
              <Icon name="Paperclip" />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              placeholder="Escreva sua mensagem..."
              className="ee-input-chat"
              style={{
                flex: 1,
                height: 42,
                padding: '0 14px',
                border: '1px solid var(--eeds-ink-200)',
                borderRadius: 10,
                fontFamily: 'var(--eeds-font-body)',
                fontSize: 14,
                color: 'var(--eeds-ink-800)',
                outline: 'none',
                background: 'var(--eeds-ink-50)',
              }}
            />
            <button
              onClick={send}
              aria-label="Enviar"
              style={{
                width: 42,
                height: 42,
                flexShrink: 0,
                border: 0,
                borderRadius: 10,
                background: 'var(--eeds-orange-400)',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              <Icon name="Send" />
            </button>
          </div>
          <p
            style={{
              fontSize: 11,
              color: 'var(--eeds-ink-400)',
              textAlign: 'center',
              padding: '0 16px 12px',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <span style={{ fontSize: 12, display: 'inline-flex' }}>
              <Icon name="ShieldCheck" />
            </span>{' '}
            Suas mensagens são registradas e auditadas conforme LGPD
          </p>
        </div>

        {/* chamados */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontFamily: 'var(--eeds-font-display)', fontSize: 16, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: 0 }}>
              Meus chamados
            </h3>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                height: 38,
                padding: '0 14px',
                border: 0,
                background: 'var(--eeds-orange-400)',
                color: '#fff',
                borderRadius: 8,
                fontFamily: 'var(--eeds-font-body)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: 'var(--eeds-shadow-sm)',
              }}
            >
              <span style={{ fontSize: 15, display: 'inline-flex' }}>
                <Icon name="Plus" />
              </span>{' '}
              Abrir novo chamado
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cases.map((c) => (
              <div
                key={c.id}
                style={{
                  background: '#fff',
                  border: '1px solid var(--eeds-ink-200)',
                  borderRadius: 12,
                  padding: 16,
                  boxShadow: 'var(--eeds-shadow-sm)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)' }}>{c.id}</span>
                  <StatusBadge variant={c.statusVariant}>{c.status}</StatusBadge>
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-800)', margin: '0 0 10px', lineHeight: 1.4 }}>{c.assunto}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)' }}>{c.criado}</span>
                  <StatusBadge variant={c.slaVariant}>{c.sla}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}
