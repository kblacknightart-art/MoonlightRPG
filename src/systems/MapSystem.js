import { NPC_DB } from '../data/npc.js';
import { TimeSystem } from './TimeSystem.js';
import { log } from '../core/Utils.js';

const DISTRICTS = [
    { name: 'Shinjuku', desc: 'Distrito de Rascacielos', color: '#a855f7' },
    { name: 'Shibuya', desc: 'Cruce del Mundo', color: '#f472b6' },
    { name: 'Akihabara', desc: 'Ciudad Eléctrica', color: '#fbbf24' },
    { name: 'Ginza', desc: 'Lujo y Poder', color: '#cbd5e1' },
    { name: 'Roppongi', desc: 'Vida Nocturna', color: '#ef4444' },
    { name: 'Watatsumi', desc: 'Isla Sagrada', color: '#38bdf8' }
];

export const MapSystem = {
    render: () => {
        const stage = document.getElementById('main-stage');
        stage.innerHTML = `
            <div id="loc-header">
                <span id="loc-title" style="color:var(--secondary); font-weight:800; font-size:18px; letter-spacing:1px;">MAPA DE TOKYO</span>
                <span style="font-size:10px; color:#64748b; font-family:var(--font-mono);">SISTEMA DE NAVEGACIÓN</span>
            </div>
            <div class="map-grid">
                ${DISTRICTS.map(d => `
                    <div class="map-district" onclick="window.MapSystem.openDistrict('${d.name}')" style="--d-color: ${d.color}">
                        <div class="d-name">${d.name}</div>
                        <div class="d-desc">${d.desc}</div>
                    </div>
                `).join('')}
            </div>
            <div id="district-view" style="display:none;"></div>
        `;
    },

    openDistrict: (name) => {
        const distData = DISTRICTS.find(d => d.name === name);
        const stage = document.getElementById('main-stage');

        // Find NPCs here
        const npcsHere = Object.values(NPC_DB).filter(npc => {
            if(npc.loc !== name && npc.location !== name) return false;
            return TimeSystem.checkSchedule(npc);
        });

        const html = `
             <div id="loc-header">
                <span id="loc-title" style="color:${distData.color}; font-weight:800; font-size:18px; letter-spacing:1px;">${name.toUpperCase()}</span>
                <button onclick="window.MapSystem.render()" style="padding:5px 10px; font-size:10px;">VOLVER AL MAPA</button>
            </div>
            <div class="loc-list">
                <div class="loc-card" onclick="window.visit('${name}')">
                    <div class="loc-name">📍 Explorar Distrito</div>
                    <div class="loc-desc">Pasear por las calles buscando eventos aleatorios.</div>
                </div>
                ${npcsHere.map(npc => `
                    <div class="loc-card npc-card" onclick="window.startDialogue('${npc.name}')">
                        <div class="loc-name">${npc.emoji} ${npc.sub_loc || npc.sublocation || 'Ubicación Desconocida'}</div>
                        <div class="loc-desc">NPC: ${npc.name} (${npc.job})</div>
                    </div>
                `).join('')}
            </div>
        `;

        stage.innerHTML = html;
    }
};

window.MapSystem = MapSystem;
