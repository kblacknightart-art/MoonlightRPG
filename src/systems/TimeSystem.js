import { player } from '../core/State.js';

const DAYS = ["LUN", "MAR", "MIER", "JUE", "VIE", "SAB", "DOM"];

export const TimeSystem = {
    init: () => {
        if(!player.time) player.time = { day: 0, min: 480 }; // 8:00 AM default
        TimeSystem.updateUI();
    },

    advance: (minutes) => {
        player.time.min += minutes;
        while(player.time.min >= 1440) {
            player.time.min -= 1440;
            player.time.day = (player.time.day + 1) % 7;
        }
        TimeSystem.updateUI();
    },

    sleep: () => {
        // Advance to next day 08:00 AM
        // Or if it's early morning (e.g. 2 AM), wake up at 8 AM same day?
        // Logic: "Dormir avanza el reloj 8 horas" says the prompt.
        // Wait, prompt says: "Dormir: Avanza el reloj 8 horas y recupera HP/MP."
        // Okay, I will follow the prompt strictly.
        TimeSystem.advance(8 * 60);
    },

    getMinutes: () => player.time.min,

    getClock: () => {
        let h = Math.floor(player.time.min / 60);
        let m = player.time.min % 60;
        return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
    },

    getDay: () => DAYS[player.time.day],

    isDay: () => player.time.min >= 360 && player.time.min < 1080, // 6 AM - 6 PM (18:00)

    checkSchedule: (npc) => {
        if(!npc.schedule) return true;
        const currentHour = Math.floor(player.time.min / 60);
        const s = npc.schedule.start;
        const e = npc.schedule.end;
        if (s < e) {
            return currentHour >= s && currentHour < e;
        } else {
            return currentHour >= s || currentHour < e;
        }
    },

    updateUI: () => {
        const dayEl = document.getElementById('clock-day');
        const timeEl = document.getElementById('clock-time');
        if(dayEl) dayEl.innerText = TimeSystem.getDay();
        if(timeEl) timeEl.innerText = TimeSystem.getClock();
    }
};
