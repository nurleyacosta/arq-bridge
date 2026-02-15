/**
 * DEMOSTRACIÓN DEL PATRÓN BRIDGE
 */

import {
    PlataformaWeb,
    PlataformaMovil,
    PlataformaEscritorio,
    PlataformaEmail,
    NotificacionMensaje,
    NotificacionAlerta,
    GestorNotificaciones
} from './index';

console.log("\n╔═══════════════════════════════════════════════════════════════════╗");
console.log("║        PATRÓN BRIDGE - SISTEMA DE NOTIFICACIONES                ║");
console.log("╚═══════════════════════════════════════════════════════════════════╝\n");

// EJEMPLO 1
console.log("Bridge: 8 clases (50% menos)\n");

// Crear plataformas
const web = new PlataformaWeb();
const movil = new PlataformaMovil();
const escritorio = new PlataformaEscritorio();
const email = new PlataformaEmail();

// Mensaje multiplataforma
const mensaje = new NotificacionMensaje(web, "Juan", "Hola!");
mensaje.enviar();
mensaje.cambiarPlataforma(movil);
mensaje.enviar();

// Gestor
const gestor = new GestorNotificaciones();
gestor.registrarPlataforma('web', web);
gestor.registrarPlataforma('movil', movil);
gestor.enviar(new NotificacionMensaje(gestor.obtenerPlataforma('web'), "María", "Test"));
gestor.enviar(new NotificacionAlerta(gestor.obtenerPlataforma('movil'), "Batería", "15%", 'media'));
console.log("\n📊 Estadísticas:", gestor.obtenerEstadisticas());

console.log("\n✅ Demostración completada!\n");
