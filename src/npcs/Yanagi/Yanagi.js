import { player } from '../../core/State.js';

export default {
    // Definición del NPC
    info: {
        id: "Yanagi",
        name: "Tsukishiro Yanagi",
        job: "Vicecapitana Sección 6",
        emoji: "👓" // O imagen real si tienes
    },

    /**
     * Determina qué escena inicial mostrar basado en:
     * 1. Hora del sistema (Simulada o Real)
     * 2. Nivel de Afecto
     * 3. Eventos previos (Flags)
     */
    getStartScene() {
        const hour = new Date().getHours(); // Usamos hora real para inmersión, o variable de juego
        const aff = player.social.Yanagi ? player.social.Yanagi.aff : 0;

        // Rango de Afecto Negativo (Te odia)
        if (aff <= -20) return 'hate_encounter';

        // Rango de Romance/Confianza (Alto Afecto)
        if (aff >= 50) return 'romance_root';

        // Rutina Diaria (Afecto Neutral/Bajo)
        if (hour >= 6 && hour < 9) return 'routine_morning_rush'; // 6am - 9am
        if (hour >= 9 && hour < 18) return 'routine_work_patrol'; // 9am - 6pm
        if (hour >= 18 && hour < 21) return 'routine_bakery_evening'; // 6pm - 9pm (La escena original)
        return 'routine_night_overtime'; // 9pm+
    },

    // Función auxiliar para chequear si tiene sentido encontrarla
    checkAvailability() {
        // Yanagi siempre está trabajando o comprando, así que siempre está disponible,
        // pero su humor cambia drásticamente.
        return true;
    }
}