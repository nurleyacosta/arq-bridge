import { Plataforma } from '../plataformas';
import { ResultadoEnvio, InfoNotificacion } from '../interfaces';


export abstract class Notificacion {
    protected plataforma: Plataforma;
    protected timestamp: Date;
    protected leida: boolean;

    constructor(plataforma: Plataforma) {
        this.plataforma = plataforma;
        this.timestamp = new Date();
        this.leida = false;
    }

    abstract enviar(): ResultadoEnvio;

    public cambiarPlataforma(nuevaPlataforma: Plataforma): void {
        this.plataforma = nuevaPlataforma;
    }

    public marcarComoLeida(): void {
        this.leida = true;
    }

    public estaLeida(): boolean {
        return this.leida;
    }

    public getInfo(): InfoNotificacion {
        return {
            tipo: this.constructor.name,
            plataforma: this.plataforma.getNombre(),
            timestamp: this.timestamp,
            leida: this.leida
        };
    }

    public getPlataforma(): Plataforma {
        return this.plataforma;
    }


    public getTimestamp(): Date {
        return this.timestamp;
    }
}
