import { player } from '../core/State.js';
import { NPC_DB } from '../data/npc.js';
import { UI } from './UI.js';
import { varColor } from '../core/Utils.js';

let currNPC = null;

export const Dialogue = {
    /**
     * Inicia la interacción con un NPC.
     * @param {string} name - El ID/Nombre del NPC (ej: "Yanagi")
     */
    start(name) {
        currNPC = name;
        
        // Inicializar relación si no existe
        if (!player.social[name]) {
            player.social[name] = { aff: 0, status: 'Conocido', history: [] };
        }
        
        player.social[name].known = true;
        UI.renderSidebar(); // Actualizar la lista social en la barra lateral
        
        // Configurar el Modal Visualmente
        const modal = document.getElementById('modal-date');
        modal.classList.add('active');
        
        const npcData = NPC_DB[name];
        document.getElementById('npc-name').innerText = name;
        document.getElementById('npc-face').innerText = npcData.emoji;
        
        this.updateSocialUI();
        
        // Limpiar historial previo
        document.getElementById('chat-hist').innerHTML = ''; 
        
        // Iniciar con el tópico raíz
        this.renderTopic(npcData.topics.root);
    },

    /**
     * Renderiza un nodo de conversación (Texto + Opciones)
     * @param {object} node - El objeto del nodo actual (text, opts, etc.)
     */
    renderTopic(node) {
        const hist = document.getElementById('chat-hist');
        const optsDiv = document.getElementById('chat-opts');
        
        // 1. Aplicar efectos del nodo al entrar (si tiene)
        if (node.effect) {
            this.applySocial(node.effect);
        }

        // 2. Agregar texto al historial
        // Usamos HTML para permitir negritas o colores en el texto
        const msgDiv = document.createElement('div');
        msgDiv.style.marginBottom = "15px";
        msgDiv.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
        msgDiv.style.paddingBottom = "10px";
        msgDiv.innerHTML = `<b style="color:var(--primary)">${currNPC}:</b> ${node.text}`;
        hist.appendChild(msgDiv);
        
        // Auto-scroll al final
        hist.scrollTop = hist.scrollHeight;

        // 3. Renderizar Botones de Opción
        optsDiv.innerHTML = '';

        if (node.opts && node.opts.length > 0) {
            node.opts.forEach(opt => {
                // Verificar requisitos (Stats, Afecto, Items)
                if (opt.req) {
                    if (opt.req.stat && player.stats[opt.req.stat] < opt.req.val) return; // No cumple stat
                    if (opt.req.aff && player.social[currNPC].aff < opt.req.aff) return; // No cumple afecto
                    // Se pueden añadir más chequeos aquí (dinero, items, etc.)
                }

                const btn = document.createElement('button');
                btn.className = 'chat-btn';
                btn.innerText = `> ${opt.t}`; // 't' es el texto del botón
                
                btn.onclick = () => {
                    // Si la opción tiene un efecto inmediato (ej: dar regalo)
                    if (opt.effect) {
                        this.applySocial(opt.effect);
                    }
                    this.resolveChat(opt);
                };
                
                optsDiv.appendChild(btn);
            });
        } else {
            // Si no hay opciones, mostrar botón de Salir o Continuar si hay 'next' directo
            const btn = document.createElement('button');
            btn.className = 'chat-btn';
            
            if (node.next && node.next !== 'exit') {
                btn.innerText = "> (Continuar)";
                btn.onclick = () => this.renderTopic(NPC_DB[currNPC].topics[node.next]);
            } else {
                btn.innerText = "> (Terminar Interacción)";
                btn.onclick = () => this.close();
            }
            optsDiv.appendChild(btn);
        }
    },

    /**
     * Maneja la transición al siguiente nodo
     */
    resolveChat(opt) {
        if (opt.n === 'exit') {
            this.close();
            return;
        }

        const npcData = NPC_DB[currNPC];
        const nextNode = npcData.topics[opt.n]; // 'n' es el ID del siguiente tópico

        if (nextNode) {
            this.renderTopic(nextNode);
        } else {
            console.error(`Error: Nodo de diálogo '${opt.n}' no encontrado para ${currNPC}`);
            this.close();
        }
    },

    /**
     * Aplica cambios en Afecto, Reputación o XP
     */
    applySocial(effect) {
        const socialData = player.social[currNPC];

        // 1. Afecto
        if (effect.aff) {
            socialData.aff += effect.aff;
            // Feedback visual flotante en el modal (opcional, pero recomendado)
            // Aquí solo actualizamos las barras
        }

        // 2. Reputación de Facción
        if (effect.rep && player.factionRep[effect.rep] !== undefined) {
            player.factionRep[effect.rep] += (effect.val || 0);
        }

        // 3. Experiencia (si el diálogo da XP)
        if (effect.xp) {
            // Asumimos que existe una función global o importada para ganar XP
            // Por ahora lo dejamos directo al state si es necesario, o ignoramos.
        }

        this.updateSocialUI();
    },

    /**
     * Actualiza la barra de afecto y textos del Modal
     */
    updateSocialUI() {
        if (!currNPC || !player.social[currNPC]) return;

        const aff = player.social[currNPC].aff;
        document.getElementById('npc-val').innerText = aff;
        document.getElementById('npc-status').innerText = player.social[currNPC].status;

        // Calcular porcentaje visual (ej: rango -50 a +50 mapeado a 0% - 100%)
        // Ajusta la fórmula según tu gusto. Aquí asumo que 0 es 50%, -50 es 0%, 50 es 100%
        let pct = Math.min(100, Math.max(0, aff + 50)); 
        document.getElementById('npc-bar').style.width = pct + "%";
        
        // Color dinámico según afecto
        const bar = document.getElementById('npc-bar');
        if (aff < 0) bar.style.backgroundColor = 'var(--danger)';
        else if (aff >= 50) bar.style.backgroundColor = 'var(--gold)'; // Amor/Amistad alta
        else bar.style.backgroundColor = 'var(--primary)'; // Normal
    },

    close() {
        document.getElementById('modal-date').classList.remove('active');
        currNPC = null;
        UI.renderSidebar(); // Refrescar sidebar principal al salir
    }
};