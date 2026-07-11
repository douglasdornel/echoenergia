# Portal de Parceiros · Echo Energia

Portal comercial para parceiros da Echo Energia (Grupo Equatorial): registro de
leads, pipeline de oportunidades, gerador de cotação com simulação de
comissionamento em tempo real, acompanhamento de pagamentos (upfront +
recorrência), treinamentos, níveis de parceiro, atendimento, notificações e
gestão da conta / equipe de vendas.

Implementação em **React + Vite + TypeScript**, fiel ao Echo Energia Design
System (EEDS). Os dados hoje vêm de mocks, mas atrás de uma camada de serviços
pronta para API (veja abaixo).

## Como rodar

```bash
npm install
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run build      # build de produção (tsc + vite build → dist/)
npm run preview    # serve o build de produção
npm run typecheck  # checagem de tipos sem emitir
```

No login, clique **Receber código → Verificar código** (o OTP já vem
preenchido) para entrar.

## Estrutura

```
src/
  main.tsx              # bootstrap: Router + Auth + Settings providers
  App.tsx               # rotas; alterna Login × AppShell conforme sessão
  styles/
    tokens.css          # tokens EEDS (cores, tipografia, sombras, motion)
    global.css          # reset + classes utilitárias (scrollbar, range, animações)
  types/                # tipos de domínio (Lead, Deal, Tier, ...)
  data/mock.ts          # datasets de exemplo (fonte única de conteúdo)
  services/             # camada de serviços async, pronta para API (ver abaixo)
  hooks/useResource.ts  # lê um Resource para o estado do componente
  lib/                  # format (pt-BR), status (cores), tiers (comissão)
  context/              # AuthContext (login/OTP/sessão), SettingsContext (nível + variante)
  components/
    ui/                 # primitivas (Icon, Button, Card, Field, StatusBadge, Toggle, ...)
    layout/             # AppShell, Sidebar, Topbar, UserMenu, TweaksPanel, nav
    overlays/           # Drawer de lead/oportunidade, modal de vídeo, modal de convite
  screens/              # uma tela por rota (Dashboard, Leads, Quote, Account, ...)
```

## Camada de dados pronta para API

Componentes nunca leem `data/mock.ts` diretamente para listas — usam serviços
em `src/services`. Cada serviço expõe um `Resource<T>` com:

- `get(): Promise<T>` — o contrato de API. Troque o produtor por um `fetch(...)`
  para ir ao ar sem tocar nos componentes.
- `peek(): T` — snapshot síncrono do mock, usado para semear o estado do React
  (sem "flash" de carregamento hoje).

O hook `useResource(resource)` consome esse contrato. Para conectar um backend
real, substitua os produtores por chamadas HTTP e ajuste `useResource` para
lidar com estados de carregamento/erro — a interface dos componentes permanece.

## Comissionamento e níveis

O cálculo da cotação e as regras de nível ficam em `src/lib/tiers.ts`
(`computeQuote`, `TIERS`). O nível do parceiro afeta as taxas de comissão, o
desbloqueio de preço base, treinamentos avançados e benefícios.

O **painel de tweaks** (canto inferior direito) permite trocar o nível do
parceiro e a variante do dashboard — é um controle de demonstração, não faz
parte do produto final.

## Origem do design

Recriado a partir do bundle de handoff do Claude Design em `project/` (protótipo
HTML/CSS/JS) e das transcrições em `chats/`. Esses arquivos permanecem no
repositório como referência de design.
