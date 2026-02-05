export const Asuka = {
    name: "Asuka",
    emoji: "🏎️",
    loc: "Akihabara", // District
    sub_loc: "Circuit", // Specific Building
    job: "Racer",
    schedule: { start: 20, end: 2 },
    topics: {
        root: { text: "Hola, soy Asuka.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
