import { Icon } from '@/components/ui/Icon'
import type { Course } from '@/types'

export function VideoModal({ course, onClose }: { course: Course | null; onClose: () => void }) {
  if (!course) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 70,
        background: 'rgba(14,17,25,.6)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 760,
          maxWidth: '94vw',
          background: '#fff',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: 'var(--eeds-shadow-modal)',
        }}
      >
        <div
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            background: 'linear-gradient(135deg, var(--eeds-navy-700), var(--eeds-navy-900))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--eeds-orange-400)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              cursor: 'pointer',
              boxShadow: 'var(--eeds-shadow-pop)',
            }}
          >
            <Icon name="Play" />
          </div>
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <button
              onClick={onClose}
              aria-label="Fechar"
              style={{
                border: 0,
                background: 'rgba(255,255,255,.15)',
                color: '#fff',
                width: 34,
                height: 34,
                borderRadius: 8,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              <Icon name="X" />
            </button>
          </div>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--eeds-ink-500)', fontWeight: 500, margin: 0 }}>
            {course.modulo} · {course.dur}
          </p>
          <h3 style={{ fontFamily: 'var(--eeds-font-display)', fontSize: 18, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: '6px 0 0' }}>
            {course.titulo}
          </h3>
        </div>
      </div>
    </div>
  )
}
