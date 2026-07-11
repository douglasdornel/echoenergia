import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { OppDrawer } from '@/components/overlays/OppDrawer'
import { useResource } from '@/hooks/useResource'
import { opportunitiesService } from '@/services'
import { fmt, num } from '@/lib/format'
import { PIPELINE_STAGE_COLORS } from '@/data/mock'
import type { Opportunity } from '@/types'

export function Opportunities() {
  const navigate = useNavigate()
  const pipeline = useResource(opportunitiesService.pipeline)
  const [selected, setSelected] = useState<Opportunity | null>(null)

  return (
    <div className="ee-fade" style={{ padding: 24, width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 20,
          maxWidth: 1400,
          marginLeft: 'auto',
          marginRight: 'auto',
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
            Oportunidades
          </h2>
          <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
            Acompanhe o pipeline de contratos em desenvolvimento por estágio.
          </p>
        </div>
        <Button icon="Calculator" onClick={() => navigate('/cotacao')}>
          Gerar cotação
        </Button>
      </div>

      <div className="ee-scroll" style={{ overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ display: 'flex', gap: 16, minWidth: 1100, maxWidth: 1400, margin: '0 auto' }}>
          {pipeline.map((col, i) => {
            const color = PIPELINE_STAGE_COLORS[i]
            const total = col.opps.reduce((a, o) => a + o.valor, 0) * 1e6
            return (
              <div key={col.stage} style={{ flex: 1, minWidth: 260, background: 'var(--eeds-ink-100)', borderRadius: 12, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--eeds-ink-700)' }}>{col.stage}</span>
                    <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)' }}>
                      {col.opps.length}
                    </span>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)', margin: '0 8px 12px' }}>
                  {fmt(total)}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.opps.map((o) => (
                    <div
                      key={o.empresa}
                      onClick={() => setSelected(o)}
                      className="ee-card-hover"
                      style={{
                        background: '#fff',
                        border: '1px solid var(--eeds-ink-200)',
                        borderRadius: 10,
                        padding: 14,
                        cursor: 'pointer',
                        boxShadow: 'var(--eeds-shadow-sm)',
                      }}
                    >
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: '0 0 6px' }}>{o.empresa}</p>
                      <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)', margin: '0 0 12px' }}>
                        {num(o.mw, 1)} MW · {o.prazo}m
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--eeds-font-display)',
                          fontSize: 18,
                          fontWeight: 700,
                          color: 'var(--eeds-ink-800)',
                          margin: '0 0 12px',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        R$ {num(o.valor, 1)} mi
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--eeds-ink-500)' }}>
                          Probabilidade
                        </span>
                        <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--eeds-ink-700)' }}>
                          {o.prob}%
                        </span>
                      </div>
                      <div style={{ height: 6, background: 'var(--eeds-ink-100)', borderRadius: 9999, overflow: 'hidden', marginBottom: 12 }}>
                        <div style={{ height: '100%', width: `${o.prob}%`, background: color, borderRadius: 9999 }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Avatar initials={o.owner} size={24} fontSize={9} />
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--eeds-ink-500)' }}>
                          <span style={{ fontSize: 12, display: 'inline-flex' }}>
                            <Icon name="Clock" />
                          </span>
                          {o.dias === 0 ? 'hoje' : `${o.dias}d`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <OppDrawer opp={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
