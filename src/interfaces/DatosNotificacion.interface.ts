import { TipoNotificacion } from '../types';

export interface DatosNotificacion {
    titulo: string;
    mensaje: string;
    tipo: TipoNotificacion;
    icono: string;
}
