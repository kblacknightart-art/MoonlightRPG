import { player } from '../core/State.js';
import { log } from '../core/Utils.js';
import { UI } from './UI.js';

export const Economy = {
    buyLicense() {
        if(player.money >= 50000) {
            player.money -= 50000;
            player.business.type = 'Licencia';
            log("Licencia comprada.", "m-loot");
            UI.updateHUD();
        }
    },
    // ... otras funciones de economía ...
};