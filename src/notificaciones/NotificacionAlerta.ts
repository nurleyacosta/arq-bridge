import { Notificacion } from './Notificacion.base';
import { Plataforma } from '../plataformas';
import { DatosNotificacion, ResultadoEnvio } from '../interfaces';
import { NivelSeveridad } from '../types';

export class NotificacionAlerta extends Notificacion {
    private tituloAlerta: string;
    private descripcion: string;
    private nivelSeveridad: NivelSeveridad;

    private readonly iconosPorSeveridad: Record<NivelSeveridad, string> = {
        'baja': '⚠️',
        'media': '🚨',
        'alta': '🔴',
        'critica': '🆘'
    };

    constructor(
        plataforma: Plataforma,
        tituloAlerta: string,
        descripcion: string,
        nivelSeveridad: NivelSeveridad = 'alta'
    ) {
        super(plataforma);
        this.tituloAlerta = tituloAlerta;
        this.descripcion = descripcion;
        this.nivelSeveridad = nivelSeveridad;
    }

    public enviar(): ResultadoEnvio {
        const datos: DatosNotificacion = {
            titulo: `⚠️ ALERTA: ${this.tituloAlerta}`,
            mensaje: this.descripcion,
            tipo: 'alerta',
            icono: this.iconosPorSeveridad[this.nivelSeveridad]
        };

        const resultado = this.plataforma.mostrar(datos);
        
        return {
            ...resultado,
            tipoNotificacion: 'Alerta',
            severidad: this.nivelSeveridad,
            requiereAtencion: true
        };
    }

    public getSeveridad(): NivelSeveridad {
        return this.nivelSeveridad;
    }

    public getTituloAlerta(): string {
        return this.tituloAlerta;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }
}
