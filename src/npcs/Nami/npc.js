export const Nami = {
    name: "Nami",
    emoji: "🌊",
    loc: "Watatsumi", // District
    sub_loc: "Port", // Specific Building
    job: "Fisher",
    schedule: { start: 5, end: 12 },
    topics: {
        root: { text: "Hola, soy Nami.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
