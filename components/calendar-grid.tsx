"use client";

import { cn, formatDateShort, getWeekDays } from "@/lib/utils";

interface CalendarGridProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export function CalendarGrid({
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const weekDays = getWeekDays();

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-muted-foreground">Selecione o dia</h3>

      {/* Desktop: Grid horizontal */}
      <div className="hidden md:grid md:grid-cols-7 gap-2">
        {weekDays.map((date, index) => (
          <button
            key={index}
            onClick={() => onSelectDate(date)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200",
              "hover:border-primary/50 hover:bg-primary/5",
              isSelected(date)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card",
              isToday(date) && !isSelected(date) && "border-success/50"
            )}
          >
            <span className="text-xs uppercase text-muted-foreground">
              {formatDateShort(date).split(",")[0]}
            </span>
            <span className="text-2xl font-bold mt-1">{date.getDate()}</span>
            {isToday(date) && (
              <span className="text-[10px] text-success font-medium mt-0.5">
                Hoje
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Mobile: Lista vertical */}
      <div className="md:hidden space-y-2">
        {weekDays.map((date, index) => (
          <button
            key={index}
            onClick={() => onSelectDate(date)}
            className={cn(
              "flex items-center justify-between w-full p-4 rounded-xl border transition-all duration-200",
              "hover:border-primary/50 hover:bg-primary/5",
              isSelected(date)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card",
              isToday(date) && !isSelected(date) && "border-success/50"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">{date.getDate()}</span>
              <span className="text-muted-foreground capitalize">
                {formatDateShort(date)}
              </span>
            </div>
            {isToday(date) && (
              <span className="text-xs text-success font-medium bg-success/10 px-2 py-1 rounded-full">
                Hoje
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
