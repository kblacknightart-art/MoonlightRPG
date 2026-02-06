import { player } from '../core/State.js';
import { DungeonVisuals } from './DungeonVisuals.js';
import { UI } from './UI.js';

let currentState = "IDLE"; // IDLE, WALKING, COMBAT
let currentEnemy = null;

export const Combat = {
    startDungeon: (rank) => {
        // Inicializar UI Visual
        DungeonVisuals.init();
        
        // Configurar estado inicial
        currentState = "IDLE";
        Combat.showExplorationMenu();
    },

    // MENÚ DE EXPLORACIÓN (Avanzar / Salir)
    showExplorationMenu: () => {
        DungeonVisuals.renderButtons([
            { label: "👣 AVANZAR", class: "btn-gold", action: Combat.advance },
            { label: "🏃 SALIR", class: "btn-danger", action: () => window.nav('city') }
        ]);
    },

    // LÓGICA DE AVANZAR (Caminar 3 seg -> Encuentro)
    advance: () => {
        if(currentState === "WALKING") return;
        currentState = "WALKING";
        
        // Bloquear controles
        DungeonVisuals.renderButtons([]); 
        DungeonVisuals.updateLog("Avanzando por la mazmorra...");
        
        // Activar animación visual
        DungeonVisuals.startWalking();

        // Esperar 3 segundos
        setTimeout(() => {
            DungeonVisuals.stopWalking();
            Combat.triggerEncounter();
        }, 3000);
    },

    triggerEncounter: () => {
        // Por ahora, siempre sale un Slime (Poring)
        currentEnemy = {
            name: "Slime Ácido",
            hp: 50, maxHp: 50,
            atk: 8, exp: 20
        };

        currentState = "COMBAT";
        DungeonVisuals.showEnemy();
        DungeonVisuals.updateLog(`¡Un ${currentEnemy.name} aparece!`);
        Combat.startPlayerTurn();
    },

    // --- FASE DE COMBATE ---

    startPlayerTurn: () => {
        // Renderizar opciones de combate en el panel inferior
        DungeonVisuals.renderButtons([
            { label: "⚔️ ATACAR", action: () => Combat.playerAction('attack') },
            { label: "✨ SKILL", action: () => Combat.playerAction('skill') }, // Pendiente menú skills
            { label: "🎒 OBJETO", action: () => Combat.playerAction('item') },
            { label: "🏃 HUIR", class: "btn-danger", action: () => Combat.playerAction('flee') }
        ]);
    },

    playerAction: (type) => {
        if (type === 'attack') {
            // Lógica de daño básica
            let dmg = Math.floor(player.stats.STR * 1.5);
            // Animación visual del jugador (opcional: lunge css)
            
            currentEnemy.hp -= dmg;
            DungeonVisuals.updateLog(`Golpeas por <span style="color:yellow">${dmg}</span> de daño.`);
            
            Combat.checkWinCondition();
        } 
        else if (type === 'flee') {
            if (Math.random() > 0.5) {
                DungeonVisuals.updateLog("¡Escapaste!");
                document.getElementById('enemy-sprite').style.display = 'none';
                currentState = "IDLE";
                Combat.showExplorationMenu();
            } else {
                DungeonVisuals.updateLog("¡No pudiste escapar!");
                setTimeout(Combat.enemyTurn, 1000);
            }
        }
        else {
            DungeonVisuals.updateLog("Acción no implementada aún.");
        }
    },

    checkWinCondition: () => {
        if (currentEnemy.hp <= 0) {
            // Victoria
            document.getElementById('enemy-sprite').style.display = 'none';
            DungeonVisuals.updateLog(`<span style="color:#0f0">¡Victoria! Ganaste ${currentEnemy.exp} EXP.</span>`);
            // Dar exp logic...
            
            currentState = "IDLE";
            setTimeout(Combat.showExplorationMenu, 1000);
        } else {
            // Turno enemigo
            setTimeout(Combat.enemyTurn, 1000);
        }
    },

    enemyTurn: () => {
        if(currentEnemy.hp <= 0) return;

        DungeonVisuals.playEnemyAttack(); // Reproducir GIF de ataque
        
        setTimeout(() => {
            let dmg = Math.max(1, currentEnemy.atk - Math.floor(player.stats.VIT / 2));
            player.derived.hp -= dmg;
            UI.updateHUD(); // Actualizar barras arriba
            
            DungeonVisuals.updateLog(`El ${currentEnemy.name} ataca: -<span style="color:red">${dmg} HP</span>`);
            
            if (player.derived.hp <= 0) {
                alert("HAS MUERTO.");
                window.location.reload();
            } else {
                Combat.startPlayerTurn();
            }
        }, 500); // Pequeño delay para sync con animación
    }
};