import { formatDate } from "./utils";

const WHATSAPP_NUMBER = "5561998031185";

export interface BookingDetails {
    serviceName: string;
    professionalName: string;
    date: Date;
    time: string;
    clientName: string;
    clientPhone: string;
    observations?: string;
}

export function generateWhatsAppMessage(booking: BookingDetails): string {
    const lines = [
        "Olá! Gostaria de agendar:",
        "",
        `📅 *Serviço:* ${booking.serviceName}`,
        `👤 *Profissional:* ${booking.professionalName}`,
        `📆 *Data:* ${formatDate(booking.date)}`,
        `🕐 *Horário:* ${booking.time}`,
        "",
        `👋 *Meu nome:* ${booking.clientName}`,
        `📱 *Contato:* ${booking.clientPhone}`,
    ];

    if (booking.observations?.trim()) {
        lines.push("", `📝 *Observações:* ${booking.observations}`);
    }

    return lines.join("\n");
}

export function generateWhatsAppLink(booking: BookingDetails): string {
    const message = generateWhatsAppMessage(booking);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function openWhatsApp(booking: BookingDetails): void {
    const link = generateWhatsAppLink(booking);
    window.open(link, "_blank");
}
