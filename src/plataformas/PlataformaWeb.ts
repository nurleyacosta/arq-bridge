import { Plataforma } from './Plataforma.base';
import { DatosNotificacion, ResultadoEnvio } from '../interfaces';
import { TipoNotificacion } from '../types';


export class PlataformaWeb extends Plataforma {
    private notificacionesActivas: string[] = [];
    private readonly colores: Record<TipoNotificacion, string> = {
        'mensaje': '#2196F3',
        'alerta': '#F44336',
        'advertencia': '#FF9800',
        'confirmacion': '#4CAF50'
    };

    public mostrar(datos: DatosNotificacion): ResultadoEnvio {
        const notificacion = this.crearNotificacionHTML(datos);
        this.notificacionesActivas.push(notificacion);
        
        return {
            plataforma: "Web",
            formato: "HTML",
            contenido: notificacion,
            timestamp: new Date().toISOString()
        };
    }

    private crearNotificacionHTML(datos: DatosNotificacion): string {
        const color = this.colores[datos.tipo] || '#607D8B';

        return `
<div class="notificacion-web" style="
    border-left: 4px solid ${color};
    background: #fff;
    padding: 16px;
    margin: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    border-radius: 4px;
    max-width: 400px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">
    <div style="display: flex; align-items: center;">
        <span style="font-size: 24px; margin-right: 12px;">${datos.icono}</span>
        <div style="flex: 1;">
            <h4 style="margin: 0; color: ${color}; font-size: 16px; font-weight: 600;">
                ${datos.titulo}
            </h4>
            <p style="margin: 4px 0 0 0; color: #666; font-size: 14px; line-height: 1.4;">
                ${datos.mensaje}
            </p>
        </div>
    </div>
    <small style="color: #999; font-size: 12px; margin-top: 8px; display: block;">
        Plataforma: Web
    </small>
</div>`;
    }

    public getNombre(): string {
        return "Plataforma Web";
    }

    public getNotificacionesActivas(): number {
        return this.notificacionesActivas.length;
    }

    public limpiarNotificaciones(): void {
        this.notificacionesActivas = [];
    }
}
