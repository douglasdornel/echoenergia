import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Field } from '@/components/ui/Field'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Toggle } from '@/components/ui/Toggle'
import { InviteAgentModal } from '@/components/overlays/InviteAgentModal'
import { useResource } from '@/hooks/useResource'
import { accountService } from '@/services'
import { statusColors } from '@/lib/status'
import { initials } from '@/lib/format'
import {
  CURRENT_USER,
  DEFAULT_NOTIFICATION_PREFS,
  NOTIFICATION_PREF_ROWS,
  PARTNER,
} from '@/data/mock'

type Tab = 'usuario' | 'parceiro' | 'agentes' | 'notificacoes'
const TABS: { id: Tab; label: string }[] = [
  { id: 'usuario', label: 'Meus dados' },
  { id: 'parceiro', label: 'Cadastro do parceiro' },
  { id: 'agentes', label: 'Agentes de venda' },
  { id: 'notificacoes', label: 'Notificações' },
]

const cardHeading = {
  fontFamily: 'var(--eeds-font-display)',
  fontSize: 16,
  fontWeight: 600,
  color: 'var(--eeds-ink-800)',
  margin: 0,
}
const saveBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  height: 42,
  padding: '0 18px',
  border: 0,
  background: 'var(--eeds-orange-400)',
  color: '#fff',
  borderRadius: 10,
  fontFamily: 'var(--eeds-font-body)',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: 'var(--eeds-shadow-sm)',
} as const
const cancelBtn = {
  height: 42,
  padding: '0 18px',
  border: '1px solid var(--eeds-ink-300)',
  background: '#fff',
  color: 'var(--eeds-ink-700)',
  borderRadius: 10,
  fontFamily: 'var(--eeds-font-body)',
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
} as const

export function Account() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('tab')
  const tab: Tab = (['usuario', 'parceiro', 'agentes', 'notificacoes'] as Tab[]).includes(raw as Tab)
    ? (raw as Tab)
    : 'usuario'

  const setTab = (t: Tab) => setParams(t === 'usuario' ? {} : { tab: t }, { replace: true })

  return (
    <Screen maxWidth={1000}>
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
          Conta
        </h2>
        <p style={{ fontSize: 14, color: 'var(--eeds-ink-500)', margin: '4px 0 0' }}>
          Gerencie seus dados de usuário e o cadastro da empresa parceira.
        </p>
      </div>

      <div style={{ display: 'inline-flex', background: 'var(--eeds-ink-100)', borderRadius: 10, padding: 3, marginBottom: 20 }}>
        {TABS.map((t) => {
          const active = t.id === tab
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                height: 34,
                padding: '0 18px',
                border: 0,
                borderRadius: 8,
                fontFamily: 'var(--eeds-font-body)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                background: active ? '#fff' : 'transparent',
                color: active ? 'var(--eeds-navy-700)' : 'var(--eeds-ink-500)',
                boxShadow: active ? 'var(--eeds-shadow-sm)' : 'none',
              }}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'usuario' && <UserTab />}
      {tab === 'parceiro' && <PartnerTab />}
      {tab === 'agentes' && <AgentsTab />}
      {tab === 'notificacoes' && <NotificationsTab />}
    </Screen>
  )
}

/* -------------------- Meus dados -------------------- */

