export interface ResultadoEnvio {
    plataforma: string;
    formato: string;
    contenido: any;
    timestamp: string;
    tipoNotificacion?: string;
    [key: string]: any;
}
