export const Hanako = {
    name: "Hanako",
    emoji: "👻",
    loc: "Roppongi", // District
    sub_loc: "Graveyard", // Specific Building
    job: "Ghost",
    schedule: { start: 0, end: 4 },
    topics: {
        root: { text: "Hola, soy Hanako.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
