import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { TweaksPanel } from './TweaksPanel'

/** Authenticated app layout: sidebar + sticky top bar + scrollable content. */
export function AppShell() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--eeds-ink-50)',
        fontFamily: 'var(--eeds-font-body)',
      }}
    >
      <Sidebar />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <div className="ee-scroll" style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
      <TweaksPanel />
    </div>
  )
}
