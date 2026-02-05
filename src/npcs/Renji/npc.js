export const Renji = {
    name: "Renji",
    emoji: "🎸",
    loc: "Shibuya", // District
    sub_loc: "Street", // Specific Building
    job: "Musician",
    schedule: { start: 18, end: 24 },
    topics: {
        root: { text: "Hola, soy Renji.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
