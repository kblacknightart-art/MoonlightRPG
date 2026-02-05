export const Mio = {
    name: "Mio",
    emoji: "🐱",
    loc: "Ginza", // District
    sub_loc: "Cafe", // Specific Building
    job: "Maid",
    schedule: { start: 10, end: 19 },
    topics: {
        root: { text: "Hola, soy Mio.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
