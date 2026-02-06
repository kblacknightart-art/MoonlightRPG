export const DungeonVisuals = {
    init: () => {
        const grid = document.getElementById('action-grid');
        grid.innerHTML = `
            <div id="dungeon-view" style="height:200px; background:#111; display:flex; justify-content:center; align-items:center; color:#555; border: 1px solid #333; margin-bottom: 10px;">
                <div id="enemy-sprite" style="display:none; font-size:40px;">👾</div>
                <div id="walking-anim" style="display:none;">🚶...</div>
            </div>
            <div id="combat-controls" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;"></div>
        `;
    },

    renderButtons: (buttons) => {
        const controls = document.getElementById('combat-controls');
        if(!controls) return;
        controls.innerHTML = '';
        buttons.forEach(btn => {
            const b = document.createElement('button');
            b.className = btn.class || 'btn-secondary'; // Default class
            b.innerText = btn.label;
            b.onclick = btn.action;
            // Estilo básico si no hay clase definida en CSS
            if(!btn.class) b.style.padding = "10px";
            controls.appendChild(b);
        });
    },

    updateLog: (msg) => {
        const log = document.getElementById('game-log');
        const entry = document.createElement('div');
        entry.className = 'msg';
        entry.innerHTML = `> ${msg}`;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    },

    startWalking: () => {
        const anim = document.getElementById('walking-anim');
        if(anim) anim.style.display = 'block';
    },

    stopWalking: () => {
        const anim = document.getElementById('walking-anim');
        if(anim) anim.style.display = 'none';
    },

    showEnemy: () => {
        const sprite = document.getElementById('enemy-sprite');
        if(sprite) sprite.style.display = 'block';
    },

    playEnemyAttack: () => {
        const sprite = document.getElementById('enemy-sprite');
        if(sprite) {
            sprite.style.transition = "transform 0.1s";
            sprite.style.transform = 'scale(1.5)';
            setTimeout(() => sprite.style.transform = 'scale(1)', 100);
        }
    }
};
