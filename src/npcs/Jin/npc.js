export const Jin = {
    name: "Jin",
    emoji: "⚔️",
    loc: "Shinjuku", // District
    sub_loc: "Dungeon", // Specific Building
    job: "Mercenary",
    schedule: { start: 20, end: 4 },
    topics: {
        root: { text: "Hola, soy Jin.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
