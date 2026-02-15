export interface Estadisticas {
    totalNotificaciones: number;
    porPlataforma: Record<string, number>;
    porTipo: Record<string, number>;
}
