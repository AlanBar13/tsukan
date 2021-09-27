export interface Item {
    id: string;
    title: string;
    category: string;
    amount: number;
    sign: string;
    timestamp: string;
}

export const xpCategories: string[] = ["Cuidado Personal", "Deuda", "Entretenmiento", "Hogar", "Mascotas", "Otro", "Salud", "Seguros", "Servicios", "Telefonia", "Transporte", "Inversiones"]
export const inCategories: string[] = ["Salario", "Pago Deuda", "Ganancias", "Otro"]
