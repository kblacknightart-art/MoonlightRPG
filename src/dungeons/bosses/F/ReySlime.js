export default {
    onHealthLow(combatState) {
        // Habilidad especial cuando tiene < 30% HP
        if (combatState.self.hp < combatState.self.maxHp * 0.3) {
            return {
                type: "skill",
                name: "División Real",
                damage: 20,
                effect: "summon_minion" // Invoca un slime pequeño
            };
        }
        return null;
    }
}