export function log(msg, cls) {
    let d = document.getElementById('game-log');
    d.innerHTML += `<div class="msg ${cls}">> ${msg}</div>`;
    d.scrollTop = d.scrollHeight;
}

export function varColor(name) { return getComputedStyle(document.documentElement).getPropertyValue('--'+name); }

export function shakeScreen() {
    document.body.classList.add('shake-anim');
    setTimeout(() => document.body.classList.remove('shake-anim'), 500);
}

export function createFloatText(text, color) {
    let div = document.createElement('div');
    div.className = 'dmg-popup';
    div.innerText = text;
    div.style.color = color;
    div.style.left = (window.innerWidth/2 + (Math.random()*100 - 50)) + 'px';
    div.style.top = (window.innerHeight/2 - 100) + 'px';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1000);
}