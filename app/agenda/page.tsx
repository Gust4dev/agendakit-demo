import Link from "next/link";
import { services } from "@/lib/data";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Escolha o Serviço | AgendaKit",
  description: "Selecione o serviço que deseja agendar",
};

export default function AgendaPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">
            AgendaKit
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            Escolha o Serviço
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Selecione o serviço que você deseja agendar. Todos os profissionais
            qualificados.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <span className="font-medium">Serviço</span>
            </div>
            <div className="w-8 border-t border-border" />
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <span className="hidden sm:inline">Data/Hora</span>
            </div>
            <div className="w-8 border-t border-border" />
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <span className="hidden sm:inline">Profissional</span>
            </div>
            <div className="w-8 border-t border-border" />
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                4
              </div>
              <span className="hidden sm:inline">Confirmar</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </main>
    </div>
  );
}
