import { Plataforma } from './Plataforma.base';
import { DatosNotificacion, ResultadoEnvio } from '../interfaces';
import { TipoNotificacion, Prioridad } from '../types';

export class PlataformaMovil extends Plataforma {
    private sonidoHabilitado: boolean = true;
    private vibracionHabilitada: boolean = true;

    private readonly badges: Record<TipoNotificacion, number> = {
        'mensaje': 1,
        'alerta': 99,
        'advertencia': 5,
        'confirmacion': 1
    };

    private readonly prioridades: Record<TipoNotificacion, Prioridad> = {
        'mensaje': 'normal',
        'alerta': 'alta',
        'advertencia': 'media',
        'confirmacion': 'normal'
    };

    public mostrar(datos: DatosNotificacion): ResultadoEnvio {
        const notificacion = this.crearNotificacionMovil(datos);
        
        this.aplicarEfectos(notificacion);

        return {
            plataforma: "Móvil",
            formato: "Push Notification",
            contenido: notificacion,
            timestamp: new Date().toISOString()
        };
    }

    private crearNotificacionMovil(datos: DatosNotificacion) {
        const mensajeTruncado = this.truncar(datos.mensaje, 36);
        const tituloTruncado = this.truncar(datos.titulo, 30);

        return {
            titulo: datos.titulo,
            mensaje: datos.mensaje,
            tipo: datos.tipo,
            icono: datos.icono,
            badge: this.badges[datos.tipo] || 1,
            prioridad: this.prioridades[datos.tipo] || 'normal',
            efectos: [] as string[],
            formato: `
┌─────────────────────────────────────┐
│ ${datos.icono} ${tituloTruncado}│
│ ${mensajeTruncado}│
│ ────────────────────────────────── │
│ 📱 Notificación Móvil              │
└─────────────────────────────────────┘`
        };
    }

    private aplicarEfectos(notificacion: any): void {
        if (this.sonidoHabilitado) {
            notificacion.efectos.push("🔊 Sonido reproducido");
        }
        if (this.vibracionHabilitada) {
            notificacion.efectos.push("📳 Vibración activada");
        }
    }

    private truncar(texto: string, longitud: number): string {
        return texto.substring(0, longitud).padEnd(longitud);
    }

    public getNombre(): string {
        return "Plataforma Móvil";
    }

    public configurarSonido(habilitado: boolean): void {
        this.sonidoHabilitado = habilitado;
    }

    public configurarVibracion(habilitada: boolean): void {
        this.vibracionHabilitada = habilitada;
    }

    public getSonidoHabilitado(): boolean {
        return this.sonidoHabilitado;
    }

    public getVibracionHabilitada(): boolean {
        return this.vibracionHabilitada;
    }
}
