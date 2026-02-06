// Rutas de Assets
const ASSETS = {
    bg1: 'src/assets/dungeon/Background-forest01.png',
    bg2: 'src/assets/dungeon/Background-forest02.png', // Se mueve a la izquierda
    bg3: 'src/assets/dungeon/Background-forest03.png', // Se mueve a la derecha
    ground: 'src/assets/dungeon/Tile01.png',
    playerIdle: 'src/assets/dungeon/Mage-2.gif',
    playerWalk: 'src/assets/dungeon/Mage-2-walking.gif',
    enemyIdle: 'src/assets/dungeon/Poring-walk.gif',
    enemyAtk: 'src/assets/dungeon/poring-attack.gif'
};

export const DungeonVisuals = {
    init: () => {
        const stage = document.getElementById('main-stage');
        // Inyectar HTML Estructura
        // Usamos game-log para mantener compatibilidad con Utils.log
        stage.innerHTML = `
            <div id="dungeon-container">
                <div id="dungeon-visuals">
                    <div id="layer-bg" class="parallax-layer"></div>
                    <div id="layer-mid" class="parallax-layer"></div>
                    <div id="layer-fore" class="parallax-layer"></div>
                    <div id="layer-ground" class="parallax-layer"></div>
                    
                    <img id="player-sprite" class="sprite" src="${ASSETS.playerIdle}">
                    <img id="enemy-sprite" class="sprite" src="${ASSETS.enemyIdle}">
                    
                    <div id="vfx-layer" style="position:absolute; width:100%; height:100%; z-index:20; pointer-events:none;"></div>
                </div>

                <div id="dungeon-controls">
                    <div id="game-log" style="grid-column: 1 / -1; height: 60px; overflow-y:auto; font-size:12px; color:#aaa; margin-bottom:10px; border-bottom:1px solid #333; font-family:var(--font-mono); padding:5px;">
                        <div class="msg m-sys">> Entraste a la mazmorra.</div>
                    </div>
                    <div id="combat-actions" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; width:100%;">
                    </div>
                </div>
            </div>
        `;
    },

    // Inicia la animación de caminar (3 seg)
    startWalking: () => {
        const pSprite = document.getElementById('player-sprite');
        const lMid = document.getElementById('layer-mid');
        const lFore = document.getElementById('layer-fore');
        const lGround = document.getElementById('layer-ground');
        const enemy = document.getElementById('enemy-sprite');

        // 1. Ocultar enemigo
        if(enemy) enemy.style.display = 'none';

        // 2. Cambiar GIF personaje
        if(pSprite) pSprite.src = ASSETS.playerWalk;

        // 3. Activar clases CSS de movimiento
        if(lMid) lMid.classList.add('anim-move-right'); // Fondo lejano se mueve opuesto (derecha)
        if(lFore) lFore.classList.add('anim-move-left'); // Fondo cercano se mueve rápido (izquierda)
        if(lGround) lGround.classList.add('anim-move-ground');
    },

    stopWalking: () => {
        const pSprite = document.getElementById('player-sprite');
        
        // 1. Restaurar GIF Idle
        if(pSprite) pSprite.src = ASSETS.playerIdle;

        // 2. Quitar clases
        document.querySelectorAll('.parallax-layer').forEach(el => {
            el.classList.remove('anim-move-right', 'anim-move-left', 'anim-move-ground');
        });
    },

    showEnemy: (isBoss = false) => {
        const enemy = document.getElementById('enemy-sprite');
        if(!enemy) return;
        enemy.src = ASSETS.enemyIdle; // Resetear gif
        enemy.style.display = 'block';
        
        // Animación de entrada
        enemy.style.opacity = '0';
        enemy.animate([{ opacity: 0, transform: 'translateX(50px)' }, { opacity: 1, transform: 'translateX(0)' }], { duration: 500, fill: 'forwards' });
    },

    playEnemyAttack: () => {
        const enemy = document.getElementById('enemy-sprite');
        if(!enemy) return;
        enemy.src = ASSETS.enemyAtk;
        // Restaurar a idle después de 1 seg (duración aprox del gif)
        setTimeout(() => { enemy.src = ASSETS.enemyIdle; }, 1000);
    },

    updateLog: (msg) => {
        const box = document.getElementById('game-log');
        if(box) {
            box.innerHTML += `<div>> ${msg}</div>`;
            box.scrollTop = box.scrollHeight;
        }
    },

    renderButtons: (buttons) => {
        const container = document.getElementById('combat-actions');
        if(!container) return;
        container.innerHTML = '';
        buttons.forEach(btn => {
            const b = document.createElement('button');
            b.innerText = btn.label;
            b.onclick = btn.action;
            if(btn.class) b.className = btn.class;
            container.appendChild(b);
        });
    }
};
