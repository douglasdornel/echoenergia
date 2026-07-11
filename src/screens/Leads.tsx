import { useState } from 'react'
import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { LeadDrawer } from '@/components/overlays/LeadDrawer'
import { useResource } from '@/hooks/useResource'
import { leadsService } from '@/services'
import { initials, mw } from '@/lib/format'
import type { Lead } from '@/types'

const GRID = '2.2fr 1.6fr 0.8fr 0.9fr 1fr 1.1fr 36px'
const FILTERS = ['Todos', 'Novos', 'Em contato', 'Qualificados']

const th = {
  fontSize: 10,
  textTransform: 'uppercase' as const,
  letterSpacing: '.06em',
  color: 'var(--eeds-ink-500)',
  fontWeight: 500 as const,
}

export function Leads() {
  const leads = useResource(leadsService.list)
  const [selected, setSelected] = useState<Lead | null>(null)

  return (
    <Screen>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 20,
        }}
      >
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
            Leads
          </h2>
          <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
            Registre e qualifique potenciais clientes antes de abrir uma oportunidade.
          </p>
        </div>
        <Button icon="Plus">Registrar lead</Button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {FILTERS.map((f, i) => (
          <span
            key={f}
            style={
              i === 0
                ? {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    height: 32,
                    padding: '0 12px',
                    borderRadius: 8,
                    background: 'var(--eeds-navy-600)',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 500,
                  }
                : {
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: 32,
                    padding: '0 12px',
                    borderRadius: 8,
                    background: '#fff',
                    border: '1px solid var(--eeds-ink-200)',
                    color: 'var(--eeds-ink-600)',
                    fontSize: 13,
                    cursor: 'pointer',
                  }
            }
          >
            {f}
          </span>
        ))}
      </div>

      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: GRID,
            gap: 12,
            padding: '12px 20px',
            background: 'var(--eeds-ink-50)',
            borderBottom: '1px solid var(--eeds-ink-200)',
          }}
        >
          <span style={th}>Empresa</span>
          <span style={th}>Contato</span>
          <span style={th}>Submercado</span>
          <span style={{ ...th, textAlign: 'right' }}>Demanda</span>
          <span style={th}>Origem</span>
          <span style={th}>Status</span>
          <span />
        </div>
        {leads.map((l) => (
          <div
            key={l.id}
            onClick={() => setSelected(l)}
            className="ee-row-hover"
            style={{
              display: 'grid',
              gridTemplateColumns: GRID,
              gap: 12,
              alignItems: 'center',
              padding: '14px 20px',
              borderBottom: '1px solid var(--eeds-ink-100)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'var(--eeds-navy-50)',
                  color: 'var(--eeds-navy-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {initials(l.empresa)}
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--eeds-ink-800)',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {l.empresa}
                </p>
                <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>
                  {l.id}
                </p>
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13, color: 'var(--eeds-ink-700)', margin: 0 }}>{l.contato}</p>
              <p style={{ fontSize: 11, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>{l.cargo}</p>
            </div>
            <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 12, color: 'var(--eeds-ink-700)' }}>{l.sub}</span>
            <span
              style={{
                fontFamily: 'var(--eeds-font-mono)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--eeds-ink-800)',
                textAlign: 'right',
              }}
            >
              {mw(l.mw)}
            </span>
            <span style={{ fontSize: 12, color: 'var(--eeds-ink-600)' }}>{l.origem}</span>
            <span>
              <StatusBadge variant={l.statusVariant}>{l.status}</StatusBadge>
            </span>
            <span style={{ display: 'inline-flex', justifyContent: 'center', color: 'var(--eeds-ink-400)', fontSize: 16 }}>
              <Icon name="ChevronRight" />
            </span>
          </div>
        ))}
      </Card>

      <LeadDrawer lead={selected} onClose={() => setSelected(null)} />
    </Screen>
  )
}
