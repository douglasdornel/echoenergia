import { useState } from 'react'
import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useSettings } from '@/context/SettingsContext'
import { computeQuote } from '@/lib/tiers'
import { fmt, num } from '@/lib/format'

type Mode = 'guiado' | 'avancado'

const eyebrow = {
  fontSize: 10,
  textTransform: 'uppercase' as const,
  letterSpacing: '.06em',
  color: 'var(--eeds-ink-500)',
  fontWeight: 500 as const,
  margin: '0 0 4px',
}

function Slider({
  label,
  display,
  raw,
  suffix,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  display: string
  raw: number
  suffix?: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--eeds-ink-700)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--eeds-ink-900)' }}>
          {display}
          {suffix ? ` ${suffix}` : ''}
        </span>
      </div>
      <input
        type="range"
        className="ee-range"
        min={min}
        max={max}
        step={step}
        value={raw}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  )
}

export function Quote() {
  const { tier, tierName } = useSettings()
  const [mode, setMode] = useState<Mode>('guiado')
  const [volume, setVolume] = useState(2.5)
  const [prazo, setPrazo] = useState(36)
  const [preco, setPreco] = useState(285)

  const q = computeQuote(tier, { volume, prazo, preco })
  const upBarPct = q.total > 0 ? Math.round((q.upfront / q.total) * 100) : 0

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
          Gerador de cotação
        </h2>
        <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
          Simule o contrato do cliente e visualize sua comissão em tempo real.
        </p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <SegmentedControl
          value={mode}
          onChange={setMode}
          segments={[
            { value: 'guiado', label: 'Modo guiado' },
            { value: 'avancado', label: 'Modo avançado' },
          ]}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* inputs */}
        <Card padding={24}>
          <p style={eyebrow}>Parâmetros do contrato</p>
          <h3
            style={{
              fontFamily: 'var(--eeds-font-display)',
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--eeds-ink-800)',
              margin: '0 0 20px',
            }}
          >
            Frigorífico Vale Verde
          </h3>

          <Slider label="Volume médio" display={num(volume, 1)} raw={volume} suffix="MW" min={0.5} max={8} step={0.1} onChange={setVolume} />
          <Slider label="Prazo do contrato" display={String(prazo)} raw={prazo} suffix="meses" min={12} max={60} step={12} onChange={setPrazo} />
          <div style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--eeds-ink-700)' }}>Preço da energia</span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--eeds-ink-900)' }}>
                R$ {num(preco)} /MWh
              </span>
            </div>
            <input
              type="range"
              className="ee-range"
              min={220}
              max={380}
              step={5}
              value={preco}
              onChange={(e) => setPreco(parseInt(e.target.value))}
            />
          </div>

          {mode === 'avancado' ? (
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--eeds-ink-200)' }}>
              <p
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                  color: 'var(--eeds-orange-600)',
                  fontWeight: 600,
                  margin: '0 0 14px',
                }}
              >
                Comissionamento — nível {tierName}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: 'var(--eeds-navy-50)', border: '1px solid var(--eeds-navy-100)', borderRadius: 10, padding: 14 }}>
                  <p style={{ fontSize: 11, color: 'var(--eeds-navy-700)', margin: '0 0 4px' }}>Upfront</p>
                  <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 18, fontWeight: 600, color: 'var(--eeds-navy-700)', margin: 0 }}>
                    {num(q.upPct, 1)}%
                  </p>
                  <p style={{ fontSize: 10, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>sobre valor do contrato</p>
                </div>
                <div style={{ background: 'var(--eeds-orange-50)', border: '1px solid var(--eeds-orange-200)', borderRadius: 10, padding: 14 }}>
                  <p style={{ fontSize: 11, color: 'var(--eeds-orange-600)', margin: '0 0 4px' }}>Recorrência</p>
                  <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 18, fontWeight: 600, color: 'var(--eeds-orange-600)', margin: 0 }}>
                    R$ {num(q.recRS, 1)}
                  </p>
                  <p style={{ fontSize: 10, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>por MWh consumido</p>
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '14px 0 0', lineHeight: 1.5 }}>
                As taxas são definidas pelo seu nível de parceiro. Suba de nível para destravar comissões maiores.
              </p>
            </div>
          ) : null}
        </Card>

        {/* result */}
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--eeds-ink-200)',
            borderRadius: 12,
            boxShadow: 'var(--eeds-shadow-card)',
            overflow: 'hidden',
            position: 'sticky',
            top: 88,
          }}
        >
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--eeds-ink-100)' }}>
            <p style={{ ...eyebrow, margin: '0 0 8px' }}>Contrato simulado</p>
            <ResultLine label="Consumo estimado" value={`${num(q.mwhMes)} MWh/mês`} />
            <ResultLine label="Faturamento mensal" value={fmt(q.valorMes)} />
            <ResultLine label="Valor total do contrato" value={fmt(q.valorTotal)} bold last />
          </div>
          <div style={{ padding: 24, background: 'linear-gradient(135deg, var(--eeds-navy-700), var(--eeds-navy-800))', color: '#fff' }}>
            <p
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                color: 'rgba(255,255,255,.6)',
                fontWeight: 500,
                margin: '0 0 4px',
              }}
            >
              Sua comissão total estimada
            </p>
            <p style={{ fontFamily: 'var(--eeds-font-display)', fontSize: 36, fontWeight: 700, margin: '4px 0 18px', fontVariantNumeric: 'tabular-nums' }}>
              {fmt(q.total)}
            </p>
            <div style={{ height: 10, borderRadius: 9999, overflow: 'hidden', display: 'flex', marginBottom: 12 }}>
              <div style={{ width: `${upBarPct}%`, background: '#fff' }} />
              <div style={{ width: `${100 - upBarPct}%`, background: 'var(--eeds-orange-400)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', margin: 0 }}>Upfront (no fechamento)</p>
                <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 16, fontWeight: 600, margin: '4px 0 0' }}>{fmt(q.upfront)}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', margin: 0 }}>Recorrência ({prazo}m)</p>
                <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 16, fontWeight: 600, margin: '4px 0 0' }}>{fmt(q.recorrTotal)}</p>
              </div>
            </div>
          </div>
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ fontSize: 13, color: 'var(--eeds-ink-600)' }}>Recorrência mensal</span>
              <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--eeds-orange-600)' }}>
                {fmt(q.recorrMes)}/mês
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
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
                  boxShadow: 'var(--eeds-shadow-sm)',
                }}
              >
                <span style={{ fontSize: 16, display: 'inline-flex' }}>
                  <Icon name="Send" />
                </span>{' '}
                Enviar para cliente
              </button>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  height: 44,
                  padding: '0 16px',
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
                <span style={{ fontSize: 16, display: 'inline-flex' }}>
                  <Icon name="Download" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

function ResultLine({ label, value, bold, last }: { label: string; value: string; bold?: boolean; last?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: last ? 0 : 6 }}>
      <span style={{ fontSize: 13, color: 'var(--eeds-ink-600)' }}>{label}</span>
      <span
        style={{
          fontFamily: 'var(--eeds-font-mono)',
          fontSize: 13,
          fontWeight: bold ? 600 : 400,
          color: 'var(--eeds-ink-800)',
        }}
      >
        {value}
      </span>
    </div>
  )
}
