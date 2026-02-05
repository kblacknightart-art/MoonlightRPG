import { player, dungeon, combat, STATS, RANKS } from './core/State.js';
import { log, createFloatText, shakeScreen, varColor } from './core/Utils.js';
import { NPC_DB } from './data/npc.js';
import { SKILLS_DB } from './data/skills.js';

// DATOS DE ORIGEN PARA CREACIÓN
const ORIGINS = {
    'student': { label: 'Estudiante', money: 1000, enBonus: 5, stats: { LCK: 5, VIT: 8, AGI: 5 } },
    'uni': { label: 'Universitario', money: 2000, enBonus: 0, stats: { INT: 5, VIT: 5 } },
    'salary': { label: 'Oficinista', money: 60000, enBonus: -2, stats: { INT: 15, VIT: -5 } }
};

let currentOrigin = null;

// --- FUNCIONES GLOBALES (Window) ---

// 1. MANEJO DE AVATAR
window.handleAvatar = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            player.avatar = e.target.result;
            document.getElementById('avatar-preview').src = e.target.result;
            document.getElementById('avatar-preview').style.display = 'block';
            document.getElementById('avatar-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(input.files[0]);
    }
};

// 2. SELECCIÓN DE ORIGEN
window.selectOrigin = (key) => {
    currentOrigin = key;
    document.querySelectorAll('.origin-card').forEach(el => el.classList.remove('selected'));
    document.getElementById(`card-${key}`).classList.add('selected');
    window.renderCreationStats();
};

// 3. RENDERIZADO DE STATS EN CREACIÓN
window.renderCreationStats = () => {
    const orgStats = currentOrigin ? ORIGINS[currentOrigin].stats : {};
    let h = '';
    
    STATS.forEach(s => {
        let base = 5;
        let orgBonus = orgStats[s] || 0;
        let allocated = player.allocatedStats[s];
        let total = base + orgBonus + allocated;
        
        let colorClass = orgBonus > 0 ? 'var(--success)' : orgBonus < 0 ? 'var(--danger)' : '#666';
        let bonusText = orgBonus !== 0 ? `(Base ${base} ${orgBonus>0?'+':''} ${orgBonus})` : '';

        h += `<div class="stat-control">
            <div style="width:120px;">
                <span style="font-weight:bold; color:#fff;">${s}</span>
                <span style="font-size:10px; color:${colorClass}">${bonusText}</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <button onclick="window.modAlloc('${s}', -1)">-</button>
                <span style="width:30px; text-align:center; font-weight:bold; color:var(--secondary);">${total}</span>
                <button onclick="window.modAlloc('${s}', 1)">+</button>
            </div>
        </div>`;
    });
    
    document.getElementById('create-stats-ui').innerHTML = h;
    document.getElementById('cp-val').innerText = player.ap;
};

// 4. MODIFICAR PUNTOS
window.modAlloc = (s, v) => {
    if (v > 0 && player.ap > 0) {
        player.allocatedStats[s]++;
        player.ap--;
    } else if (v < 0 && player.allocatedStats[s] > 0) {
        player.allocatedStats[s]--;
        player.ap++;
    }
    window.renderCreationStats();
};

// 5. GACHA DE BENDICIÓN
function generateBlessing() {
    let roll = Math.floor(Math.random() * 100) + 1;
    let rank = 'F';
    if(roll == 100) rank = 'SAHN UZAL';
    else if(roll >= 95) rank = 'S';
    else if(roll >= 85) rank = 'A';
    else if(roll >= 70) rank = 'B';
    else if(roll >= 40) rank = 'C';
    else if(roll >= 20) rank = 'D';
    else rank = 'E';

    const roots = ["Dragón", "Fénix", "Lobo", "Titán", "Espectro", "Espada", "Estrella"];
    const suffix = ["Eterno", "Infernal", "Divino", "Maldito", "Rúnico", "Solar"];
    let bName = rank === 'SAHN UZAL' ? "REY DE HIERRO" : rank === 'F' ? "Sin Bendición" : `${roots[Math.floor(Math.random()*roots.length)]} ${suffix[Math.floor(Math.random()*suffix.length)]}`;
    
    let bonus = {};
    let pts = rank=='F'?0 : rank=='E'?5 : rank=='D'?10 : rank=='C'?20 : rank=='B'?30 : rank=='A'?50 : 80;
    if(rank=='SAHN UZAL') pts = 150;

    for(let i=0; i<pts; i++) {
        let s = STATS[Math.floor(Math.random()*STATS.length)];
        bonus[s] = (bonus[s] || 0) + 1;
    }

    let passive = rank=='F' ? null : { id: 'bp'+Date.now(), name: `Aura de ${bName.split(' ')[0]}`, type:'passive', stat:'VIT', val: Math.floor(pts/2), desc:"Pasiva de origen." };
    let active = rank=='F' ? null : { id: 'ba'+Date.now(), name: `Golpe ${bName.split(' ')[1] || 'Base'}`, type:'active', val: 2 + (pts/20), mp: 10 + pts, desc:"Activa de origen." };

    return { name: bName, rank: rank, stats: bonus, passive: passive, active: active };
}

