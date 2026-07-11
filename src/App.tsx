import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AppShell } from '@/components/layout/AppShell'
import { Login } from '@/screens/Login'
import { Dashboard } from '@/screens/Dashboard'
import { Leads } from '@/screens/Leads'
import { Opportunities } from '@/screens/Opportunities'
import { Quote } from '@/screens/Quote'
import { Negotiations } from '@/screens/Negotiations'
import { Payments } from '@/screens/Payments'
import { Trainings } from '@/screens/Trainings'
import { Tier } from '@/screens/Tier'
import { Support } from '@/screens/Support'
import { Notifications } from '@/screens/Notifications'
import { Account } from '@/screens/Account'

export default function App() {
  const { loggedIn } = useAuth()

  if (!loggedIn) return <Login />

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="oportunidades" element={<Opportunities />} />
        <Route path="cotacao" element={<Quote />} />
        <Route path="negociacoes" element={<Negotiations />} />
        <Route path="pagamentos" element={<Payments />} />
        <Route path="treinamentos" element={<Trainings />} />
        <Route path="nivel" element={<Tier />} />
        <Route path="atendimento" element={<Support />} />
        <Route path="notificacoes" element={<Notifications />} />
        <Route path="conta" element={<Account />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
