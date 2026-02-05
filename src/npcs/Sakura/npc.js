export const Sakura = {
    name: "Sakura",
    emoji: "🌸",
    loc: "Watatsumi", // District
    sub_loc: "Shrine", // Specific Building
    job: "Shrine Maiden",
    schedule: { start: 6, end: 18 },
    topics: {
        root: { text: "Hola, soy Sakura.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
