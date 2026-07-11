/** Sidebar navigation model — single source for routes, labels, icons. */

export interface NavItem {
  id: string
  label: string
  icon: string
  path: string
  badge?: string
}

export interface NavSeparator {
  sep: true
  label: string
}

export type NavEntry = NavItem | NavSeparator

export function isSeparator(e: NavEntry): e is NavSeparator {
  return (e as NavSeparator).sep === true
}

export const NAV: NavEntry[] = [
  { id: 'dashboard', label: 'Visão geral', icon: 'LayoutDashboard', path: '/' },
  { id: 'leads', label: 'Leads', icon: 'Users', path: '/leads', badge: '3' },
  { id: 'oportunidades', label: 'Oportunidades', icon: 'Workflow', path: '/oportunidades' },
  { id: 'cotacao', label: 'Cotações', icon: 'Calculator', path: '/cotacao' },
  { id: 'negociacoes', label: 'Negociações', icon: 'Handshake', path: '/negociacoes' },
  { id: 'pagamentos', label: 'Pagamentos', icon: 'Wallet', path: '/pagamentos' },
  { id: 'treinamentos', label: 'Treinamentos', icon: 'GraduationCap', path: '/treinamentos' },
  { id: 'nivel', label: 'Nível de parceiro', icon: 'Award', path: '/nivel' },
  { sep: true, label: 'Conta & suporte' },
  { id: 'atendimento', label: 'Atendimento', icon: 'Headphones', path: '/atendimento', badge: '1' },
  { id: 'notificacoes', label: 'Notificações', icon: 'Bell', path: '/notificacoes' },
  { id: 'conta', label: 'Conta', icon: 'Building2', path: '/conta' },
]

/** Title shown in the top bar for a given pathname. */
export function titleForPath(pathname: string): string {
  const item = NAV.find(
    (e): e is NavItem => !isSeparator(e) && (e.path === pathname || (e.path !== '/' && pathname.startsWith(e.path))),
  )
  return item?.label ?? 'Portal de parceiros'
}
