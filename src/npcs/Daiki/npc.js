export const Daiki = {
    name: "Daiki",
    emoji: "🥊",
    loc: "Shibuya", // District
    sub_loc: "Arena", // Specific Building
    job: "Fighter",
    schedule: { start: 18, end: 23 },
    topics: {
        root: { text: "Hola, soy Daiki.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
