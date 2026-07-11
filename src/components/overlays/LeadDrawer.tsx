import { useNavigate } from 'react-router-dom'
import { Drawer } from './Drawer'
import { CloseButton } from './CloseButton'
import { Icon } from '@/components/ui/Icon'
import { initials, mw } from '@/lib/format'
import type { Lead } from '@/types'

const eyebrow = {
  fontSize: 10,
  textTransform: 'uppercase' as const,
  letterSpacing: '.06em',
  color: 'var(--eeds-ink-500)',
  margin: 0,
}

export function LeadDrawer({ lead, onClose }: { lead: Lead | null; onClose: () => void }) {
  const navigate = useNavigate()

  return (
    <Drawer open={!!lead} onClose={onClose}>
      {lead ? (
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'var(--eeds-navy-50)',
                  color: 'var(--eeds-navy-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {initials(lead.empresa)}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--eeds-font-display)',
                    fontSize: 17,
                    fontWeight: 600,
                    color: 'var(--eeds-ink-800)',
                    margin: 0,
                  }}
                >
                  {lead.empresa}
                </p>
                <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>
                  {lead.id}
                </p>
              </div>
            </div>
            <CloseButton onClick={onClose} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div style={{ background: 'var(--eeds-ink-50)', borderRadius: 10, padding: 12 }}>
              <p style={eyebrow}>Submercado</p>
              <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: '4px 0 0' }}>
                {lead.sub}
              </p>
            </div>
            <div style={{ background: 'var(--eeds-ink-50)', borderRadius: 10, padding: 12 }}>
              <p style={eyebrow}>Demanda</p>
              <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: '4px 0 0' }}>
                {mw(lead.mw)}
              </p>
            </div>
          </div>

          <p style={{ ...eyebrow, fontWeight: 500, margin: '0 0 10px' }}>Contato principal</p>
          <div style={{ border: '1px solid var(--eeds-ink-200)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: 0 }}>{lead.contato}</p>
            <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '2px 0 14px' }}>{lead.cargo}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 16, display: 'inline-flex', color: 'var(--eeds-ink-400)' }}>
                <Icon name="Phone" />
              </span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, color: 'var(--eeds-ink-700)' }}>{lead.fone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16, display: 'inline-flex', color: 'var(--eeds-ink-400)' }}>
                <Icon name="Mail" />
              </span>
              <span style={{ fontSize: 13, color: 'var(--eeds-ink-700)' }}>{lead.email}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => navigate('/cotacao')}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                height: 44,
                border: 0,
                background: 'var(--eeds-orange-400)',
                color: '#fff',
                borderRadius: 10,
                fontFamily: 'var(--eeds-font-body)',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 16, display: 'inline-flex' }}>
                <Icon name="ArrowUpRight" />
              </span>{' '}
              Criar oportunidade
            </button>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 44,
                padding: '0 16px',
                border: '1px solid var(--eeds-ink-300)',
                background: '#fff',
                color: 'var(--eeds-ink-700)',
                borderRadius: 10,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              <Icon name="PhoneCall" />
            </button>
          </div>
        </div>
      ) : null}
    </Drawer>
  )
}
