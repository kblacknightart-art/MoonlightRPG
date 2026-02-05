export const NPC_DB = {
    'Ningguang': { 
        emoji: '💎', loc: 'Ginza', job: 'CEO', personality: 'Ambitious',
        topics: {
            root: { text: "El tiempo es dinero. ¿Qué quieres?", opts: [ {t:"Negocios", n:'biz'}, {t:"Coquetear", n:'flirt'}, {t:"Regalo (Joya)", n:'gift'} ] },
            biz: { text: "Tráeme resultados, no promesas.", req:{stat:'INT', val:20}, win:{aff:5, txt:"Hmm, interesante."}, fail:{aff:-2, txt:"Aburrido."} },
            flirt: { text: "¿Crees que puedes comprarme con palabras?", req:{aff:50}, win:{aff:10, txt:"Quizás... funcione."}, fail:{aff:-5, txt:"Vuelve a la guardería."} },
            gift: { text: "Una joya... aceptable.", win:{aff:15, rep:'Ningguang Co.', val:20, txt:"Lo pondré en mi colección."} }
        }
    },
    'Yae Miko': { 
        emoji: '🦊', loc: 'Shinjuku', job: 'Editora', personality: 'Tease',
        topics: {
            root: { text: "Ara, ara~ ¿Vienes a entretenerme?", opts: [ {t:"Dar Tofu Frito", n:'tofu'}, {t:"Pedir Consejo", n:'advice'}, {t:"Invitar a salir", n:'date'} ] },
            tofu: { text: "¡Delicioso! Sabes el camino a mi corazón.", win:{aff:20, rep:'Editorial Yae', val:15, txt:"Buen chico."} },
            advice: { text: "La vida es corta, diviértete más.", win:{aff:2, txt:"..."} },
            date: { text: "¿Una cita? ¿Conmigo? ¿Crees que sobrevivirás?", req:{aff:60}, win:{aff:15, txt:"Bien, vamos."}, fail:{aff:-5, txt:"Qué tierno."} }
        }
    },
    'Shogun Raiden': { emoji: '⚡', loc: 'Shinjuku', job: 'Deidad', personality: 'Stoic', topics: { root: { text: "...", opts: [{t:"Dar Dango", n:'dango'}] }, dango: { text: "...Dulce. Gracias.", win:{aff:15, txt:"(Sonríe levemente)"} } } },
    'Miyabi': { emoji: '❄️', loc: 'Roppongi', job: 'Samurai', personality: 'Honor', topics: { root: { text: "Mi espada está lista.", opts: [{t:"Entrenar", n:'spar'}] }, spar: { text: "¡En guardia!", win:{aff:10, txt:"Eres fuerte."} } } },
    'Yanagi': { emoji: '👓', loc: 'Ginza', job: 'Agente', personality: 'Serious', topics: { root: { text: "Detecto una anomalía.", opts: [{t:"Ayudar", n:'help'}] }, help: { text: "Procediendo.", win:{aff:5, txt:"Eficiente."} } } },
    'Citlali': { emoji: '🔮', loc: 'Watatsumi', job: 'Oracle', personality: 'Granny', topics: { root: { text: "Respeta a tus mayores.", opts: [{t:"Pedir lectura", n:'read'}] }, read: { text: "Veo... caos.", win:{aff:5, txt:"Interesante futuro."} } } },
    'Itto': { emoji: '👹', loc: 'Akihabara', job: 'Gangster', personality: 'Bro', topics: { root: { text: "¡PELEA DE ESCARABAJOS!", opts: [{t:"¡SÍ!", n:'yes'}] }, yes: { text: "¡JAJAJA!", win:{aff:10, txt:"¡Eres mi bro!"} } } },
    'Ren (Rival)': { emoji: '⚔️', loc: 'Roppongi', job: 'Rival', personality: 'Edgy', topics: { root: { text: "Hmpf.", opts: [{t:"Pelear", n:'fight'}] }, fight: { text: "Ven.", win:{aff:5, xp:100, txt:"No está mal."} } } },
    'Park': { emoji: '🕶️', loc: 'Ginza', job: 'Hunter', personality: 'Pro', topics: { root: { text: "Ojos abiertos.", opts: [{t:"Ok", n:'ok'}] }, ok: { text: "Bien.", win:{aff:1, txt:"..."} } } },
    'Lyney': { emoji: '🎩', loc: 'Roppongi', job: 'Magician', personality: 'Showman', topics: { root: { text: "¡Magia!", opts: [{t:"Aplaudir", n:'clap'}] }, clap: { text: "¡Gracias!", win:{aff:5, txt:"¡Público difícil!"} } } }
};