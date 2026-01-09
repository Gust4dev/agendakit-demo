"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { isSlotBlocked, type Professional, type Service } from "@/lib/data";

interface ProfessionalSelectorProps {
  professionals: Professional[];
  service: Service;
  date: Date | null;
  time: string | null;
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function ProfessionalSelector({
  professionals,
  service,
  date,
  time,
  selectedId,
  onSelect,
}: ProfessionalSelectorProps) {
  if (!date || !time) {
    return (
      <div className="p-8 text-center text-muted-foreground bg-card rounded-xl border border-border">
        <svg
          className="w-12 h-12 mx-auto mb-3 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p>Selecione data e horário para ver profissionais disponíveis</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-muted-foreground">
        Selecione o profissional
      </h3>

      <div className="grid gap-3">
        {professionals.map((professional) => {
          const isBlocked = isSlotBlocked(date, time, professional.id);
          const isSelected = selectedId === professional.id;

          return (
            <button
              key={professional.id}
              onClick={() => !isBlocked && onSelect(professional.id)}
              disabled={isBlocked}
              className="text-left w-full"
            >
              <Card
                className={cn(
                  "transition-all duration-200",
                  isBlocked && "opacity-50 cursor-not-allowed",
                  !isBlocked &&
                    "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
                  isSelected && "border-primary bg-primary/10"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar
                      initials={professional.initials}
                      color={professional.color}
                      size="lg"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold">{professional.name}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Especialista em {service.name}
                      </p>
                    </div>

                    {isBlocked ? (
                      <Badge variant="secondary">Indisponível</Badge>
                    ) : (
                      <Badge variant="success">Disponível</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
