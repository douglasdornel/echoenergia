import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useResource } from '@/hooks/useResource'
import { useSettings } from '@/context/SettingsContext'
import { negotiationsService } from '@/services'
import { fmt, mw, num } from '@/lib/format'

const GRID = '2fr 1.1fr 0.9fr 0.9fr 1.1fr 1.1fr 1fr'
const th = {
  fontSize: 10,
  textTransform: 'uppercase' as const,
  letterSpacing: '.06em',
  color: 'var(--eeds-ink-500)',
  fontWeight: 500 as const,
}
const cardHeading = {
  fontFamily: 'var(--eeds-font-display)',
  fontSize: 16,
  fontWeight: 600,
  color: 'var(--eeds-ink-800)',
  margin: 0,
}

export function Negotiations() {
  const { tier } = useSettings()
  const deals = useResource(negotiationsService.deals)
  const propostas = useResource(negotiationsService.proposals)

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
          Negociações
        </h2>
        <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
          Contratos fechados e propostas indicativas com preço base.
        </p>
      </div>

      {/* propostas indicativas */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <div>
            <h3 style={cardHeading}>Propostas indicativas</h3>
            <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>
              Solicite um preço base da Echo para negociar com seu cliente.
            </p>
          </div>
          {tier.precoBase ? (
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                height: 38,
                padding: '0 14px',
                border: '1px solid var(--eeds-navy-200)',
                background: 'var(--eeds-navy-50)',
                color: 'var(--eeds-navy-700)',
                borderRadius: 8,
                fontFamily: 'var(--eeds-font-body)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 15, display: 'inline-flex' }}>
                <Icon name="Quote" />
              </span>{' '}
              Solicitar proposta indicativa
            </button>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                height: 38,
                padding: '0 14px',
                borderRadius: 8,
                background: 'var(--eeds-ink-100)',
                color: 'var(--eeds-ink-500)',
                fontSize: 12,
              }}
            >
              <span style={{ fontSize: 14, display: 'inline-flex' }}>
                <Icon name="Lock" />
              </span>{' '}
              Disponível a partir do nível Ouro
            </span>
          )}
        </div>
        {propostas.map((p) => (
          <div
            key={p.empresa}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 12,
              border: '1px solid var(--eeds-ink-100)',
              borderRadius: 10,
              marginBottom: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'var(--eeds-orange-50)',
                  color: 'var(--eeds-orange-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                }}
              >
                <Icon name="FileText" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-800)', margin: 0 }}>{p.empresa}</p>
                <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>
                  {p.sub} · {mw(p.mw)} · {p.prazo}m
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--eeds-ink-500)', margin: 0 }}>
                  Preço base
                </p>
                <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: '2px 0 0' }}>
                  {p.preco ? `R$ ${num(p.preco, 2)} /MWh` : '—'}
                </p>
              </div>
              <StatusBadge variant={p.statusVariant}>{p.status}</StatusBadge>
            </div>
          </div>
        ))}
      </Card>

      {/* contratos fechados */}
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 20px 16px' }}>
          <h3 style={cardHeading}>Contratos fechados</h3>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: GRID,
            gap: 12,
            padding: '12px 20px',
            background: 'var(--eeds-ink-50)',
            borderTop: '1px solid var(--eeds-ink-200)',
            borderBottom: '1px solid var(--eeds-ink-200)',
          }}
        >
          <span style={th}>Cliente</span>
          <span style={th}>Boleta</span>
          <span style={{ ...th, textAlign: 'right' }}>Demanda</span>
          <span style={th}>Prazo</span>
          <span style={{ ...th, textAlign: 'right' }}>Valor contrato</span>
          <span style={{ ...th, textAlign: 'right' }}>Comissão upfront</span>
          <span style={th}>Status</span>
        </div>
        {deals.map((d) => (
          <div
            key={d.boleta}
            style={{
              display: 'grid',
              gridTemplateColumns: GRID,
              gap: 12,
              alignItems: 'center',
              padding: '14px 20px',
              borderBottom: '1px solid var(--eeds-ink-100)',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-800)' }}>{d.empresa}</span>
            <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 12, color: 'var(--eeds-ink-600)' }}>{d.boleta}</span>
            <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, color: 'var(--eeds-ink-800)', textAlign: 'right' }}>
              {mw(d.mw)}
            </span>
            <span style={{ fontSize: 13, color: 'var(--eeds-ink-600)' }}>{d.prazo} meses</span>
            <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, color: 'var(--eeds-ink-800)', textAlign: 'right' }}>
              {fmt(d.valor * 1e6)}
            </span>
            <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--eeds-success-fg)', textAlign: 'right' }}>
              {fmt(d.upfront)}
            </span>
            <span>
              <StatusBadge variant={d.statusVariant}>{d.status}</StatusBadge>
            </span>
          </div>
        ))}
      </Card>
    </Screen>
  )
}
