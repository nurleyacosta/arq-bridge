import { Plataforma } from './Plataforma.base';
import { DatosNotificacion, ResultadoEnvio } from '../interfaces';
import { TipoNotificacion, PosicionEscritorio } from '../types';


export class PlataformaEscritorio extends Plataforma {
    private posicion: PosicionEscritorio = 'esquina-superior-derecha';
    private duracion: number = 5000;

    private readonly indicadores: Record<TipoNotificacion, string> = {
        'mensaje': '🔵',
        'alerta': '🔴',
        'advertencia': '🟡',
        'confirmacion': '🟢'
    };

    private readonly accionesPorTipo: Record<TipoNotificacion, string[]> = {
        'mensaje': ['Ver', 'Marcar como leído', 'Cerrar'],
        'alerta': ['Revisar ahora', 'Posponer', 'Ignorar'],
        'advertencia': ['Entendido', 'Más información', 'Cerrar'],
        'confirmacion': ['Aceptar', 'Cancelar']
    };

    public mostrar(datos: DatosNotificacion): ResultadoEnvio {
        const notificacion = this.crearNotificacionEscritorio(datos);
        
        return {
            plataforma: "Escritorio",
            formato: "System Notification",
            contenido: notificacion,
            timestamp: new Date().toISOString(),
            configuracion: {
                posicion: this.posicion,
                duracion: this.duracion
            }
        };
    }

    private crearNotificacionEscritorio(datos: DatosNotificacion) {
        const indicador = this.indicadores[datos.tipo] || '⚪';
        const tituloTruncado = datos.titulo.substring(0, 38).padEnd(38);
        const mensajeTruncado = datos.mensaje.substring(0, 36).padEnd(36);

        return {
            titulo: datos.titulo,
            mensaje: datos.mensaje,
            icono: datos.icono,
            indicador: indicador,
            formato: `
╔═══════════════════════════════════════════╗
║ ${indicador} ${tituloTruncado} ║
║                                           ║
║ ${datos.icono}  ${mensajeTruncado} ║
║                                           ║
║ 🖥️  Notificación de Escritorio           ║
║ Posición: ${this.posicion.padEnd(28)} ║
╚═══════════════════════════════════════════╝`,
            acciones: this.accionesPorTipo[datos.tipo] || ['Cerrar']
        };
    }

    public getNombre(): string {
        return "Plataforma Escritorio";
    }

    public configurarPosicion(posicion: PosicionEscritorio): void {
        this.posicion = posicion;
    }

    public configurarDuracion(milisegundos: number): void {
        if (milisegundos < 1000 || milisegundos > 30000) {
            throw new Error("La duración debe estar entre 1000 y 30000 milisegundos");
        }
        this.duracion = milisegundos;
    }

    public getPosicion(): PosicionEscritorio {
        return this.posicion;
    }

    public getDuracion(): number {
        return this.duracion;
    }
}
