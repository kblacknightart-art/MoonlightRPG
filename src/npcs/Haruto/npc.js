export const Haruto = {
    name: "Haruto",
    emoji: "🏋️",
    loc: "Shinjuku", // District
    sub_loc: "Gym", // Specific Building
    job: "Trainer",
    schedule: { start: 6, end: 14 },
    topics: {
        root: { text: "Hola, soy Haruto.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
