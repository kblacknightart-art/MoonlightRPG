import { player } from '../core/State.js';
import { log } from '../core/Utils.js';

export const DungeonSystem = {
    /**
     * Intenta entrar a una mazmorra específica.
     * @param {string} rank - El rango de la mazmorra ('F', 'E', 'D'...)
     * @param {string} zoneId - ID del distrito (ej: 'shinjuku_dungeon_1')
     */
    tryEnter(rank, zoneId) {
        const ranks = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
        const playerRankIndex = player.rankIdx; // 0 = F, 1 = E...
        const dungeonRankIndex = ranks.indexOf(rank);

        // Validación de Rango
        if (dungeonRankIndex > playerRankIndex) {
            log(`ACCESO DENEGADO. Rango insuficiente. Requiere Rango ${rank}.`, "m-sys");
            return;
        }
        
        // (Opcional) Si quieres bloquear mazmorras de rango muy bajo
        // if (dungeonRankIndex < playerRankIndex - 2) { ... }

        this.startDungeon(rank, zoneId);
    },

    async startDungeon(rank, zoneId) {
        log(`Entrando a Mazmorra Rango ${rank}...`, "m-combat");
        // Aquí cargarías la escena de mazmorra, monstruos, etc.
        // ... Lógica de carga ...
    }
};