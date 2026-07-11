/* Domain services — mock-backed, async-ready resources.
   Components consume these via the useResource hook. */

import { resource } from './client'
import * as mock from '@/data/mock'
import type { DashboardData } from '@/types'

/* -------------------- Dashboard -------------------- */

export const dashboardService = {
  overview: resource<DashboardData>(() => ({
    kpis: mock.KPIS,
    chart: mock.CHART,
    funil: mock.FUNIL,
    proxRepasses: mock.PROX_REPASSES,
    carteira: mock.CARTEIRA,
    acumAno: mock.DASHBOARD_ACCUM.acumAno,
    acumUpfront: mock.DASHBOARD_ACCUM.acumUpfront,
    acumRecorr: mock.DASHBOARD_ACCUM.acumRecorr,
    mrr: mock.DASHBOARD_ACCUM.mrr,
  })),
  kpiValues: resource(() => mock.KPI_VALUES),
}

/* -------------------- Leads -------------------- */

export const leadsService = {
  list: resource(() => mock.LEADS),
}

/* -------------------- Opportunities -------------------- */

export const opportunitiesService = {
  pipeline: resource(() => mock.PIPELINE),
}

/* -------------------- Negotiations -------------------- */

export const negotiationsService = {
  deals: resource(() => mock.DEALS),
  proposals: resource(() => mock.PROPOSTAS),
}

/* -------------------- Payments -------------------- */

export const paymentsService = {
  upfront: resource(() => mock.UPFRONT_PAYMENTS),
  recurring: resource(() => mock.RECURRING_PAYMENTS),
  summary: resource(() => mock.PAYMENTS_SUMMARY),
}

/* -------------------- Trainings -------------------- */

export const trainingsService = {
  courses: resource(() => mock.COURSES),
}

/* -------------------- Support -------------------- */

export const supportService = {
  messages: resource(() => mock.CHAT_MESSAGES),
  cases: resource(() => mock.SUPPORT_CASES),
}

/* -------------------- Notifications -------------------- */

export const notificationsService = {
  groups: resource(() => mock.NOTIFICATION_GROUPS),
}

/* -------------------- Account -------------------- */

export const accountService = {
  user: resource(() => mock.CURRENT_USER),
  partner: resource(() => mock.PARTNER),
  agents: resource(() => mock.SALES_AGENTS),
  notificationPrefs: resource(() => mock.NOTIFICATION_PREF_ROWS),
  accessProfiles: resource(() => mock.ACCESS_PROFILES),
  inviteNotifPrefs: resource(() => mock.INVITE_NOTIFICATION_PREFS),
}
