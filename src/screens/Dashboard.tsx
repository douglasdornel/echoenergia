import { useNavigate } from 'react-router-dom'
import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useResource } from '@/hooks/useResource'
import { useSettings } from '@/context/SettingsContext'
import { dashboardService } from '@/services'
import { fmt } from '@/lib/format'
import { CURRENT_USER, KPI_VALUES } from '@/data/mock'
import type { Kpi, Repasse } from '@/types'

const ACCENT: Record<Kpi['accent'], { bg: string; fg: string }> = {
  navy: { bg: 'var(--eeds-navy-50)', fg: 'var(--eeds-navy-600)' },
  orange: { bg: 'var(--eeds-orange-50)', fg: 'var(--eeds-orange-500)' },
  info: { bg: 'var(--eeds-info-bg)', fg: 'var(--eeds-info-fg)' },
  success: { bg: 'var(--eeds-success-bg)', fg: 'var(--eeds-success-fg)' },
}

const MAX_BAR = 60
const cardHeading = {
  fontFamily: 'var(--eeds-font-display)',
  fontSize: 16,
  fontWeight: 600,
  color: 'var(--eeds-ink-800)',
  margin: 0,
}

export function Dashboard() {
  const navigate = useNavigate()
  const { dashboardVariant } = useSettings()
  const data = useResource(dashboardService.overview)

  const kpiValues = data.kpis.map((k, i) => {
    if (i === 0) return { ...k, value: fmt(KPI_VALUES.comissaoMes) }
    if (i === 1) return { ...k, value: fmt(KPI_VALUES.recorrenciaAtiva) }
    return k
  })

  return (
    <Screen>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 24,
        }}
      >
        <div>
          <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: 0 }}>Olá, {CURRENT_USER.nome.split(' ')[0]}.</p>
          <h2
            style={{
              fontFamily: 'var(--eeds-font-display)',
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--eeds-ink-800)',
              margin: '4px 0 0',
              letterSpacing: '-.02em',
            }}
          >
            Visão geral da operação
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" icon="UserPlus" onClick={() => navigate('/leads')}>
            Registrar lead
          </Button>
          <Button icon="Calculator" onClick={() => navigate('/cotacao')}>
            Nova cotação
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        {kpiValues.map((k) => {
          const accent = ACCENT[k.accent]
          const up = k.trend === 'up'
          return (
            <Card key={k.label}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    background: accent.bg,
                    color: accent.fg,
                  }}
                >
                  <Icon name={k.icon} />
                </div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 9999,
                    background: up ? 'var(--eeds-success-bg)' : 'var(--eeds-danger-bg)',
                    color: up ? 'var(--eeds-success-fg)' : 'var(--eeds-danger-fg)',
                  }}
                >
                  <span style={{ fontSize: 11, display: 'inline-flex' }}>
                    <Icon name={up ? 'TrendingUp' : 'TrendingDown'} />
                  </span>
                  {k.change}
                </span>
              </div>
              <p
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                  color: 'var(--eeds-ink-500)',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {k.label}
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
                {k.value}
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-500)', marginLeft: 4 }}>
                  {k.unit}
                </span>
              </p>
            </Card>
          )
        })}
      </div>

      {dashboardVariant === 'Resumo executivo' ? <VariantA data={data} /> : <VariantB data={data} />}
    </Screen>
  )
}

function RepasseRow({ r }: { r: Repasse }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        borderTop: '1px solid var(--eeds-ink-100)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: r.upfront ? 'var(--eeds-navy-50)' : 'var(--eeds-orange-50)',
            color: r.upfront ? 'var(--eeds-navy-600)' : 'var(--eeds-orange-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          <Icon name={r.upfront ? 'HandCoins' : 'Repeat'} />
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-800)', margin: 0 }}>{r.empresa}</p>
          <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>
            {r.tipo} · {r.quando}
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p
          style={{
            fontFamily: 'var(--eeds-font-mono)',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--eeds-ink-800)',
            margin: 0,
          }}
        >
          {fmt(r.valor)}
        </p>
        <div style={{ marginTop: 4 }}>
          <StatusBadge variant={r.statusVariant}>{r.status}</StatusBadge>
        </div>
      </div>
    </div>
  )
}

