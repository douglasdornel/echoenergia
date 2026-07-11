import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { useAuth } from '@/context/AuthContext'

const otpBox = (focused: boolean) => ({
  width: '100%',
  height: 52,
  textAlign: 'center' as const,
  border: `1px solid ${focused ? 'var(--eeds-navy-600)' : 'var(--eeds-ink-200)'}`,
  borderRadius: 8,
  fontFamily: 'var(--eeds-font-mono)',
  fontSize: 20,
  fontWeight: 600,
  color: 'var(--eeds-ink-800)',
  outline: 'none',
  boxShadow: focused ? '0 0 0 2px rgba(30,44,122,.1)' : undefined,
})

export function Login() {
  const { loginStep, requestOtp, backToEmail, login } = useAuth()
  const [otp, setOtp] = useState(['3', '9', '1', '4', '', ''])

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        overflow: 'hidden',
        background: 'var(--eeds-navy-700)',
        fontFamily: 'var(--eeds-font-body)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, var(--eeds-navy-700), var(--eeds-navy-600), var(--eeds-navy-800))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          filter: 'blur(80px)',
          top: -120,
          right: -120,
          background: 'rgba(249,115,22,.2)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          filter: 'blur(80px)',
          bottom: -120,
          left: -120,
          background: 'rgba(77,95,174,.3)',
        }}
      />

      <div
        className="ee-fade"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 440,
          background: '#fff',
          borderRadius: 24,
          padding: 40,
          boxShadow: 'var(--eeds-shadow-pop)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <img src="/assets/echoenergia-logo.png" alt="Echo Energia" style={{ height: 34 }} />
        </div>
        <p
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '.06em',
            color: 'var(--eeds-orange-500)',
            fontWeight: 600,
            textAlign: 'center',
            margin: '0 0 6px',
          }}
        >
          Portal de parceiros
        </p>
        <h1
          style={{
            fontFamily: 'var(--eeds-font-display)',
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--eeds-navy-700)',
            textAlign: 'center',
            margin: 0,
            letterSpacing: '-.02em',
          }}
        >
          Bem-vindo de volta
        </h1>
        <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', textAlign: 'center', margin: '6px 0 28px' }}>
          Acesse sua área de parceiro comercial.
        </p>

        {loginStep === 'email' ? (
          <div>
            <p
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                color: 'var(--eeds-ink-600)',
                fontWeight: 500,
                margin: '0 0 6px',
              }}
            >
              E-mail corporativo
            </p>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <span
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--eeds-ink-400)',
                  fontSize: 16,
                  display: 'inline-flex',
                }}
              >
                <Icon name="Mail" />
              </span>
              <input
                type="email"
                defaultValue="parceiro@solarengconsultoria.com.br"
                className="ee-input"
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 14px 0 38px',
                  border: '1px solid var(--eeds-ink-200)',
                  borderRadius: 8,
                  fontFamily: 'var(--eeds-font-body)',
                  fontSize: 14,
                  color: 'var(--eeds-ink-800)',
                  outline: 'none',
                  background: '#fff',
                }}
              />
            </div>
            <button
              onClick={requestOtp}
              style={{
                width: '100%',
                height: 48,
                border: 0,
                borderRadius: 12,
                background: 'var(--eeds-orange-400)',
                color: '#fff',
                fontFamily: 'var(--eeds-font-body)',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: 'var(--eeds-shadow-sm)',
              }}
            >
              Receber código{' '}
              <span style={{ fontSize: 18, display: 'inline-flex' }}>
                <Icon name="ArrowRight" />
              </span>
            </button>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--eeds-info-bg)',
                border: '1px solid var(--eeds-info-border)',
                color: 'var(--eeds-info-fg)',
                borderRadius: 8,
                padding: '10px 12px',
                fontSize: 12,
                marginBottom: 18,
              }}
            >
              <span style={{ fontSize: 16, display: 'inline-flex' }}>
                <Icon name="Mail" />
              </span>{' '}
              Código enviado para seu e-mail
            </div>
            <p
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                color: 'var(--eeds-ink-600)',
                fontWeight: 500,
                margin: '0 0 8px',
              }}
            >
              Código de verificação
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              {otp.map((v, i) => (
                <input
                  key={i}
                  value={v}
                  maxLength={1}
                  onChange={(e) => {
                    const next = [...otp]
                    next[i] = e.target.value.slice(-1)
                    setOtp(next)
                  }}
                  style={otpBox(i === 0)}
                />
              ))}
            </div>
            <button
              onClick={login}
              style={{
                width: '100%',
                height: 48,
                border: 0,
                borderRadius: 12,
                background: 'var(--eeds-orange-400)',
                color: '#fff',
                fontFamily: 'var(--eeds-font-body)',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: 'var(--eeds-shadow-sm)',
              }}
            >
              Verificar código
            </button>
            <button
              onClick={backToEmail}
              style={{
                width: '100%',
                height: 40,
                marginTop: 8,
                border: 0,
                background: 'transparent',
                color: 'var(--eeds-ink-500)',
                fontFamily: 'var(--eeds-font-body)',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Usar outro e-mail
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: '1px solid var(--eeds-ink-100)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 11, color: 'var(--eeds-ink-500)', margin: 0 }}>
            Echo Energia · Soluções energéticas para todos
          </p>
          <p style={{ fontSize: 10, color: 'var(--eeds-ink-400)', margin: '2px 0 0' }}>
            Uma empresa do Grupo Equatorial
          </p>
        </div>
      </div>
    </div>
  )
}
