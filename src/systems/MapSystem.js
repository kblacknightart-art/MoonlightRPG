import { NPC_DB } from '../data/npcs.js'; // CORREGIDO: "npcs.js"
import { TimeSystem } from './TimeSystem.js';
import { log } from '../core/Utils.js';

// Base de datos de Distritos
const DISTRICTS = [
    { name: 'Shinjuku', desc: 'Distrito de Rascacielos', color: '#a855f7' },
    { name: 'Shibuya', desc: 'Cruce del Mundo', color: '#f472b6' },
    { name: 'Akihabara', desc: 'Ciudad Eléctrica', color: '#fbbf24' },
    { name: 'Ginza', desc: 'Lujo y Poder', color: '#cbd5e1' },
    { name: 'Roppongi', desc: 'Vida Nocturna', color: '#ef4444' },
    { name: 'Watatsumi', desc: 'Isla Sagrada', color: '#38bdf8' }
];

// Base de datos de Locaciones Fijas
const STATIC_LOCATIONS = {
    'Shinjuku': [
        { type: 'dungeon', rank: 'F', name: 'Alcantarillas', desc: 'Nivel rec: 1-5' },
        { type: 'building', name: 'Estación Central', desc: 'Punto de encuentro.' }
    ],
    'Ginza': [
        { type: 'guild', name: 'Gremio de Cazadores', desc: 'Gestión de misiones.' },
        { type: 'building', name: 'Oficinas Corporativas', desc: 'Sede de Ningguang Co.' }
    ],
    'Akihabara': [
        { type: 'shop', name: 'Tienda de Piezas', desc: 'Mejoras de equipo.' },
        { type: 'dungeon', rank: 'E', name: 'Sótano Abandonado', desc: 'Nivel rec: 5-10' }
    ],
    'Shibuya': [
        { type: 'building', name: 'Callejón Comercial', desc: 'Tiendas de moda.' },
        { type: 'dungeon', rank: 'D', name: 'Metro Fantasma', desc: 'Nivel rec: 10-20' }
    ]
};

export const MapSystem = {
    render: () => {
        const stage = document.getElementById('main-stage');
        stage.innerHTML = `
            <div id="loc-header">
                <span id="loc-title" style="color:var(--secondary); font-weight:800; font-size:18px; letter-spacing:1px;">MAPA DE TOKYO</span>
                <span style="font-size:10px; color:#64748b; font-family:var(--font-mono);">SISTEMA DE NAVEGACIÓN</span>
            </div>
            <div class="map-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap:15px; padding:15px;">
                ${DISTRICTS.map(d => `
                    <div class="map-district" onclick="window.MapSystem.openDistrict('${d.name}')" 
                         style="border:1px solid ${d.color}; padding:20px; border-radius:8px; cursor:pointer; background:rgba(0,0,0,0.4); transition:0.2s; position:relative; overflow:hidden;"
                         onmouseover="this.style.backgroundColor='${d.color}22'" 
                         onmouseout="this.style.backgroundColor='rgba(0,0,0,0.4)'">
                        <div style="color:${d.color}; font-weight:bold; font-size:16px; margin-bottom:5px;">${d.name.toUpperCase()}</div>
                        <div style="font-size:11px; color:#aaa;">${d.desc}</div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    openDistrict: (name) => {
        const distData = DISTRICTS.find(d => d.name === name);
        const stage = document.getElementById('main-stage');

        // 1. Filtrar NPCs aquí
        const npcsHere = Object.values(NPC_DB).filter(npc => {
            // Verifica horarios si TimeSystem está disponible
            if (window.TimeSystem && typeof window.TimeSystem.checkSchedule === 'function') {
                return window.TimeSystem.checkSchedule(npc) === name;
            }
            // Fallback a ubicación estática
            return npc.loc === name; 
        });

        // 2. Obtener locaciones fijas
        const locsHere = STATIC_LOCATIONS[name] || [];

        const html = `
             <div id="loc-header">
                <span id="loc-title" style="color:${distData.color}; font-weight:800; font-size:18px; letter-spacing:1px;">${name.toUpperCase()}</span>
                <button onclick="window.MapSystem.render()" style="padding:6px 12px; font-size:11px; background:rgba(255,255,255,0.1); border:1px solid #555; color:#fff; cursor:pointer;">VOLVER AL MAPA</button>
            </div>
            
            <div class="loc-list" style="padding:15px; overflow-y:auto; height:calc(100% - 50px); display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                
                <div class="loc-card" onclick="window.visit('${name}')" style="grid-column: 1 / -1; border:1px dashed #555; padding:15px; cursor:pointer; text-align:center;">
                    <div style="font-weight:bold; color:#fff;">📍 Explorar Calles</div>
                    <div style="font-size:10px; color:#888;">Pasear buscando eventos aleatorios.</div>
                </div>

                ${locsHere.map(loc => {
                    let action = "";
                    let icon = "🏢";
                    let style = "border:1px solid #444;";
                    
                    if (loc.type === 'dungeon') {
                        icon = "⚔️";
                        style = "border:1px solid var(--danger); background:rgba(239, 68, 68, 0.05);";
                        // Conecta con la función global enterDungeon en main.js
                        action = `onclick="window.enterDungeon('${loc.rank}')"`;
                    } else if (loc.type === 'guild') {
                        icon = "📜";
                        style = "border:1px solid var(--gold); background:rgba(250, 204, 21, 0.05);";
                        action = `onclick="window.log('Bienvenido al Gremio. (Funcionalidad WIP)', 'm-sys')"`; 
                    } else if (loc.type === 'shop') {
                        icon = "🛒";
                        style = "border:1px solid var(--secondary);";
                        action = `onclick="window.log('Tienda cerrada por ahora.', 'm-sys')"`;
                    } else {
                        action = `onclick="window.log('Visitas ${loc.name}.', 'm-sys')"`;
                    }

                    return `
                    <div class="loc-card" ${action} style="${style} padding:15px; cursor:pointer; border-radius:6px; transition:0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                        <div style="font-weight:bold; color:#e2e8f0; margin-bottom:4px;">${icon} ${loc.name}</div>
                        <div style="font-size:10px; color:#94a3b8;">${loc.desc}</div>
                    </div>`;
                }).join('')}

                ${npcsHere.map(npc => `
                    <div class="loc-card npc-card" onclick="window.startDialogue('${npc.info ? npc.info.id : npc.name}')" 
                         style="border:1px solid var(--primary); padding:15px; cursor:pointer; background:rgba(217, 70, 239, 0.05); border-radius:6px;">
                        <div style="color:var(--primary); font-weight:bold; margin-bottom:4px;">
                            ${npc.info ? npc.info.emoji : '👤'} ${npc.info ? npc.info.name : (npc.name || 'Desconocido')}
                        </div>
                        <div style="font-size:10px; color:#aaa;">${npc.info ? npc.info.job : 'Civil'}</div>
                    </div>
                `).join('')}
            </div>
        `;

        stage.innerHTML = html;
    }
};

// Exponer al objeto global window para que el HTML pueda acceder
window.MapSystem = MapSystem;