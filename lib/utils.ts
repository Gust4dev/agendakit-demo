import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, addDays, startOfDay, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
    return format(date, "dd/MM/yyyy", { locale: ptBR });
}

export function formatDateLong(date: Date): string {
    return format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
}

export function formatDateShort(date: Date): string {
    return format(date, "EEE, dd/MM", { locale: ptBR });
}

export function formatTime(date: Date): string {
    return format(date, "HH:mm");
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

export function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function getWeekDays(startDate: Date = new Date()): Date[] {
    const days: Date[] = [];
    const start = startOfDay(startDate);
    for (let i = 0; i < 7; i++) {
        days.push(addDays(start, i));
    }
    return days;
}

export interface TimeSlot {
    time: string;
    hour: number;
    minute: number;
    date: Date;
}

export function generateTimeSlots(
    date: Date,
    startHour: number = 9,
    endHour: number = 19,
    intervalMinutes: number = 30
): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const baseDate = startOfDay(date);

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
            const slotDate = setMinutes(setHours(baseDate, hour), minute);
            slots.push({
                time: formatTime(slotDate),
                hour,
                minute,
                date: slotDate,
            });
        }
    }

    return slots;
}

export function formatPhone(value: string): string {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) {
        return `(${numbers}`;
    }
    if (numbers.length <= 7) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}
