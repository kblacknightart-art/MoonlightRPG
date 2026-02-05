export const Aiko = {
    name: "Aiko",
    emoji: "🎨",
    loc: "Ginza", // District
    sub_loc: "Gallery", // Specific Building
    job: "Artist",
    schedule: { start: 9, end: 17 },
    topics: {
        root: { text: "Hola, soy Aiko.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