window.rollBlessing = () => {
    player.blessing = generateBlessing();
    displayBlessingResult();
    
    if (player.rerolls > 0) {
        document.getElementById('btn-roll').style.display = 'none';
        document.getElementById('btn-reroll').style.display = 'block';
    } else {
        document.getElementById('btn-roll').disabled = true;
    }
    document.getElementById('btn-start').style.display = 'block';
};

window.rerollBlessing = () => {
    if (player.rerolls > 0) {
        player.rerolls--;
        player.blessing = generateBlessing();
        displayBlessingResult();
        document.getElementById('btn-reroll').innerText = "REROLL AGOTADO";
        document.getElementById('btn-reroll').disabled = true;
    }
};

function displayBlessingResult() {
    let b = player.blessing;
    let color = b.rank==='S'||b.rank==='SAHN UZAL'?'var(--danger)' : b.rank==='A'?'var(--gold)':'#fff';
    document.getElementById('bless-res').innerHTML = `<span style="color:${color}; font-size:16px;">[${b.rank}] ${b.name}</span>`;
}

// 6. FINALIZAR CREACIÓN
window.finalizeCreation = () => {
    if (!currentOrigin) { alert("Debes seleccionar un Origen."); return; }
    
    const org = ORIGINS[currentOrigin];
    player.money = org.money;
    player.maxEnergy += org.enBonus;
    player.energy = player.maxEnergy;
    
    STATS.forEach(s => {
        let base = 5;
        let orgBonus = org.stats[s] || 0;
        player.stats[s] = base + orgBonus + player.allocatedStats[s];
    });
    
    player.name = document.getElementById('inp-name').value || "Ren";
    
    if(player.blessing.passive) player.skills.push(player.blessing.passive);
    if(player.blessing.active) player.skills.push(player.blessing.active);

    if (player.avatar) {
        document.getElementById('hud-avatar').src = player.avatar;
        document.getElementById('hud-avatar').style.display = 'block';
    }
    
    // document.getElementById('hud-origin').innerText = org.label; // Si tienes este elemento en el HTML

    window.closeModal('modal-creation');
    startGame();
};

function startGame() {
    recalc();
    player.derived.hp = player.derived.maxHp;
    player.derived.mp = player.derived.maxMp;

    updateHUD();
    renderSidebar();
    log("Sistema Iniciado. Bienvenido a tu nueva vida.", "m-sys");
    window.nav('home');
}

// --- LÓGICA DEL JUEGO (CORE) ---

function recalc() {
    let s = { ...player.stats };
    if(player.blessing) {
        for(let k in player.blessing.stats) s[k] += player.blessing.stats[k];
    }
    // Sumar stats de equipo si los hubiera
    if(player.equipment.weapon) addObjStats(s, player.equipment.weapon.stats);
    if(player.equipment.armor) addObjStats(s, player.equipment.armor.stats);
    if(player.equipment.acc) addObjStats(s, player.equipment.acc.stats);

    player.totalStats = s; // Guardar stats totales
    player.derived.maxHp = Math.floor(s.VIT * 20 + s.STR * 5 + (player.lvl * 10));
    player.derived.maxMp = Math.floor(s.INT * 15 + s.SEN * 5 + (player.lvl * 5));
}

function addObjStats(target, source) {
    if(!source) return;
    for(let k in source) target[k] = (target[k]||0) + source[k];
}

// --- INTERFAZ (UI) ---

function updateHUD() {
    document.getElementById('hud-lvl').innerText = player.lvl;
    document.getElementById('hud-money').innerText = player.money.toLocaleString();
    
    let hpP = (player.derived.hp / player.derived.maxHp) * 100;
    document.getElementById('bar-hp').style.width = hpP + "%";
    document.getElementById('txt-hp').innerText = `${Math.floor(player.derived.hp)}/${player.derived.maxHp}`;
    
    let mpP = (player.derived.mp / player.derived.maxMp) * 100;
    document.getElementById('bar-mp').style.width = mpP + "%";
    document.getElementById('txt-mp').innerText = `${Math.floor(player.derived.mp)}/${player.derived.maxMp}`;
    
    document.getElementById('bar-en').style.width = (player.energy / 10 * 100) + "%";
}

function renderSidebar() {
    let h = '';
    STATS.forEach(s => {
        let base = player.stats[s];
        let bonus = (player.totalStats ? player.totalStats[s] : base) - base;
        h += `<div class="stat-row">
            <span>${s}</span> 
            <span>${base} ${bonus>0 ? `<span class="bonus-val">(+${bonus})</span>` : ''}</span>
        </div>`;
    });
    document.getElementById('stats-render').innerHTML = h;
    
    if(player.blessing) {
        let b = player.blessing;
        let color = b.rank==='S'||b.rank==='SAHN UZAL'?'var(--danger)' : b.rank==='A'?'var(--gold)':'#fff';
        document.getElementById('bless-card').innerHTML = `<div style="color:${color}; font-weight:bold;">${b.name}</div><div style="font-size:10px;">RANGO ${b.rank}</div>`;
    }
}