function UserTab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>
      <Card padding={24} radius={16} style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            margin: '0 auto 14px',
            background: 'linear-gradient(135deg, var(--eeds-navy-600), var(--eeds-navy-800))',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--eeds-font-display)',
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          {CURRENT_USER.iniciais}
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--eeds-ink-800)', margin: 0 }}>{CURRENT_USER.nome}</p>
        <p style={{ fontSize: 13, color: 'var(--eeds-ink-500)', margin: '2px 0 14px' }}>{CURRENT_USER.cargo}</p>
        <button
          style={{
            width: '100%',
            height: 38,
            border: '1px solid var(--eeds-ink-300)',
            background: '#fff',
            color: 'var(--eeds-ink-700)',
            borderRadius: 8,
            fontFamily: 'var(--eeds-font-body)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Alterar foto
        </button>
      </Card>
      <Card padding={24} radius={16}>
        <h3 style={{ ...cardHeading, marginBottom: 18 }}>Dados pessoais</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Nome completo" defaultValue={CURRENT_USER.nome} />
          <Field label="CPF" defaultValue={CURRENT_USER.cpf} mono />
          <Field label="E-mail" defaultValue={CURRENT_USER.email} />
          <Field label="Celular" defaultValue={CURRENT_USER.celular} mono />
        </div>
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--eeds-ink-100)' }}>
          <h3 style={{ ...cardHeading, marginBottom: 18 }}>Segurança</h3>
          <SecurityRow
            icon="Lock"
            title="Senha de acesso"
            desc="Alterada há 3 meses"
            action={
              <button
                style={{
                  height: 34,
                  padding: '0 14px',
                  border: '1px solid var(--eeds-ink-300)',
                  background: '#fff',
                  color: 'var(--eeds-ink-700)',
                  borderRadius: 8,
                  fontFamily: 'var(--eeds-font-body)',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Alterar
              </button>
            }
          />
          <div style={{ height: 10 }} />
          <SecurityRow
            icon="ShieldCheck"
            title="Verificação em duas etapas"
            desc="Código por e-mail a cada acesso"
            action={<StatusBadge variant="success">Ativada</StatusBadge>}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
          <button style={cancelBtn}>Cancelar</button>
          <button style={saveBtn}>
            <span style={{ fontSize: 16, display: 'inline-flex' }}>
              <Icon name="Save" />
            </span>{' '}
            Salvar alterações
          </button>
        </div>
      </Card>
    </div>
  )
}

function SecurityRow({ icon, title, desc, action }: { icon: string; title: string; desc: string; action: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        border: '1px solid var(--eeds-ink-200)',
        borderRadius: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 18, display: 'inline-flex', color: 'var(--eeds-ink-400)' }}>
          <Icon name={icon} />
        </span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--eeds-ink-800)', margin: 0 }}>{title}</p>
          <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '1px 0 0' }}>{desc}</p>
        </div>
      </div>
      {action}
    </div>
  )
}

/* -------------------- Cadastro do parceiro -------------------- */

function SectionCard({
  icon,
  iconBg,
  iconFg,
  title,
  subtitle,
  children,
}: {
  icon: string
  iconBg: string
  iconFg: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <Card padding={24} radius={16}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: iconBg,
            color: iconFg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          <Icon name={icon} />
        </div>
        <div>
          <h3 style={cardHeading}>{title}</h3>
          {subtitle ? <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </Card>
  )
}

function PartnerTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionCard
        icon="Building2"
        iconBg="var(--eeds-navy-50)"
        iconFg="var(--eeds-navy-700)"
        title="Dados da empresa"
        subtitle="Razão social e identificação fiscal do parceiro"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
          <Field label="Razão social" defaultValue={PARTNER.razaoSocial} />
          <Field label="CNPJ" defaultValue={PARTNER.cnpj} mono />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Field label="Tipo de parceiro" defaultValue={PARTNER.tipo} />
          <Field label="Telefone comercial" defaultValue={PARTNER.telefone} mono />
          <Field label="Site" defaultValue={PARTNER.site} />
        </div>
      </SectionCard>

      <SectionCard icon="MapPin" iconBg="var(--eeds-ink-100)" iconFg="var(--eeds-ink-600)" title="Endereço">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 16, marginBottom: 16 }}>
          <Field label="CEP" defaultValue={PARTNER.endereco.cep} mono />
          <Field label="Logradouro" defaultValue={PARTNER.endereco.logradouro} />
          <Field label="UF" defaultValue={PARTNER.endereco.uf} mono />
        </div>
        <Field label="Cidade" defaultValue={PARTNER.endereco.cidade} />
      </SectionCard>

      <SectionCard
        icon="Banknote"
        iconBg="var(--eeds-orange-50)"
        iconFg="var(--eeds-orange-500)"
        title="Dados bancários para repasse de comissão"
        subtitle="Conta onde os pagamentos upfront e recorrentes são creditados"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
          <Field label="Banco" defaultValue={PARTNER.banco.banco} />
          <Field label="Agência" defaultValue={PARTNER.banco.agencia} mono />
          <Field label="Conta corrente" defaultValue={PARTNER.banco.conta} mono />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Chave PIX" defaultValue={PARTNER.banco.pix} mono />
          <Field label="Titular" defaultValue={PARTNER.banco.titular} />
        </div>
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
            marginTop: 16,
          }}
        >
          <span style={{ fontSize: 15, display: 'inline-flex' }}>
            <Icon name="Info" />
          </span>{' '}
          Alterações nos dados bancários passam por validação do back-office antes do próximo repasse.
        </div>
      </SectionCard>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button style={cancelBtn}>Cancelar</button>
        <button style={saveBtn}>
          <span style={{ fontSize: 16, display: 'inline-flex' }}>
            <Icon name="Save" />
          </span>{' '}
          Salvar cadastro
        </button>
      </div>
    </div>
  )
}

