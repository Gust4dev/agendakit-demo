"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency, formatPhone } from "@/lib/utils";
import { openWhatsApp, type BookingDetails } from "@/lib/whatsapp";
import type { Service, Professional } from "@/lib/data";

const bookingSchema = z.object({
  clientName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  clientPhone: z
    .string()
    .min(14, "Telefone inválido")
    .max(15, "Telefone inválido"),
  observations: z.string().max(500, "Máximo 500 caracteres").optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  service: Service;
  professional: Professional;
  date: Date;
  time: string;
  onSuccess: () => void;
}

export function BookingForm({
  service,
  professional,
  date,
  time,
  onSuccess,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      clientName: "",
      clientPhone: "",
      observations: "",
    },
  });

  const [isRedirecting, setIsRedirecting] = useState(false);

  const phoneValue = watch("clientPhone");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("clientPhone", formatted);
  };

  const onSubmit = async (data: BookingFormData) => {
    const booking: BookingDetails = {
      serviceName: service.name,
      professionalName: professional.name,
      date,
      time,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      observations: data.observations,
    };

    onSuccess();
    setIsRedirecting(true);

    // Abre WhatsApp após 800ms para feedback visual
    setTimeout(() => {
      openWhatsApp(booking);
      setIsRedirecting(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Resumo do Agendamento */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <span>📋</span>
            Resumo do Agendamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Serviço</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{service.name}</span>
              <Badge variant="secondary">{formatCurrency(service.price)}</Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Profissional</span>
            <span className="font-medium">{professional.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Data</span>
            <span className="font-medium">{formatDate(date)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Horário</span>
            <span className="font-medium">{time}</span>
          </div>
        </CardContent>
      </Card>

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="clientName">Seu nome *</Label>
          <Input
            id="clientName"
            placeholder="Digite seu nome completo"
            {...register("clientName")}
            className={errors.clientName ? "border-destructive" : ""}
          />
          {errors.clientName && (
            <p className="text-sm text-destructive">
              {errors.clientName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientPhone">WhatsApp *</Label>
          <Input
            id="clientPhone"
            placeholder="(00) 00000-0000"
            value={phoneValue}
            onChange={handlePhoneChange}
            className={errors.clientPhone ? "border-destructive" : ""}
          />
          {errors.clientPhone && (
            <p className="text-sm text-destructive">
              {errors.clientPhone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="observations">Observações (opcional)</Label>
          <Textarea
            id="observations"
            placeholder="Alguma informação adicional?"
            {...register("observations")}
          />
        </div>

        <Button
          type="submit"
          size="xl"
          className="w-full"
          disabled={isSubmitting || isRedirecting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Preparando...
            </>
          ) : isRedirecting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Abrindo WhatsApp...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Confirmar Agendamento
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Ao clicar, o WhatsApp será aberto com sua mensagem de agendamento
          pronta. Complete o envio manualmente.
        </p>
      </form>
    </div>
  );
}
