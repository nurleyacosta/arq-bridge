import { Plataforma } from '../plataformas';
import { Notificacion } from '../notificaciones';
import { ResultadoEnvio, Estadisticas } from '../interfaces';


interface RegistroHistorial {
    notificacion: any;
    resultado: ResultadoEnvio;
    timestamp: Date;
}

export class GestorNotificaciones {
    private plataformas: Map<string, Plataforma>;
    private historial: RegistroHistorial[];
    private plataformaPorDefecto: string | null;

    constructor() {
        this.plataformas = new Map();
        this.historial = [];
        this.plataformaPorDefecto = null;
    }

    public registrarPlataforma(nombre: string, plataforma: Plataforma): void {
        this.plataformas.set(nombre, plataforma);
        
        // Si es la primera plataforma, la establece como predeterminada
        if (!this.plataformaPorDefecto) {
            this.plataformaPorDefecto = nombre;
        }
    }

    public establecerPlataformaPorDefecto(nombre: string): void {
        if (!this.plataformas.has(nombre)) {
            throw new Error(`Plataforma "${nombre}" no registrada`);
        }
        this.plataformaPorDefecto = nombre;
    }

    public obtenerPlataforma(nombre?: string): Plataforma {
        const nombrePlataforma = nombre || this.plataformaPorDefecto;
        
        if (!nombrePlataforma) {
            throw new Error("No hay plataforma por defecto configurada");
        }

        const plataforma = this.plataformas.get(nombrePlataforma);
        if (!plataforma) {
            throw new Error(`Plataforma "${nombrePlataforma}" no encontrada`);
        }
        
        return plataforma;
    }

    public enviar(notificacion: Notificacion): ResultadoEnvio {
        const resultado = notificacion.enviar();
        
        this.registrarEnHistorial(notificacion, resultado);
        
        return resultado;
    }


    private registrarEnHistorial(notificacion: Notificacion, resultado: ResultadoEnvio): void {
        this.historial.push({
            notificacion: notificacion.getInfo(),
            resultado: resultado,
            timestamp: new Date()
        });
    }

    public obtenerHistorial(): RegistroHistorial[] {
        return [...this.historial]; // Retorna una copia
    }

    public obtenerEstadisticas(): Estadisticas {
        const stats: Estadisticas = {
            totalNotificaciones: this.historial.length,
            porPlataforma: {},
            porTipo: {}
        };

        this.historial.forEach(item => {
            const plataforma = item.resultado.plataforma;
            stats.porPlataforma[plataforma] = (stats.porPlataforma[plataforma] || 0) + 1;
            const tipo = item.resultado.tipoNotificacion || 'Desconocido';
            stats.porTipo[tipo] = (stats.porTipo[tipo] || 0) + 1;
        });

        return stats;
    }

    public limpiarHistorial(): void {
        this.historial = [];
    }

    public obtenerPlataformasRegistradas(): string[] {
        return Array.from(this.plataformas.keys());
    }

    public plataformaRegistrada(nombre: string): boolean {
        return this.plataformas.has(nombre);
    }

    public getTotalNotificaciones(): number {
        return this.historial.length;
    }

    public getPlataformaPorDefecto(): string | null {
        return this.plataformaPorDefecto;
    }
}
