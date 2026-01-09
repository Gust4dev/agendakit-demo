export interface Service {
    id: number;
    name: string;
    duration: number;
    price: number;
    category: "barbearia" | "saude" | "fitness" | "estetica";
    icon: string;
    description: string;
}

export interface Professional {
    id: number;
    name: string;
    specialties: number[];
    initials: string;
    color: string;
}

export const services: Service[] = [
    {
        id: 1,
        name: "Corte de Cabelo",
        duration: 45,
        price: 45,
        category: "barbearia",
        icon: "✂️",
        description: "Corte masculino ou feminino com acabamento",
    },
    {
        id: 2,
        name: "Consulta Nutricional",
        duration: 60,
        price: 120,
        category: "saude",
        icon: "🥗",
        description: "Avaliação completa e plano alimentar personalizado",
    },
    {
        id: 3,
        name: "Personal Training",
        duration: 50,
        price: 80,
        category: "fitness",
        icon: "💪",
        description: "Treino personalizado com acompanhamento",
    },
    {
        id: 4,
        name: "Design de Sobrancelha",
        duration: 30,
        price: 35,
        category: "estetica",
        icon: "✨",
        description: "Design com henna ou micropigmentação",
    },
    {
        id: 5,
        name: "Massagem Relaxante",
        duration: 60,
        price: 90,
        category: "saude",
        icon: "💆",
        description: "Massagem corporal completa anti-stress",
    },
    {
        id: 6,
        name: "Consultoria Fitness",
        duration: 45,
        price: 100,
        category: "fitness",
        icon: "📋",
        description: "Avaliação física e montagem de programa",
    },
];

export const professionals: Professional[] = [
    {
        id: 1,
        name: "Ana Silva",
        specialties: [1, 4],
        initials: "AS",
        color: "bg-pink-500",
    },
    {
        id: 2,
        name: "Carlos Santos",
        specialties: [1, 3, 6],
        initials: "CS",
        color: "bg-blue-500",
    },
    {
        id: 3,
        name: "Beatriz Costa",
        specialties: [2, 5],
        initials: "BC",
        color: "bg-purple-500",
    },
];

/**
 * Determina se um slot está ocupado usando hash determinístico
 * Gera ~30% dos slots como ocupados de forma consistente
 */
export function isSlotBlocked(
    date: Date,
    time: string,
    professionalId: number
): boolean {
    const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const key = `${dateStr}-${time}-${professionalId}`;

    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        const char = key.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }

    return Math.abs(hash) % 10 < 3;
}

export function getServiceById(id: number): Service | undefined {
    return services.find((s) => s.id === id);
}

export function getServiceBySlug(slug: string): Service | undefined {
    return services.find(
        (s) =>
            s.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-") === slug
    );
}

export function getProfessionalById(id: number): Professional | undefined {
    return professionals.find((p) => p.id === id);
}

export function getProfessionalsForService(serviceId: number): Professional[] {
    return professionals.filter((p) => p.specialties.includes(serviceId));
}

export function getAvailableProfessionals(
    serviceId: number,
    date: Date,
    time: string
): Professional[] {
    return getProfessionalsForService(serviceId).filter(
        (p) => !isSlotBlocked(date, time, p.id)
    );
}
