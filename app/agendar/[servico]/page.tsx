"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SchedulePicker } from "@/components/schedule-picker";
import { ProfessionalSelector } from "@/components/professional-selector";
import { BookingForm } from "@/components/booking-form";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import {
  services,
  getProfessionalsForService,
  getProfessionalById,
} from "@/lib/data";
import { formatCurrency, formatDuration, slugify, cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ servico: string }>;
}

export default function AgendarPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { toast, showToast, ToastComponent } = useToast();

  // Find service by slug
  const service = services.find(
    (s) => slugify(s.name) === resolvedParams.servico
  );

  // State
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<
    number | null
  >(null);

  // Derived state
  const professionals = service ? getProfessionalsForService(service.id) : [];
  const selectedProfessional = selectedProfessionalId
    ? getProfessionalById(selectedProfessionalId)
    : null;

  // Handle service not found
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Serviço não encontrado</h1>
          <Link href="/agenda">
            <Button>Ver serviços disponíveis</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Step navigation
  const canProceedToStep2 = selectedDate !== null && selectedTime !== null;
  const canProceedToStep3 =
    canProceedToStep2 && selectedProfessionalId !== null;

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedProfessionalId(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setSelectedProfessionalId(null);
    setStep(2);
  };

  const handleProfessionalSelect = (id: number) => {
    setSelectedProfessionalId(id);
    setStep(3);
  };

  const handleBookingSuccess = () => {
    showToast({
      message: "Agendamento preparado! Complete o envio no WhatsApp",
      type: "success",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen">
      {ToastComponent}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">
            AgendaKit
          </Link>
          <Link href="/agenda">
            <Button variant="ghost" size="sm">
              ← Voltar
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Service Info */}
        <div className="mb-8 p-4 bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{service.icon}</span>
              <div>
                <h1 className="text-xl font-bold">{service.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {formatDuration(service.duration)}
              </Badge>
              <Badge variant="default">{formatCurrency(service.price)}</Badge>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 sm:gap-3 text-sm">
            <button
              onClick={() => setStep(1)}
              className={cn(
                "flex items-center gap-2 transition-opacity",
                step === 1 ? "opacity-100" : "opacity-50 hover:opacity-75"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-semibold",
                  step >= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {canProceedToStep2 ? "✓" : "1"}
              </div>
              <span className="hidden sm:inline font-medium">Data/Hora</span>
            </button>

            <div className="w-6 sm:w-8 border-t border-border" />

            <button
              onClick={() => canProceedToStep2 && setStep(2)}
              disabled={!canProceedToStep2}
              className={cn(
                "flex items-center gap-2 transition-opacity",
                step === 2 ? "opacity-100" : "opacity-50",
                canProceedToStep2 && step !== 2 && "hover:opacity-75"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-semibold",
                  step >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {canProceedToStep3 ? "✓" : "2"}
              </div>
              <span className="hidden sm:inline">Profissional</span>
            </button>

            <div className="w-6 sm:w-8 border-t border-border" />

            <button
              onClick={() => canProceedToStep3 && setStep(3)}
              disabled={!canProceedToStep3}
              className={cn(
                "flex items-center gap-2 transition-opacity",
                step === 3 ? "opacity-100" : "opacity-50",
                canProceedToStep3 && step !== 3 && "hover:opacity-75"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-semibold",
                  step >= 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                3
              </div>
              <span className="hidden sm:inline">Confirmar</span>
            </button>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-8">
          {/* Step 1: Date & Time */}
          {step === 1 && (
            <SchedulePicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectDate={handleDateSelect}
              onSelectTime={handleTimeSelect}
            />
          )}

          {/* Step 2: Professional */}
          {step === 2 && (
            <div>
              <ProfessionalSelector
                professionals={professionals}
                service={service}
                date={selectedDate}
                time={selectedTime}
                selectedId={selectedProfessionalId}
                onSelect={handleProfessionalSelect}
              />

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  ← Voltar
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Form */}
          {step === 3 &&
            selectedDate &&
            selectedTime &&
            selectedProfessional && (
              <div>
                <BookingForm
                  service={service}
                  professional={selectedProfessional}
                  date={selectedDate}
                  time={selectedTime}
                  onSuccess={handleBookingSuccess}
                />

                <div className="mt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    ← Voltar
                  </Button>
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
