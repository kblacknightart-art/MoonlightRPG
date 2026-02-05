import { player, STATS, RANKS } from '../core/State.js';
import { NPC_DB } from '../data/npcs.js';

export const UI = {
    updateHUD() {
        document.getElementById('hud-lvl').innerText = player.lvl;
        document.getElementById('hud-money').innerText = player.money.toLocaleString();
        document.getElementById('hud-rank').innerText = RANKS[player.rankIdx];
        
        let hpP = (player.derived.hp / player.derived.maxHp) * 100;
        document.getElementById('bar-hp').style.width = hpP + "%";
        document.getElementById('txt-hp').innerText = `${Math.floor(player.derived.hp)}/${player.derived.maxHp}`;
        
        let mpP = (player.derived.mp / player.derived.maxMp) * 100;
        document.getElementById('bar-mp').style.width = mpP + "%";
        document.getElementById('txt-mp').innerText = `${Math.floor(player.derived.mp)}/${player.derived.maxMp}`;
        
        document.getElementById('bar-en').style.width = (player.energy / 10 * 100) + "%";
    },

    renderSidebar() {
        // ... (Copia la lógica de renderSidebar del código anterior) ...
        // Como el código es extenso, asegúrate de importar las funciones necesarias
        // o implementa la lógica aquí. Por brevedad, te doy la estructura.
        let h = '';
        STATS.forEach(s => {
            let base = player.stats[s];
            // Necesitamos acceder a player.totalStats, asegúrate de calcularlo en State.js o aquí
            let bonus = (player.blessing?.stats?.[s] || 0); 
            // Nota: En la versión anterior `totalStats` se calculaba en `recalc`.
            // Para simplificar, aquí usaremos player.stats + blessing
            
            h += `<div class="stat-row"><span>${s}</span><span>${base} ${bonus>0 ? `<span class="bonus-val">(+${bonus})</span>` : ''}</span></div>`;
        });
        document.getElementById('stats-render').innerHTML = h;
        
        if(player.blessing){
            document.getElementById('bl-name').innerText=player.blessing.name;
            document.getElementById('bl-stats').innerText=JSON.stringify(player.blessing.stats).replace(/[{"}]/g,'').replace(/,/g,', ');
        }
        
        // Inventario
        document.getElementById('inv-list').innerHTML = player.inventory.map(i=>`<div class="inv-item" style="color:${i.type=='mat'?'#aaa':'#fff'}">${i.name}</div>`).join('');
        document.getElementById('inv-cur').innerText=player.inventory.length;
        
        // Equipo
        document.getElementById('eq-w').innerText = player.equipment.weapon?.name || "Puños";
        document.getElementById('eq-a').innerText = player.equipment.armor?.name || "Ropa Civil";
        document.getElementById('eq-acc').innerText = player.equipment.acc?.name || "-";

        // Social
        let sh = '';
        for(let k in player.social) {
            if(player.social[k].known) {
                let col = player.social[k].aff > 50 ? 'var(--primary)' : player.social[k].aff < 0 ? 'var(--danger)' : '#fff';
                sh += `<div class="stat-row"><span>${NPC_DB[k].emoji} ${k}</span><span style="color:${col}">${player.social[k].aff}</span></div>`;
            }
        }
        document.getElementById('social-feed').innerHTML = sh;
    },

    closeModal(id) { document.getElementById(id).classList.remove('active'); }
};