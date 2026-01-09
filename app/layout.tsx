import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgendaKit - Sistema de Agendamento Profissional",
  description:
    "Simplifique seus agendamentos com integração WhatsApp. Sem mensalidade, sem complicação.",
  keywords: [
    "agendamento",
    "whatsapp",
    "barbearia",
    "salão",
    "consultório",
    "sistema",
  ],
  authors: [{ name: "AgendaKit" }],
  openGraph: {
    title: "AgendaKit - Sistema de Agendamento Profissional",
    description:
      "Simplifique seus agendamentos com integração WhatsApp. Sem mensalidade, sem complicação.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
