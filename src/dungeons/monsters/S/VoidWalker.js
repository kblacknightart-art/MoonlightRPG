export default {
    onTurnStart(combatState) {
        // Habilidad pasiva: Aura de Terror
        // Reduce el ataque del jugador un 5% cada turno
        return {
            type: "debuff",
            target: "player",
            stat: "atk",
            value: 0.95,
            msg: "La presencia del Vacío debilita tus músculos."
        };
    }
}