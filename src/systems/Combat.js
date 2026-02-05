import { player, dungeon, combat, RANKS, STATS } from '../core/State.js';
import { log, createFloatText, shakeScreen, varColor } from '../core/Utils.js';
import { UI } from './UI.js';
import { nav } from '../main.js'; // Referencia circular, cuidado. Mejor pasar nav como callback o usar eventos.

export const Combat = {
    // ... (Copia las funciones enterDungeon, renderDungeonUI, dungeonStep, initCombat, etc.) ...
    // Asegúrate de usar las importaciones correctamente.
    // Ejemplo:
    enterDungeon(rIdx) {
        if(player.energy < 2) { log("Sin energía.", "m-sys"); return; }
        player.energy -= 2; UI.updateHUD();
        
        dungeon.active = true;
        dungeon.rank = rIdx;
        dungeon.floor = 1;
        dungeon.maxFloors = rIdx === 0 ? 1 : (rIdx+1)*2;
        dungeon.mobsLeft = (rIdx+1)*5;
        dungeon.boss = false;
        
        log(`Entrando a Mazmorra Rango ${RANKS[rIdx]}...`, "m-combat");
        this.renderDungeonUI();
    },

    renderDungeonUI() {
        document.getElementById('loc-title').innerText = `MAZMORRA ${RANKS[dungeon.rank]} - PISO ${dungeon.floor}`;
        let mobTxt = dungeon.boss ? "¡JEFE DE PISO DETECTADO!" : `Hostiles restantes: ${dungeon.mobsLeft}`;
        
        document.getElementById('action-grid').innerHTML = `
            <div style="grid-column:1/-1; background:rgba(255,0,0,0.1); border:1px solid var(--danger); padding:15px; text-align:center;">
                <h3 style="margin:0; color:var(--danger);">${mobTxt}</h3>
            </div>
            <button class="btn-gold" style="height:100px;" onclick="window.Game.Combat.dungeonStep()">👣 AVANZAR</button>
            <button class="btn-danger" style="height:100px;" onclick="window.nav('dungeon')">🏃 HUIR</button>
        `;
    },
    
    // ... (Resto de funciones de combate: dungeonStep, initCombat, renderCombatUI, combatAction, etc.) ...
    // Recuerda exportarlas o adjuntarlas a window.Game.Combat en main.js
};