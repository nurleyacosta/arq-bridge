import { Plataforma } from './Plataforma.base';
import { DatosNotificacion, ResultadoEnvio, ConfiguracionEmail } from '../interfaces';
import { TipoNotificacion } from '../types';

export class PlataformaEmail extends Plataforma {
    private remitente: string;
    private smtp: string;

    private readonly prioridades: Record<TipoNotificacion, string> = {
        'mensaje': 'Normal',
        'alerta': 'Alta',
        'advertencia': 'Media',
        'confirmacion': 'Normal'
    };

    private readonly colores: Record<TipoNotificacion, string> = {
        'mensaje': '#2196F3',
        'alerta': '#F44336',
        'advertencia': '#FF9800',
        'confirmacion': '#4CAF50'
    };

    constructor(configuracion: ConfiguracionEmail = {}) {
        super();
        this.remitente = configuracion.remitente || 'notificaciones@sistema.com';
        this.smtp = configuracion.smtp || 'smtp.sistema.com';
    }

    public mostrar(datos: DatosNotificacion): ResultadoEnvio {
        const email = this.crearEmail(datos);
        
        return {
            plataforma: "Email",
            formato: "HTML Email",
            contenido: email,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Crea el contenido del email
     */
    private crearEmail(datos: DatosNotificacion) {
        const color = this.colores[datos.tipo];
        const prioridad = this.prioridades[datos.tipo];

        return {
            de: this.remitente,
            asunto: `[${datos.tipo.toUpperCase()}] ${datos.titulo}`,
            prioridad: prioridad,
            cuerpoHTML: this.generarCuerpoHTML(datos, color, prioridad),
            cuerpoTexto: this.generarCuerpoTexto(datos, prioridad)
        };
    }

    private generarCuerpoHTML(datos: DatosNotificacion, color: string, prioridad: string): string {
        return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${datos.titulo}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background: ${color}; color: #ffffff; padding: 30px 20px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">${datos.icono}</div>
            <h2 style="margin: 0; font-size: 24px;">${datos.titulo}</h2>
        </div>
        <div style="padding: 30px 20px;">
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">${datos.mensaje}</p>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid ${color}; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong style="color: ${color};">Tipo:</strong> ${datos.tipo}</p>
                <p style="margin: 5px 0;"><strong style="color: ${color};">Prioridad:</strong> ${prioridad}</p>
                <p style="margin: 5px 0;"><strong style="color: ${color};">Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
            </div>
        </div>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 5px 0;">Sistema de Notificaciones</p>
            <p style="margin: 5px 0;">Este es un correo automático. No responder.</p>
        </div>
    </div>
</body>
</html>`;
    }


    private generarCuerpoTexto(datos: DatosNotificacion, prioridad: string): string {
        return `
${datos.icono} ${datos.titulo}
${'='.repeat(60)}

${datos.mensaje}

INFORMACIÓN
──────────────────────────────────────────────────────────
Tipo:       ${datos.tipo}
Prioridad:  ${prioridad}
Fecha:      ${new Date().toLocaleString('es-ES')}

──────────────────────────────────────────────────────────
Sistema de Notificaciones
Este es un correo automático. No responder.
`;
    }

    public getNombre(): string {
        return "Plataforma Email";
    }

    public configurarRemitente(email: string): void {
        if (!this.validarEmail(email)) {
            throw new Error("Email inválido");
        }
        this.remitente = email;
    }

    private validarEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    public getRemitente(): string {
        return this.remitente;
    }
}
