export const Yumi = {
    name: "Yumi",
    emoji: "📚",
    loc: "Akihabara", // District
    sub_loc: "Library", // Specific Building
    job: "Student",
    schedule: { start: 8, end: 16 },
    topics: {
        root: { text: "Hola, soy Yumi.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
