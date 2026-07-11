import { useState } from 'react'
import { Screen } from '@/components/ui/Screen'
import { Icon } from '@/components/ui/Icon'
import { VideoModal } from '@/components/overlays/VideoModal'
import { useResource } from '@/hooks/useResource'
import { useSettings } from '@/context/SettingsContext'
import { trainingsService } from '@/services'
import type { Course } from '@/types'

function statusText(prog: number): { txt: string; color: string } {
  if (prog === 100) return { txt: 'Concluído', color: 'var(--eeds-success-fg)' }
  if (prog > 0) return { txt: 'Em andamento', color: 'var(--eeds-orange-500)' }
  return { txt: 'Não iniciado', color: 'var(--eeds-ink-500)' }
}

export function Trainings() {
  const { tier } = useSettings()
  const courses = useResource(trainingsService.courses)
  const [video, setVideo] = useState<Course | null>(null)

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
          Treinamentos
        </h2>
        <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
          Vídeo-aulas para dominar o mercado livre e vender mais com a Echo.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {courses.map((c) => {
          const locked = !!c.requiresPrecoBase && !tier.precoBase
          const st = statusText(c.prog)
          return (
            <div
              key={c.titulo}
              onClick={() => {
                if (!locked) setVideo(c)
              }}
              style={{
                background: '#fff',
                border: '1px solid var(--eeds-ink-200)',
                borderRadius: 12,
                boxShadow: 'var(--eeds-shadow-card)',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: 140,
                  background: 'linear-gradient(135deg, var(--eeds-navy-600), var(--eeds-navy-800))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {locked ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(14,17,25,.55)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 28,
                    }}
                  >
                    <Icon name="Lock" />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,.16)',
                      backdropFilter: 'blur(2px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 24,
                    }}
                  >
                    <Icon name="Play" />
                  </div>
                )}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    fontFamily: 'var(--eeds-font-mono)',
                    fontSize: 11,
                    color: '#fff',
                    background: 'rgba(14,17,25,.6)',
                    padding: '2px 8px',
                    borderRadius: 6,
                  }}
                >
                  {c.dur}
                </span>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--eeds-ink-500)', fontWeight: 500 }}>
                    {c.modulo}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--eeds-ink-500)' }}>{c.nivel}</span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--eeds-font-display)',
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--eeds-ink-800)',
                    margin: '0 0 14px',
                    lineHeight: 1.35,
                  }}
                >
                  {c.titulo}
                </h3>
                <div style={{ height: 6, background: 'var(--eeds-ink-100)', borderRadius: 9999, overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ height: '100%', width: `${c.prog}%`, background: 'var(--eeds-orange-400)', borderRadius: 9999 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: st.color }}>{st.txt}</span>
                  <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 11, color: 'var(--eeds-ink-500)' }}>{c.prog}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <VideoModal course={video} onClose={() => setVideo(null)} />
    </Screen>
  )
}
