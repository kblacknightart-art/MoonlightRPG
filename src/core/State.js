export let player = {
    name: "Ren",
    origin: null,
    avatar: null, // Base64 image
    lvl: 1, exp: 0, ap: 15, sp: 0,
    
    // Stats Base + Asignados
    baseStats: { STR:5, AGI:5, VIT:5, INT:5, SEN:5, LCK:5 },
    allocatedStats: { STR:0, AGI:0, VIT:0, INT:0, SEN:0, LCK:0 },
    stats: { STR:5, AGI:5, VIT:5, INT:5, SEN:5, LCK:5 }, // Calculados finales
    
    derived: { hp: 100, maxHp: 100, mp: 50, maxMp: 50 },
    mastery: { Sword:0, Dagger:0, Magic:0, Fist:0 },
    energy: 10, maxEnergy: 10, money: 10000,
    rankIdx: 0, blessing: null, rerolls: 1,
    inventory: [], equipment: { weapon:null, armor:null, acc:null },
    skills: [], social: {}, factionRep: { 'Ningguang Co.':0, 'Editorial Yae':0, 'Moonlight':10, 'Gremio':0 },
    business: { active:false, dailyIncome:0, type:null },
    time: { day: 0, min: 480 }
};

export let dungeon = { active:false, rank:0, floor:1, mobsLeft:0, boss:false };
export let combat = { active:false, enemy:null };

export const STATS = ['STR', 'AGI', 'VIT', 'INT', 'SEN', 'LCK'];
export const RANKS = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];