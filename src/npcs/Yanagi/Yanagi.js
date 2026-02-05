export default {
    // Lógica específica de Yanagi (Ejemplo)
    checkAvailability(time) {
        return time > 8 && time < 20; // Solo aparece de día
    },
    
    specialEvent() {
        console.log("Evento especial de Yanagi activado");
    }
}