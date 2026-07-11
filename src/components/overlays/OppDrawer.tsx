import { useNavigate } from 'react-router-dom'
import { Drawer } from './Drawer'
import { CloseButton } from './CloseButton'
import { Icon } from '@/components/ui/Icon'
import { num } from '@/lib/format'
import type { Opportunity } from '@/types'

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid var(--eeds-ink-100)',
      }}
    >
      <span style={{ fontSize: 13, color: 'var(--eeds-ink-600)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--eeds-ink-800)' }}>
        {value}
      </span>
    </div>
  )
}

export function OppDrawer({ opp, onClose }: { opp: Opportunity | null; onClose: () => void }) {
  const navigate = useNavigate()

  return (
    <Drawer open={!!opp} onClose={onClose}>
      {opp ? (
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <p
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                  color: 'var(--eeds-ink-500)',
                  margin: 0,
                }}
              >
                Oportunidade
              </p>
              <p
                style={{
                  fontFamily: 'var(--eeds-font-display)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--eeds-ink-800)',
                  margin: '4px 0 0',
                }}
              >
                {opp.empresa}
              </p>
            </div>
            <CloseButton onClick={onClose} />
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg,var(--eeds-navy-700),var(--eeds-navy-800))',
              borderRadius: 12,
              padding: 20,
              color: '#fff',
              marginBottom: 16,
            }}
          >
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', margin: 0 }}>Valor estimado do contrato</p>
            <p style={{ fontFamily: 'var(--eeds-font-display)', fontSize: 28, fontWeight: 700, margin: '6px 0 0' }}>
              R$ {num(opp.valor, 1)} mi
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <StatRow label="Demanda média" value={`${num(opp.mw, 1)} MW`} />
            <StatRow label="Prazo" value={`${opp.prazo} meses`} />
            <StatRow label="Probabilidade" value={`${opp.prob}%`} />
          </div>

          <button
            onClick={() => navigate('/cotacao')}
            style={{
              width: '100%',
              marginTop: 20,
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
              <Icon name="Calculator" />
            </span>{' '}
            Atualizar cotação
          </button>
        </div>
      ) : null}
    </Drawer>
  )
}
