import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { useSettings } from '@/context/SettingsContext'
import { TIERS, TIER_ICON, TIER_ORDER, tierProgressPct } from '@/lib/tiers'
import { num } from '@/lib/format'
import type { Benefit } from '@/types'

function buildBenefits(tierName: string): Benefit[] {
  const t = TIERS[tierName as keyof typeof TIERS]
  const ranking = TIER_ORDER.indexOf(tierName as (typeof TIER_ORDER)[number])
  const raw: Omit<Benefit, 'unlocked'>[] = [
    { nome: 'Comissão upfront', valor: `${num(t.upfront, 1)}% sobre contrato`, icon: 'HandCoins' },
    { nome: 'Recorrência mensal', valor: `R$ ${num(t.recorr, 1)} por MWh consumido`, icon: 'Repeat' },
    { nome: 'Solicitar preço base', valor: t.precoBase ? 'Liberado' : 'Bloqueado — disponível no Ouro', icon: t.precoBase ? 'CircleCheck' : 'Lock' },
    { nome: 'Relatórios consolidados', valor: ranking >= 1 ? 'Liberado' : 'Bloqueado — disponível na Prata', icon: ranking >= 1 ? 'CircleCheck' : 'Lock' },
    { nome: 'Gerente de contas dedicado', valor: ranking >= 2 ? 'Liberado' : 'Bloqueado — disponível no Ouro', icon: ranking >= 2 ? 'CircleCheck' : 'Lock' },
  ]
  return raw.map((b) => ({ ...b, unlocked: !/Bloqueado/.test(b.valor) }))
}

export function Tier() {
  const { tierName, tier } = useSettings()
  const pct = tierProgressPct(tier)
  const proxNivel = tier.prox ?? 'Topo'
  const ranking = TIER_ORDER.indexOf(tierName)
  const benefits = buildBenefits(tierName)

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
          Nível de parceiro
        </h2>
        <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
          Quanto mais volume você fecha, maiores as suas comissões e benefícios.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginBottom: 20 }}>
        <div
          style={{
            background: 'linear-gradient(135deg, var(--eeds-navy-700), var(--eeds-navy-900))',
            borderRadius: 16,
            padding: 28,
            color: '#fff',
            boxShadow: 'var(--eeds-shadow-card)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(249,115,22,.2)',
                color: 'var(--eeds-orange-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
              }}
            >
              <Icon name={TIER_ICON[tierName]} />
            </div>
            <div>
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: 'rgba(255,255,255,.6)', margin: 0 }}>
                Seu nível atual
              </p>
              <p style={{ fontFamily: 'var(--eeds-font-display)', fontSize: 24, fontWeight: 700, margin: '2px 0 0' }}>
                Parceiro {tierName}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>Progresso para {proxNivel}</span>
            <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--eeds-orange-300)' }}>{pct}%</span>
          </div>
          <div style={{ height: 10, background: 'rgba(255,255,255,.15)', borderRadius: 9999, overflow: 'hidden', marginBottom: 8 }}>
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                background: 'linear-gradient(90deg, var(--eeds-orange-400), var(--eeds-orange-300))',
                borderRadius: 9999,
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', margin: 0 }}>
            Faltam 12 MW fechados nos próximos 12 meses para alcançar o próximo nível.
          </p>
        </div>

        <Card padding={24} radius={16}>
          <h3 style={{ fontFamily: 'var(--eeds-font-display)', fontSize: 16, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: '0 0 16px' }}>
            Seus benefícios atuais
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {benefits.map((b) => (
              <div key={b.nome} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    flexShrink: 0,
                    background: b.unlocked ? 'var(--eeds-success-bg)' : 'var(--eeds-ink-100)',
                    color: b.unlocked ? 'var(--eeds-success-fg)' : 'var(--eeds-ink-400)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                  }}
                >
                  <Icon name={b.icon} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--eeds-ink-800)', margin: 0 }}>{b.nome}</p>
                  <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '1px 0 0' }}>{b.valor}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {TIER_ORDER.map((tn, i) => {
          const td = TIERS[tn]
          const current = i === ranking
          return (
            <div
              key={tn}
              style={{
                borderRadius: 14,
                padding: 20,
                border: `1px solid ${current ? 'var(--eeds-navy-700)' : 'var(--eeds-ink-200)'}`,
                background: current ? 'var(--eeds-navy-700)' : '#fff',
                color: current ? '#fff' : 'var(--eeds-ink-800)',
                boxShadow: 'var(--eeds-shadow-card)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ fontSize: 24, display: 'inline-flex', color: td.cor }}>
                  <Icon name={TIER_ICON[tn]} />
                </div>
                {current ? (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '.06em',
                      background: 'var(--eeds-orange-400)',
                      color: '#fff',
                      padding: '3px 8px',
                      borderRadius: 9999,
                    }}
                  >
                    Atual
                  </span>
                ) : null}
              </div>
              <p style={{ fontFamily: 'var(--eeds-font-display)', fontSize: 18, fontWeight: 700, margin: '0 0 2px' }}>{tn}</p>
              <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, opacity: 0.7, margin: '0 0 16px' }}>
                {td.proxMW ? `${td.atualMW}–${td.proxMW} MW` : '40+ MW'} fechados
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', opacity: 0.6, margin: 0 }}>Upfront</p>
                  <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 15, fontWeight: 600, margin: '2px 0 0' }}>{num(td.upfront, 1)}%</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', opacity: 0.6, margin: 0 }}>Recorrência</p>
                  <p style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 15, fontWeight: 600, margin: '2px 0 0' }}>R$ {num(td.recorr, 1)}/MWh</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Screen>
  )
}
