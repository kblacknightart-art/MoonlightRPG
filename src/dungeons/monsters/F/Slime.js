export default {
    onTurnStart(combatState) {
        // Lógica simple: Se cura 1 HP por turno
        if (combatState.self.hp < combatState.self.maxHp) {
            combatState.self.hp += 1;
            return "El Slime burbujea y recupera salud.";
        }
        return null;
    },
    attackPattern() {
        return "basic"; // Solo ataque básico
    }
}