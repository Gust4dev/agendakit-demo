# AgendaKit Demo

Sistema de Agendamento Profissional com integração WhatsApp.

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura

```
/app
  /page.tsx                    # Landing page
  /agenda/page.tsx             # Seletor de serviços
  /agendar/[servico]/page.tsx  # Fluxo de agendamento

/components
  /ui/*                        # Componentes base (Button, Card, etc)
  /service-card.tsx            # Card de serviço
  /calendar-grid.tsx           # Calendário semanal
  /time-slot-picker.tsx        # Seletor de horários
  /professional-selector.tsx   # Seletor de profissional
  /booking-form.tsx            # Formulário de confirmação

/lib
  /data.ts                     # Dados fake (serviços, profissionais)
  /utils.ts                    # Helpers de data/hora
  /whatsapp.ts                 # Gerador de link WhatsApp
```

## 🛠 Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **react-hook-form + zod** (validação)
- **date-fns** (datas)

## 📱 Fluxo

1. Landing → "Ver demonstração"
2. Escolhe serviço
3. Seleciona data e horário
4. Escolhe profissional
5. Preenche dados
6. Confirma → Abre WhatsApp

## 🔧 WhatsApp

O número configurado é: `5561998031185`

Para alterar, edite `lib/whatsapp.ts`:

```ts
const WHATSAPP_NUMBER = "5561998031185";
```
