export const Shin = {
    name: "Shin",
    emoji: "🕶️",
    loc: "Roppongi", // District
    sub_loc: "Club", // Specific Building
    job: "Bouncer",
    schedule: { start: 20, end: 4 },
    topics: {
        root: { text: "Hola, soy Shin.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