// --- NAVEGACIÓN Y SISTEMAS ---

window.nav = (loc) => {
    document.getElementById('action-grid').innerHTML = '';
    let title = "UBICACIÓN";
    let html = "";

    if(loc === 'home') {
        title = "APARTAMENTO";
        html = `<button class="btn-gold" style="height:100px;" onclick="window.rest()">💤 DORMIR</button>`;
    } else if(loc === 'city') {
        title = "CIUDAD";
        html = `
            <button onclick="window.visit('Ginza')">Ginza (Negocios)</button>
            <button onclick="window.visit('Akihabara')">Akihabara (Ocio)</button>
            <button onclick="window.visit('Shinjuku')">Shinjuku (Santuario)</button>
            <button onclick="window.visit('Roppongi')">Roppongi (Noche)</button>
            <button onclick="window.visit('Watatsumi')">Watatsumi (Isla)</button>
        `;
    }
    // ... Agregar Dungeon y Guild aquí si es necesario ...
    
    document.getElementById('loc-title').innerText = title;
    document.getElementById('action-grid').innerHTML = html;
};

window.rest = () => {
    player.derived.hp = player.derived.maxHp;
    player.derived.mp = player.derived.maxMp;
    player.energy = player.maxEnergy;
    log("Has descansado. Energía restaurada.", "m-sys");
    updateHUD();
};

window.visit = (zone) => {
    if(player.energy < 1) { log("Sin energía.", "m-sys"); return; }
    player.energy--; updateHUD();
    
    let targets = Object.keys(NPC_DB).filter(k => NPC_DB[k].loc === zone);
    if(targets.length > 0 && Math.random() < 0.6) {
        let npcName = targets[Math.floor(Math.random() * targets.length)];
        window.startDialogue(npcName);
    } else {
        log(`Exploras ${zone}. No encuentras a nadie importante.`, "m-sys");
    }
};

// --- DIALOGO ---
let currNPC = null;

window.startDialogue = (name) => {
    currNPC = name;
    player.social[name].known = true;
    renderSidebar(); // Actualizar lista social
    
    document.getElementById('modal-date').classList.add('active');
    document.getElementById('npc-name').innerText = name;
    document.getElementById('npc-face').innerText = NPC_DB[name].emoji;
    document.getElementById('npc-val').innerText = player.social[name].aff;
    document.getElementById('chat-hist').innerHTML = ''; 
    
    window.renderTopic(NPC_DB[name].topics.root);
};

window.renderTopic = (node) => {
    let hist = document.getElementById('chat-hist');
    hist.innerHTML += `<div style="margin-bottom:10px; color:#e2e8f0;"><b>${currNPC}:</b> ${node.text}</div>`;
    hist.scrollTop = hist.scrollHeight;

    let optsDiv = document.getElementById('chat-opts');
    optsDiv.innerHTML = '';

    if(node.opts) {
        node.opts.forEach(opt => {
            // Verificar requisitos si existen
            if(opt.req) {
                if(opt.req.stat && player.stats[opt.req.stat] < opt.req.val) return;
            }

            let b = document.createElement('button');
            b.className = 'chat-btn';
            b.innerText = `> ${opt.t}`;
            b.onclick = () => window.resolveChat(opt);
            optsDiv.appendChild(b);
        });
    } else {
        // Opción de salir si no hay opciones
        let b = document.createElement('button');
        b.className = 'chat-btn';
        b.innerText = "> (Salir)";
        b.onclick = () => window.closeModal('modal-date');
        optsDiv.appendChild(b);
    }
};

window.resolveChat = (opt) => {
    let npcData = NPC_DB[currNPC];
    let topicData = npcData.topics[opt.n];
    
    if(topicData) {
        // Lógica simple de éxito/fracaso
        let outcome = topicData; // Por defecto
        
        // Si tiene win/fail, podrías agregar lógica aleatoria o de stats aquí
        if(outcome.win) window.applySocial(outcome.win);
        
        window.renderTopic(topicData);
    } else if (opt.n === 'exit') {
        window.closeModal('modal-date');
    }
};

window.applySocial = (ef) => {
    if(ef.aff) player.social[currNPC].aff += ef.aff;
    if(ef.rep) player.factionRep[ef.rep] += ef.val;
    // Actualizar UI del modal
    document.getElementById('npc-val').innerText = player.social[currNPC].aff;
    let pct = Math.min(100, Math.max(0, player.social[currNPC].aff + 50));
    document.getElementById('npc-bar').style.width = pct + "%";
};

// --- UTILIDADES ---
window.closeModal = (id) => document.getElementById(id).classList.remove('active');
window.openLevelUp = () => document.getElementById('modal-level').classList.add('active'); // Faltaba esto
window.openInventory = () => document.getElementById('modal-inv').classList.add('active'); // Faltaba esto
// Definir funciones vacías para evitar error si no existen aún
window.openSkills = () => log("Grimorio de habilidades vacío.", "m-sys"); 

// --- INICIO ---
// Inicializar UI de creación
window.renderCreationStats();