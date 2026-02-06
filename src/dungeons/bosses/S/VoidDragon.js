export default {
    phase: 1,
    attackPattern(combatState) {
        // Lógica compleja de jefe por fases
        if (combatState.self.hp < combatState.self.maxHp * 0.5 && this.phase === 1) {
            this.phase = 2;
            return {
                type: "ultimate",
                name: "SUPERNOVA",
                damage: 9999, // Instakill si no te defiendes
                msg: "¡El Dragón carga energía para borrar la existencia!"
            };
        }
        return "random_skill";
    }
}