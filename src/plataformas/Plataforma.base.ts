import { DatosNotificacion, ResultadoEnvio } from '../interfaces';

export abstract class Plataforma {
    abstract mostrar(datos: DatosNotificacion): ResultadoEnvio;
    abstract getNombre(): string;
}