function VariantA({ data }: { data: ReturnType<typeof dashboardService.overview.peek> }) {
  const navigate = useNavigate()
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
            <div>
              <h3 style={cardHeading}>Comissão recebida</h3>
              <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>
                Upfront + recorrência · últimos 8 meses
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <LegendDot color="var(--eeds-navy-600)" label="Upfront" />
              <LegendDot color="var(--eeds-orange-400)" label="Recorrência" />
            </div>
          </div>
          <div style={{ height: 220, display: 'flex', alignItems: 'flex-end', gap: 14, paddingTop: 24 }}>
            {data.chart.map((b) => (
              <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: 170 }}>
                  <div
                    style={{
                      width: '100%',
                      background: 'var(--eeds-orange-400)',
                      borderRadius: '4px 4px 0 0',
                      height: (b.rec / MAX_BAR) * 170,
                    }}
                  />
                  <div style={{ width: '100%', background: 'var(--eeds-navy-600)', height: (b.up / MAX_BAR) * 170 }} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--eeds-ink-500)' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 style={{ ...cardHeading, marginBottom: 4 }}>Funil de oportunidades</h3>
          <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '0 0 16px' }}>Pipeline ativo</p>
          {data.funil.map((f) => (
            <div key={f.stage} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: 'var(--eeds-ink-700)', fontWeight: 500 }}>{f.stage}</span>
                <span
                  style={{
                    fontFamily: 'var(--eeds-font-mono)',
                    fontSize: 12,
                    color: 'var(--eeds-ink-800)',
                    fontWeight: 600,
                  }}
                >
                  {f.qtd}
                </span>
              </div>
              <div style={{ height: 8, background: 'var(--eeds-ink-100)', borderRadius: 9999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: f.w, background: f.cor, borderRadius: 9999 }} />
              </div>
              <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
                {fmt(f.valor)}
              </p>
            </div>
          ))}
        </Card>
      </div>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 16px' }}>
          <h3 style={cardHeading}>Próximos repasses de comissão</h3>
          <button
            onClick={() => navigate('/pagamentos')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              border: 0,
              background: 'transparent',
              color: 'var(--eeds-navy-600)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Ver todos{' '}
            <span style={{ fontSize: 14, display: 'inline-flex' }}>
              <Icon name="ArrowRight" />
            </span>
          </button>
        </div>
        {data.proxRepasses.map((r, i) => (
          <RepasseRow key={i} r={r} />
        ))}
      </Card>
    </>
  )
}

function VariantB({ data }: { data: ReturnType<typeof dashboardService.overview.peek> }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div
          style={{
            background: 'linear-gradient(135deg, var(--eeds-navy-700), var(--eeds-navy-800))',
            borderRadius: 12,
            padding: 24,
            color: '#fff',
            boxShadow: 'var(--eeds-shadow-card)',
          }}
        >
          <p
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '.06em',
              color: 'rgba(255,255,255,.6)',
              fontWeight: 500,
              margin: 0,
            }}
          >
            Comissão acumulada · 2026
          </p>
          <p
            style={{
              fontFamily: 'var(--eeds-font-display)',
              fontSize: 36,
              fontWeight: 700,
              margin: '8px 0 16px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {fmt(data.acumAno)}
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', margin: 0 }}>Upfront</p>
              <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 18, fontWeight: 600, margin: '4px 0 0' }}>
                {fmt(data.acumUpfront)}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', margin: 0 }}>Recorrência</p>
              <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 18, fontWeight: 600, margin: '4px 0 0' }}>
                {fmt(data.acumRecorr)}
              </p>
            </div>
          </div>
        </div>
        <Card padding={24}>
          <h3 style={{ ...cardHeading, marginBottom: 4 }}>Receita recorrente projetada</h3>
          <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '0 0 16px' }}>Carteira ativa · base mensal</p>
          <p
            style={{
              fontFamily: 'var(--eeds-font-display)',
              fontSize: 30,
              fontWeight: 700,
              color: 'var(--eeds-ink-800)',
              margin: 0,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {fmt(data.mrr)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-500)' }}> /mês</span>
          </p>
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: '1px solid var(--eeds-ink-100)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {data.carteira.map((c) => (
              <div key={c.empresa} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'var(--eeds-ink-700)' }}>{c.empresa}</span>
                <span
                  style={{
                    fontFamily: 'var(--eeds-font-mono)',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--eeds-ink-800)',
                  }}
                >
                  {fmt(c.valor)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ padding: '20px 20px 16px' }}>
          <h3 style={cardHeading}>Próximos repasses de comissão</h3>
        </div>
        {data.proxRepasses.map((r, i) => (
          <RepasseRow key={i} r={r} />
        ))}
      </Card>
    </>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--eeds-ink-600)' }}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
      {label}
    </span>
  )
}
