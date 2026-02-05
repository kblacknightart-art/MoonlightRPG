export const Kenji = {
    name: "Kenji",
    emoji: "🍜",
    loc: "Ginza", // District
    sub_loc: "Restaurant", // Specific Building
    job: "Chef",
    schedule: { start: 10, end: 22 },
    topics: {
        root: { text: "Hola, soy Kenji.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
