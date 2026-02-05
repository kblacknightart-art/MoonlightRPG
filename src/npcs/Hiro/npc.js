export const Hiro = {
    name: "Hiro",
    emoji: "🔧",
    loc: "Akihabara", // District
    sub_loc: "Lab", // Specific Building
    job: "Engineer",
    schedule: { start: 9, end: 18 },
    topics: {
        root: { text: "Hola, soy Hiro.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