/* -------------------- Agentes de venda -------------------- */

const AGENT_GRID = '2.4fr 1.4fr 1fr 1.1fr 36px'
const agentTh = {
  fontSize: 10,
  textTransform: 'uppercase' as const,
  letterSpacing: '.06em',
  color: 'var(--eeds-ink-500)',
  fontWeight: 500 as const,
}

function AgentsTab() {
  const agents = useResource(accountService.agents)
  const [inviteOpen, setInviteOpen] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          background: 'var(--eeds-navy-50)',
          border: '1px solid var(--eeds-navy-100)',
          borderRadius: 12,
          padding: '14px 16px',
        }}
      >
        <span style={{ fontSize: 18, display: 'inline-flex', color: 'var(--eeds-navy-600)', flexShrink: 0 }}>
          <Icon name="Info" />
        </span>
        <p style={{ fontSize: 13, color: 'var(--eeds-navy-700)', margin: 0, lineHeight: 1.5 }}>
          Agentes de venda são usuários da sua equipe com acesso ao portal. Cada agente visualiza apenas os clientes que
          ele originou; administradores enxergam toda a carteira do parceiro.
        </p>
      </div>

      <Card padding={0} radius={16} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px' }}>
          <div>
            <h3 style={cardHeading}>Equipe de vendas</h3>
            <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>
              {agents.length} usuários com acesso ao portal
            </p>
          </div>
          <button
            onClick={() => setInviteOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              height: 38,
              padding: '0 14px',
              border: 0,
              background: 'var(--eeds-orange-400)',
              color: '#fff',
              borderRadius: 8,
              fontFamily: 'var(--eeds-font-body)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: 'var(--eeds-shadow-sm)',
            }}
          >
            <span style={{ fontSize: 15, display: 'inline-flex' }}>
              <Icon name="UserPlus" />
            </span>{' '}
            Convidar agente
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: AGENT_GRID,
            gap: 12,
            padding: '10px 20px',
            background: 'var(--eeds-ink-50)',
            borderTop: '1px solid var(--eeds-ink-200)',
            borderBottom: '1px solid var(--eeds-ink-200)',
          }}
        >
          <span style={agentTh}>Agente</span>
          <span style={agentTh}>Acesso à carteira</span>
          <span style={{ ...agentTh, textAlign: 'right' }}>Clientes</span>
          <span style={agentTh}>Status</span>
          <span />
        </div>
        {agents.map((a) => (
          <div
            key={a.email}
            style={{
              display: 'grid',
              gridTemplateColumns: AGENT_GRID,
              gap: 12,
              alignItems: 'center',
              padding: '14px 20px',
              borderBottom: '1px solid var(--eeds-ink-100)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--eeds-navy-600), var(--eeds-navy-800))',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {initials(a.nome)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-800)', margin: 0 }}>{a.nome}</p>
                  {a.admin ? (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: 'var(--eeds-navy-700)',
                        background: 'var(--eeds-navy-50)',
                        border: '1px solid var(--eeds-navy-200)',
                        borderRadius: 9999,
                        padding: '1px 7px',
                      }}
                    >
                      Admin
                    </span>
                  ) : null}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: 'var(--eeds-ink-500)',
                    margin: '2px 0 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {a.email}
                </p>
              </div>
            </div>
            <span style={{ fontSize: 13, color: 'var(--eeds-ink-700)' }}>{a.acesso}</span>
            <span style={{ fontFamily: 'var(--eeds-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--eeds-ink-800)', textAlign: 'right' }}>
              {a.clientes === 1 ? '1 cliente' : `${a.clientes} clientes`}
            </span>
            <span>
              <StatusBadge variant={a.statusVariant}>{a.status}</StatusBadge>
            </span>
            <button
              aria-label="Opções"
              style={{
                border: 0,
                background: 'transparent',
                color: 'var(--eeds-ink-400)',
                cursor: 'pointer',
                fontSize: 16,
                display: 'inline-flex',
                justifyContent: 'center',
                padding: 4,
              }}
            >
              <Icon name="MoreHorizontal" />
            </button>
          </div>
        ))}
      </Card>

      <InviteAgentModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  )
}

