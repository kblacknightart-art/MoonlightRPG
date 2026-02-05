import { Elysia } from '../npcs/Elysia/npc.js';
import { Jin } from '../npcs/Jin/npc.js';
import { Sora } from '../npcs/Sora/npc.js';
import { Aiko } from '../npcs/Aiko/npc.js';
import { Renji } from '../npcs/Renji/npc.js';
import { Kaito } from '../npcs/Kaito/npc.js';
import { Yumi } from '../npcs/Yumi/npc.js';
import { Haruto } from '../npcs/Haruto/npc.js';
import { Sakura } from '../npcs/Sakura/npc.js';
import { Kenji } from '../npcs/Kenji/npc.js';
import { Nami } from '../npcs/Nami/npc.js';
import { Taro } from '../npcs/Taro/npc.js';
import { Hanako } from '../npcs/Hanako/npc.js';
import { Yuki } from '../npcs/Yuki/npc.js';
import { Hiro } from '../npcs/Hiro/npc.js';
import { Mio } from '../npcs/Mio/npc.js';
import { Shin } from '../npcs/Shin/npc.js';
import { Rina } from '../npcs/Rina/npc.js';
import { Daiki } from '../npcs/Daiki/npc.js';
import { Asuka } from '../npcs/Asuka/npc.js';

export const NPC_DB = {
    Elysia,
    Jin,
    Sora,
    Aiko,
    Renji,
    Kaito,
    Yumi,
    Haruto,
    Sakura,
    Kenji,
    Nami,
    Taro,
    Hanako,
    Yuki,
    Hiro,
    Mio,
    Shin,
    Rina,
    Daiki,
    Asuka,
    'Ningguang': { 
        name: 'Ningguang', emoji: '💎', loc: 'Ginza', sub_loc: 'Oficina Central', job: 'CEO', personality: 'Ambitious', schedule: {start:8, end:20},
        topics: {
            root: { text: "El tiempo es dinero. ¿Qué quieres?", opts: [ {t:"Negocios", n:'biz'}, {t:"Coquetear", n:'flirt'}, {t:"Regalo (Joya)", n:'gift'} ] },
            biz: { text: "Tráeme resultados, no promesas.", req:{stat:'INT', val:20}, win:{aff:5, txt:"Hmm, interesante."}, fail:{aff:-2, txt:"Aburrido."} },
            flirt: { text: "¿Crees que puedes comprarme con palabras?", req:{aff:50}, win:{aff:10, txt:"Quizás... funcione."}, fail:{aff:-5, txt:"Vuelve a la guardería."} },
            gift: { text: "Una joya... aceptable.", win:{aff:15, rep:'Ningguang Co.', val:20, txt:"Lo pondré en mi colección."} }
        }
    },
    'Yae Miko': { 
        name: 'Yae Miko', emoji: '🦊', loc: 'Shinjuku', sub_loc: 'Editorial Yae', job: 'Editora', personality: 'Tease', schedule: {start:12, end:22},
        topics: {
            root: { text: "Ara, ara~ ¿Vienes a entretenerme?", opts: [ {t:"Dar Tofu Frito", n:'tofu'}, {t:"Pedir Consejo", n:'advice'}, {t:"Invitar a salir", n:'date'} ] },
            tofu: { text: "¡Delicioso! Sabes el camino a mi corazón.", win:{aff:20, rep:'Editorial Yae', val:15, txt:"Buen chico."} },
            advice: { text: "La vida es corta, diviértete más.", win:{aff:2, txt:"..."} },
            date: { text: "¿Una cita? ¿Conmigo? ¿Crees que sobrevivirás?", req:{aff:60}, win:{aff:15, txt:"Bien, vamos."}, fail:{aff:-5, txt:"Qué tierno."} }
        }
    },
    'Shogun Raiden': {
        name: 'Shogun Raiden', emoji: '⚡', loc: 'Shinjuku', sub_loc: 'Santuario Eterno', job: 'Deidad', personality: 'Stoic', schedule: {start:0, end:24},
        topics: { root: { text: "...", opts: [{t:"Dar Dango", n:'dango'}] }, dango: { text: "...Dulce. Gracias.", win:{aff:15, txt:"(Sonríe levemente)"} } }
    },
    'Miyabi': {
        name: 'Miyabi', emoji: '❄️', loc: 'Roppongi', sub_loc: 'Dojo', job: 'Samurai', personality: 'Honor', schedule: {start:6, end:18},
        topics: { root: { text: "Mi espada está lista.", opts: [{t:"Entrenar", n:'spar'}] }, spar: { text: "¡En guardia!", win:{aff:10, txt:"Eres fuerte."} } }
    },
    'Yanagi': {
        name: 'Yanagi', emoji: '👓', loc: 'Ginza', sub_loc: 'Agencia', job: 'Agente', personality: 'Serious', schedule: {start:9, end:17},
        topics: { root: { text: "Detecto una anomalía.", opts: [{t:"Ayudar", n:'help'}] }, help: { text: "Procediendo.", win:{aff:5, txt:"Eficiente."} } }
    },
    'Citlali': {
        name: 'Citlali', emoji: '🔮', loc: 'Watatsumi', sub_loc: 'Templo Antiguo', job: 'Oracle', personality: 'Granny', schedule: {start:10, end:16},
        topics: { root: { text: "Respeta a tus mayores.", opts: [{t:"Pedir lectura", n:'read'}] }, read: { text: "Veo... caos.", win:{aff:5, txt:"Interesante futuro."} } }
    },
    'Itto': {
        name: 'Itto', emoji: '👹', loc: 'Akihabara', sub_loc: 'Callejón Trasero', job: 'Gangster', personality: 'Bro', schedule: {start:14, end:2},
        topics: { root: { text: "¡PELEA DE ESCARABAJOS!", opts: [{t:"¡SÍ!", n:'yes'}] }, yes: { text: "¡JAJAJA!", win:{aff:10, txt:"¡Eres mi bro!"} } }
    },
    'Ren (Rival)': {
        name: 'Ren (Rival)', emoji: '⚔️', loc: 'Roppongi', sub_loc: 'Bar Oscuro', job: 'Rival', personality: 'Edgy', schedule: {start:20, end:4},
        topics: { root: { text: "Hmpf.", opts: [{t:"Pelear", n:'fight'}] }, fight: { text: "Ven.", win:{aff:5, xp:100, txt:"No está mal."} } }
    },
    'Park': {
        name: 'Park', emoji: '🕶️', loc: 'Ginza', sub_loc: 'Gremio', job: 'Hunter', personality: 'Pro', schedule: {start:8, end:20},
        topics: { root: { text: "Ojos abiertos.", opts: [{t:"Ok", n:'ok'}] }, ok: { text: "Bien.", win:{aff:1, txt:"..."} } }
    },
    'Lyney': {
        name: 'Lyney', emoji: '🎩', loc: 'Roppongi', sub_loc: 'Teatro', job: 'Magician', personality: 'Showman', schedule: {start:18, end:24},
        topics: { root: { text: "¡Magia!", opts: [{t:"Aplaudir", n:'clap'}] }, clap: { text: "¡Gracias!", win:{aff:5, txt:"¡Público difícil!"} } }
    }
};
