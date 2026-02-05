export const Elysia = {
    name: "Elysia",
    emoji: "🎤",
    loc: "Shibuya", // District
    sub_loc: "Studio", // Specific Building
    job: "Idol",
    schedule: { start: 13, end: 20 },
    topics: {
        root: { text: "Hola, soy Elysia.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
