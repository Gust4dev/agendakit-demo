"use client";

import { useState, useEffect } from "react";
import {
  cn,
  formatDateShort,
  getWeekDays,
  generateTimeSlots,
} from "@/lib/utils";
import { isSlotBlocked, getBlockedSlotClient, getSlotStats } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface SchedulePickerProps {
  professionalId?: number;
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onBlockedClick?: () => void;
}

export function SchedulePicker({
  professionalId,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onBlockedClick,
}: SchedulePickerProps) {
  const weekDays = getWeekDays();
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [shakingSlot, setShakingSlot] = useState<string | null>(null);
  const [showBlockedToast, setShowBlockedToast] = useState(false);

  const currentDay = selectedDate || weekDays[currentDayIndex];
  const slots = currentDay ? generateTimeSlots(currentDay) : [];
  const stats = currentDay
    ? getSlotStats(currentDay, professionalId)
    : { available: 0, occupied: 0 };

  // Dividir slots em períodos
  const morning = slots.filter((s) => s.hour < 12);
  const afternoon = slots.filter((s) => s.hour >= 12 && s.hour < 17);
  const evening = slots.filter((s) => s.hour >= 17);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDay = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDaySelect = (date: Date, index: number) => {
    setCurrentDayIndex(index);
    onSelectDate(date);
  };

  const handleSlotClick = (time: string, blocked: boolean) => {
    if (blocked) {
      setShakingSlot(time);
      setShowBlockedToast(true);
      setTimeout(() => setShakingSlot(null), 400);
      setTimeout(() => setShowBlockedToast(false), 2500);
      onBlockedClick?.();
      return;
    }
    onSelectTime(time);
  };

  const renderSlot = (slot: { time: string; hour: number }) => {
    const blocked = professionalId
      ? isSlotBlocked(currentDay, slot.time, professionalId)
      : false;
    const clientName =
      blocked && professionalId
        ? getBlockedSlotClient(currentDay, slot.time, professionalId)
        : null;
    const isSelected = selectedTime === slot.time;
    const isShaking = shakingSlot === slot.time;

    return (
      <button
        key={slot.time}
        onClick={() => handleSlotClick(slot.time, blocked)}
        className={cn(
          "relative group flex items-center justify-between w-full p-3 rounded-lg border transition-all duration-200",
          isShaking && "animate-shake",
          blocked && "bg-muted/50 border-border cursor-not-allowed",
          !blocked &&
            !isSelected &&
            "bg-success/5 border-success/30 hover:bg-success/10 hover:border-success/50",
          isSelected && "bg-primary border-primary text-primary-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-semibold text-lg",
              blocked && "text-muted-foreground",
              isSelected && "text-primary-foreground"
            )}
          >
            {slot.time}
          </span>

          {blocked && clientName && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-zinc-600 flex items-center justify-center text-[10px] font-medium text-zinc-300">
                {clientName.charAt(0)}
              </span>
              <span className="opacity-75">{clientName}</span>
            </span>
          )}

          {isSelected && (
            <Badge
              variant="secondary"
              className="bg-primary-foreground/20 text-primary-foreground border-0"
            >
              Seu horário
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {blocked ? (
            <span className="text-xs text-muted-foreground/70 uppercase tracking-wide">
              Ocupado
            </span>
          ) : !isSelected ? (
            <span className="text-xs text-success uppercase tracking-wide font-medium">
              Disponível
            </span>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* Tooltip para ocupados */}
        {blocked && (
          <span className="absolute hidden group-hover:flex items-center gap-1 bg-zinc-800 text-xs px-3 py-1.5 rounded-lg -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 shadow-lg border border-zinc-700">
            <svg
              className="w-3.5 h-3.5 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Já reservado por {clientName}
          </span>
        )}
      </button>
    );
  };

  const renderPeriod = (
    periodSlots: typeof slots,
    icon: string,
    label: string
  ) => {
    if (periodSlots.length === 0) return null;

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground px-1">
          <span>{icon}</span>
          <span className="font-medium">{label}</span>
        </div>
        <div className="space-y-1.5">{periodSlots.map(renderSlot)}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast de bloqueio */}
      {showBlockedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-amber-500/90 text-amber-950 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Este horário já está reservado
          </div>
        </div>
      )}

      {/* Seletor de dias */}
      <div className="space-y-3">
        <h3 className="font-medium text-muted-foreground">Selecione o dia</h3>

        {/* Desktop: Grid horizontal */}
        <div className="hidden sm:grid sm:grid-cols-7 gap-2">
          {weekDays.map((date, index) => {
            const dayStats = getSlotStats(date, professionalId);
            return (
              <button
                key={index}
                onClick={() => handleDaySelect(date, index)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200",
                  "hover:border-primary/50 hover:bg-primary/5",
                  isSelectedDay(date)
                    ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                    : "border-border bg-card",
                  isToday(date) && !isSelectedDay(date) && "border-success/50"
                )}
              >
                <span className="text-xs uppercase text-muted-foreground">
                  {formatDateShort(date).split(",")[0]}
                </span>
                <span className="text-xl font-bold mt-0.5">
                  {date.getDate()}
                </span>
                {isToday(date) ? (
                  <span className="text-[10px] text-success font-medium mt-0.5">
                    Hoje
                  </span>
                ) : (
                  <span
                    className={cn(
                      "text-[10px] mt-0.5 font-medium",
                      dayStats.available > 6
                        ? "text-success"
                        : dayStats.available > 3
                        ? "text-amber-400"
                        : "text-red-400"
                    )}
                  >
                    {dayStats.available} vagas
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile: Lista compacta */}
        <div className="sm:hidden space-y-1.5">
          {weekDays.map((date, index) => {
            const dayStats = getSlotStats(date, professionalId);
            return (
              <button
                key={index}
                onClick={() => handleDaySelect(date, index)}
                className={cn(
                  "flex items-center justify-between w-full p-3 rounded-xl border transition-all duration-200",
                  "hover:border-primary/50 hover:bg-primary/5",
                  isSelectedDay(date)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card",
                  isToday(date) && !isSelectedDay(date) && "border-success/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold">{date.getDate()}</span>
                  <span className="text-muted-foreground capitalize">
                    {formatDateShort(date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isToday(date) && (
                    <Badge variant="success" className="text-[10px]">
                      Hoje
                    </Badge>
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      dayStats.available > 6
                        ? "text-success bg-success/10"
                        : dayStats.available > 3
                        ? "text-amber-400 bg-amber-400/10"
                        : "text-red-400 bg-red-400/10"
                    )}
                  >
                    {dayStats.available} vagas
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slots de horário */}
      {selectedDate && (
        <div className="space-y-4">
          {/* Header com estatísticas */}
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-muted-foreground">
              Selecione o horário
            </h3>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-muted-foreground">
                  {stats.available} livres
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                <span className="text-muted-foreground">
                  {stats.occupied} ocupados
                </span>
              </span>
            </div>
          </div>

          {/* Períodos do dia */}
          <div className="space-y-6">
            {renderPeriod(morning, "🌅", "Manhã")}
            {renderPeriod(afternoon, "☀️", "Tarde")}
            {renderPeriod(evening, "🌙", "Noite")}
          </div>

          {/* Legenda */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-success/20 border border-success/30" />
              <span>Disponível</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-primary border border-primary" />
              <span>Seu horário</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-muted border border-border" />
              <span>Ocupado</span>
            </div>
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {!selectedDate && (
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
      )}
    </div>
  );
}
