import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { useSettings } from '@/context/SettingsContext'
import { TIER_ORDER } from '@/lib/tiers'
import type { DashboardVariant, TierName } from '@/types'

const DASH_VARIANTS: DashboardVariant[] = ['Resumo executivo', 'Foco em comissões']

const eyebrow = {
  fontSize: 10,
  textTransform: 'uppercase' as const,
  letterSpacing: '.06em',
  color: 'var(--eeds-ink-500)',
  fontWeight: 600 as const,
  margin: '0 0 8px',
}

/**
 * Floating demo panel to switch the two design "tweaks": partner
 * tier (affects commissions, features and locks) and the dashboard
 * variant. Not part of the portal chrome — a showcase control.
 */
export function TweaksPanel() {
  const [open, setOpen] = useState(false)
  const { tierName, setTierName, dashboardVariant, setDashboardVariant } = useSettings()

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 80 }}>
      {open ? (
        <div
          style={{
            width: 260,
            background: '#fff',
            border: '1px solid var(--eeds-ink-200)',
            borderRadius: 14,
            boxShadow: 'var(--eeds-shadow-pop)',
            padding: 16,
            marginBottom: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: 0 }}>Tweaks da demo</p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              style={{
                border: 0,
                background: 'var(--eeds-ink-100)',
                width: 26,
                height: 26,
                borderRadius: 7,
                cursor: 'pointer',
                color: 'var(--eeds-ink-600)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
              }}
            >
              <Icon name="X" />
            </button>
          </div>

          <p style={eyebrow}>Nível do parceiro</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 16 }}>
            {TIER_ORDER.map((t) => (
              <SegButton key={t} active={t === tierName} onClick={() => setTierName(t as TierName)} label={t} />
            ))}
          </div>

          <p style={eyebrow}>Variante do dashboard</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {DASH_VARIANTS.map((v) => (
              <SegButton key={v} active={v === dashboardVariant} onClick={() => setDashboardVariant(v)} label={v} />
            ))}
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Abrir tweaks da demo"
        style={{
          width: 46,
          height: 46,
          borderRadius: 9999,
          border: 0,
          background: 'var(--eeds-navy-700)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          boxShadow: 'var(--eeds-shadow-pop)',
          marginLeft: 'auto',
        }}
      >
        <Icon name="SlidersHorizontal" />
      </button>
    </div>
  )
}

function SegButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 32,
        padding: '0 10px',
        border: `1px solid ${active ? 'var(--eeds-navy-600)' : 'var(--eeds-ink-200)'}`,
        borderRadius: 8,
        background: active ? 'var(--eeds-navy-50)' : '#fff',
        color: active ? 'var(--eeds-navy-700)' : 'var(--eeds-ink-600)',
        fontFamily: 'var(--eeds-font-body)',
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      {label}
    </button>
  )
}