/* -------------------- Notificações -------------------- */

function NotificationsTab() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(DEFAULT_NOTIFICATION_PREFS)
  const toggle = (key: string) => setPrefs((p) => ({ ...p, [key]: !p[key] }))

  return (
    <Card padding={0} radius={16} style={{ overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px 14px' }}>
        <h3 style={cardHeading}>Configuração de notificações</h3>
        <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '2px 0 0' }}>
          Defina como deseja ser avisado em cada tipo de evento.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 90px 90px',
          gap: 12,
          padding: '10px 24px',
          background: 'var(--eeds-ink-50)',
          borderTop: '1px solid var(--eeds-ink-200)',
          borderBottom: '1px solid var(--eeds-ink-200)',
        }}
      >
        <span style={agentTh}>Evento</span>
        <span style={{ ...agentTh, textAlign: 'center' }}>E-mail</span>
        <span style={{ ...agentTh, textAlign: 'center' }}>Portal</span>
      </div>
      {NOTIFICATION_PREF_ROWS.map((n) => {
        const c = statusColors(n.variant)
        const emailKey = `${n.id}Email`
        const portalKey = `${n.id}Portal`
        return (
          <div
            key={n.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 90px 90px',
              gap: 12,
              alignItems: 'center',
              padding: '14px 24px',
              borderBottom: '1px solid var(--eeds-ink-100)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  flexShrink: 0,
                  background: c.bg,
                  color: c.fg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                }}
              >
                <Icon name={n.icon} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--eeds-ink-800)', margin: 0 }}>{n.label}</p>
                <p style={{ fontSize: 12, color: 'var(--eeds-ink-500)', margin: '1px 0 0' }}>{n.desc}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Toggle on={!!prefs[emailKey]} onToggle={() => toggle(emailKey)} ariaLabel={`${n.label} por e-mail`} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Toggle on={!!prefs[portalKey]} onToggle={() => toggle(portalKey)} ariaLabel={`${n.label} no portal`} />
            </div>
          </div>
        )
      })}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '18px 24px' }}>
        <button style={saveBtn}>
          <span style={{ fontSize: 16, display: 'inline-flex' }}>
            <Icon name="Save" />
          </span>{' '}
          Salvar preferências
        </button>
      </div>
    </Card>
  )
}
