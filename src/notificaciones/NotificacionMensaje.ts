import { Notificacion } from './Notificacion.base';
import { Plataforma } from '../plataformas';
import { DatosNotificacion, ResultadoEnvio } from '../interfaces';

export class NotificacionMensaje extends Notificacion {
    private remitente: string;
    private mensaje: string;

 
    constructor(plataforma: Plataforma, remitente: string, mensaje: string) {
        super(plataforma);
        this.remitente = remitente;
        this.mensaje = mensaje;
    }

    public enviar(): ResultadoEnvio {
        const datos: DatosNotificacion = {
            titulo: `Mensaje de ${this.remitente}`,
            mensaje: this.mensaje,
            tipo: 'mensaje',
            icono: '💬'
        };

        const resultado = this.plataforma.mostrar(datos);
        this.marcarComoLeida();
        
        return {
            ...resultado,
            tipoNotificacion: 'Mensaje',
            remitente: this.remitente
        };
    }

    public getRemitente(): string {
        return this.remitente;
    }

    public getMensaje(): string {
        return this.mensaje;
    }
}
