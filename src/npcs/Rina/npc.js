export const Rina = {
    name: "Rina",
    emoji: "💉",
    loc: "Shinjuku", // District
    sub_loc: "Hospital", // Specific Building
    job: "Nurse",
    schedule: { start: 8, end: 20 },
    topics: {
        root: { text: "Hola, soy Rina.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
