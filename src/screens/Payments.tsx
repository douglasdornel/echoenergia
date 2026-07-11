import { useState } from 'react'
import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useResource } from '@/hooks/useResource'
import { paymentsService } from '@/services'
import { fmt, num } from '@/lib/format'

type Tab = 'upfront' | 'recorrencia'

const th = {
  fontSize: 10,
  textTransform: 'uppercase' as const,
  letterSpacing: '.06em',
  color: 'var(--eeds-ink-500)',
  fontWeight: 500 as const,
}

const UP_GRID = '2fr 1.2fr 1.2fr 1fr 1fr'
const REC_GRID = '1.8fr 0.9fr 1fr 0.9fr 1fr 1fr'

function SummaryCard({ icon, iconBg, iconFg, label, value }: { icon: string; iconBg: string; iconFg: string; label: string; value: string }) {
  return (
    <Card>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: iconBg,
          color: iconFg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          marginBottom: 12,
        }}
      >
        <Icon name={icon} />
      </div>
      <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--eeds-ink-500)', fontWeight: 500, margin: 0 }}>
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--eeds-font-display)',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--eeds-ink-800)',
          margin: '4px 0 0',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </p>
    </Card>
  )
}

export function Payments() {
  const [tab, setTab] = useState<Tab>('upfront')
  const upfront = useResource(paymentsService.upfront)
  const recurring = useResource(paymentsService.recurring)
  const summary = useResource(paymentsService.summary)

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
          Pagamentos de comissão
        </h2>
        <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
          Repasses upfront no fechamento e recorrência mensal conforme consumo de cada cliente.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20 }}>
        <SummaryCard icon="HandCoins" iconBg="var(--eeds-navy-50)" iconFg="var(--eeds-navy-600)" label="Upfront a receber" value={fmt(summary.upfrontPrev)} />
        <SummaryCard icon="Repeat" iconBg="var(--eeds-orange-50)" iconFg="var(--eeds-orange-500)" label="Recorrência do mês" value={fmt(summary.recorrMes)} />
        <SummaryCard icon="CircleDollarSign" iconBg="var(--eeds-success-bg)" iconFg="var(--eeds-success-fg)" label="Total recebido no ano" value={fmt(summary.totalAno)} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <SegmentedControl
          value={tab}
          onChange={setTab}
          segments={[
            { value: 'upfront', label: 'Upfront' },
            { value: 'recorrencia', label: 'Recorrência mensal' },
          ]}
        />
      </div>

      {tab === 'upfront' ? (
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: UP_GRID,
              gap: 12,
              padding: '12px 20px',
              background: 'var(--eeds-ink-50)',
              borderBottom: '1px solid var(--eeds-ink-200)',
            }}
          >
            <span style={th}>Cliente</span>
            <span style={th}>Boleta</span>
            <span style={{ ...th, textAlign: 'right' }}>Valor</span>
            <span style={th}>Data</span>
            <span style={th}>Status</span>
          </div>
          {upfront.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: UP_GRID,
                gap: 12,
                alignItems: 'center',
                padding: '14px 20px',
                borderBottom: '1px solid var(--eeds-ink-100)',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-800)' }}>{p.empresa}</span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 12, color: 'var(--eeds-ink-600)' }}>{p.boleta}</span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--eeds-ink-800)', textAlign: 'right' }}>
                {fmt(p.valor)}
              </span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 12, color: 'var(--eeds-ink-600)' }}>{p.data}</span>
              <span>
                <StatusBadge variant={p.statusVariant}>{p.status}</StatusBadge>
              </span>
            </div>
          ))}
        </Card>
      ) : (
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: REC_GRID,
              gap: 12,
              padding: '12px 20px',
              background: 'var(--eeds-ink-50)',
              borderBottom: '1px solid var(--eeds-ink-200)',
            }}
          >
            <span style={th}>Cliente</span>
            <span style={th}>Competência</span>
            <span style={{ ...th, textAlign: 'right' }}>Consumo</span>
            <span style={{ ...th, textAlign: 'right' }}>R$/MWh</span>
            <span style={{ ...th, textAlign: 'right' }}>Valor</span>
            <span style={th}>Status</span>
          </div>
          {recurring.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: REC_GRID,
                gap: 12,
                alignItems: 'center',
                padding: '14px 20px',
                borderBottom: '1px solid var(--eeds-ink-100)',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-800)' }}>{p.empresa}</span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 12, color: 'var(--eeds-ink-600)' }}>{p.comp}</span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, color: 'var(--eeds-ink-800)', textAlign: 'right' }}>
                {num(p.mwh)} MWh
              </span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, color: 'var(--eeds-ink-600)', textAlign: 'right' }}>
                R$ {num(p.rs, 2)}
              </span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--eeds-ink-800)', textAlign: 'right' }}>
                {fmt(p.valor)}
              </span>
              <span>
                <StatusBadge variant={p.statusVariant}>{p.status}</StatusBadge>
              </span>
            </div>
          ))}
        </Card>
      )}
    </Screen>
  )
}
