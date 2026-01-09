"use client";

import { cn, generateTimeSlots } from "@/lib/utils";
import { isSlotBlocked } from "@/lib/data";

interface TimeSlotPickerProps {
  date: Date | null;
  professionalId?: number;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimeSlotPicker({
  date,
  professionalId,
  selectedTime,
  onSelectTime,
}: TimeSlotPickerProps) {
  if (!date) {
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p>Selecione um dia para ver os horários disponíveis</p>
      </div>
    );
  }

  const slots = generateTimeSlots(date);

  // Dividir slots em períodos do dia
  const morning = slots.filter((s) => s.hour < 12);
  const afternoon = slots.filter((s) => s.hour >= 12 && s.hour < 17);
  const evening = slots.filter((s) => s.hour >= 17);

  const renderSlots = (periodSlots: typeof slots) => (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {periodSlots.map((slot) => {
        const blocked = professionalId
          ? isSlotBlocked(date, slot.time, professionalId)
          : false;

        return (
          <button
            key={slot.time}
            onClick={() => !blocked && onSelectTime(slot.time)}
            disabled={blocked}
            className={cn(
              "py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200",
              blocked &&
                "bg-muted text-muted-foreground cursor-not-allowed opacity-50",
              !blocked &&
                selectedTime !== slot.time &&
                "bg-success/10 text-success hover:bg-success/20 border border-success/30",
              selectedTime === slot.time &&
                "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            )}
          >
            {slot.time}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-muted-foreground">Selecione o horário</h3>

      {morning.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>🌅</span>
            <span>Manhã</span>
          </div>
          {renderSlots(morning)}
        </div>
      )}

      {afternoon.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>☀️</span>
            <span>Tarde</span>
          </div>
          {renderSlots(afternoon)}
        </div>
      )}

      {evening.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>🌙</span>
            <span>Noite</span>
          </div>
          {renderSlots(evening)}
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-success/20 border border-success/30" />
          <span>Disponível</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-muted" />
          <span>Ocupado</span>
        </div>
      </div>
    </div>
  );
}
