import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { CURRENT_USER } from '@/data/mock'

type LoginStep = 'email' | 'otp'

interface AuthValue {
  loggedIn: boolean
  loginStep: LoginStep
  user: typeof CURRENT_USER
  requestOtp: () => void
  backToEmail: () => void
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthValue | null>(null)

/**
 * Session key for the mock auth token. With a real backend this would
 * hold a JWT/refresh token; here it just lets a page refresh keep the
 * user signed in instead of bouncing back to login.
 */
const SESSION_KEY = 'eeds.partner.session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      return false
    }
  })
  const [loginStep, setLoginStep] = useState<LoginStep>('email')

  const requestOtp = useCallback(() => setLoginStep('otp'), [])
  const backToEmail = useCallback(() => setLoginStep('email'), [])
  const login = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* storage unavailable — fall back to in-memory session */
    }
    setLoggedIn(true)
  }, [])
  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      /* ignore */
    }
    setLoggedIn(false)
    setLoginStep('email')
  }, [])

  const value = useMemo<AuthValue>(
    () => ({ loggedIn, loginStep, user: CURRENT_USER, requestOtp, backToEmail, login, logout }),
    [loggedIn, loginStep, requestOtp, backToEmail, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
