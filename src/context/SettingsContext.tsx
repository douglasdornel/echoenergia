import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { DashboardVariant, Tier, TierName } from '@/types'
import { getTier } from '@/lib/tiers'

/**
 * Portal-level settings that were "props" (tweaks) in the design:
 * the active partner tier — which drives commission rates, feature
 * gates and locks — and the dashboard layout variant.
 */
interface SettingsValue {
  tierName: TierName
  tier: Tier
  dashboardVariant: DashboardVariant
  setTierName: (t: TierName) => void
  setDashboardVariant: (v: DashboardVariant) => void
}

const SettingsContext = createContext<SettingsValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tierName, setTierName] = useState<TierName>('Ouro')
  const [dashboardVariant, setDashboardVariant] = useState<DashboardVariant>('Resumo executivo')

  const value = useMemo<SettingsValue>(
    () => ({ tierName, tier: getTier(tierName), dashboardVariant, setTierName, setDashboardVariant }),
    [tierName, dashboardVariant],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider')
  return ctx
}
