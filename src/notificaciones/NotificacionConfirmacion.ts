import { Notificacion } from './Notificacion.base';
import { Plataforma } from '../plataformas';
import { DatosNotificacion, ResultadoEnvio } from '../interfaces';


export class NotificacionConfirmacion extends Notificacion {
    private accion: string;
    private detalles: string;

    constructor(plataforma: Plataforma, accion: string, detalles: string = '') {
        super(plataforma);
        this.accion = accion;
        this.detalles = detalles;
    }

    public enviar(): ResultadoEnvio {
        const datos: DatosNotificacion = {
            titulo: `✓ ${this.accion}`,
            mensaje: this.detalles || `La acción "${this.accion}" se completó exitosamente`,
            tipo: 'confirmacion',
            icono: '✅'
        };

        const resultado = this.plataforma.mostrar(datos);
        
        return {
            ...resultado,
            tipoNotificacion: 'Confirmación',
            accionCompletada: this.accion
        };
    }

    public getAccion(): string {
        return this.accion;
    }

    public getDetalles(): string {
        return this.detalles;
    }
}
