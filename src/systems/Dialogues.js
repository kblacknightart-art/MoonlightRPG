import { player } from '../core/State.js';
import { NPC_DB } from '../data/npcs.js';
import { UI } from './UI.js';
import { varColor } from '../core/Utils.js'; // Importar varColor aquí también

let currNPC = null;

export const Dialogue = {
    start(name) {
        currNPC = name;
        player.social[name].known = true;
        UI.renderSidebar();
        
        document.getElementById('modal-date').classList.add('active');
        document.getElementById('npc-name').innerText = name;
        document.getElementById('npc-face').innerText = NPC_DB[name].emoji;
        document.getElementById('npc-val').innerText = player.social[name].aff;
        document.getElementById('npc-status').innerText = player.social[name].status;
        
        let barW = Math.min(100, Math.max(0, player.social[name].aff + 50));
        document.getElementById('npc-bar').style.width = barW + "%";
        
        document.getElementById('chat-hist').innerHTML = ''; 
        
        this.renderTopic(NPC_DB[name].topics.root);
    },

    renderTopic(node) {
        // ... (Copia la lógica de renderTopic y resolveChat aquí) ...
    }
    
    // ...
};