import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="animate-fade-in">
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-sm border-primary/50 text-primary"
              >
                ✨ Demo Interativa
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in stagger-1">
              <span className="text-foreground">Sistema de</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                Agendamento Profissional
              </span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground animate-fade-in stagger-2">
              Simplifique seus agendamentos com integração direta ao WhatsApp.
              <br className="hidden sm:block" />
              Sem mensalidade, sem complicação.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in stagger-3">
              <Link href="/agenda">
                <Button size="xl" className="min-w-[200px]">
                  Ver demonstração
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-muted-foreground animate-fade-in stagger-4">
              <div className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>Pronto em 45 segundos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>100% responsivo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>Integração WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Por que escolher o AgendaKit?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Uma solução completa para profissionais que valorizam seu tempo e
              seus clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "💰",
                title: "Sem Mensalidade",
                description:
                  "Sistema completo sem custos recorrentes. Pague uma vez, use para sempre.",
                highlight: "R$ 0/mês",
              },
              {
                icon: "🔒",
                title: "Seus Dados",
                description:
                  "Você tem controle total. Sem dependência de plataformas externas.",
                highlight: "100% privado",
              },
              {
                icon: "📱",
                title: "WhatsApp Integrado",
                description:
                  "Confirmação direta pelo WhatsApp. Prático para você e seus clientes.",
                highlight: "1 clique",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <Badge variant="success" className="mb-3">
                    {benefit.highlight}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-28 bg-card/50 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Como funciona?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Um fluxo simples e intuitivo que seus clientes vão adorar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Escolha o serviço",
                description: "Cliente seleciona o que precisa",
              },
              {
                step: "2",
                title: "Selecione data e hora",
                description: "Visualiza disponibilidade em tempo real",
              },
              {
                step: "3",
                title: "Escolha o profissional",
                description: "Vê quem está disponível",
              },
              {
                step: "4",
                title: "Confirma via WhatsApp",
                description: "Mensagem pronta, só enviar",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/agenda">
              <Button size="lg" variant="outline">
                Testar agora →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>AgendaKit Demo • Sistema de Agendamento Profissional</p>
        </div>
      </footer>
    </div>
  );
}
