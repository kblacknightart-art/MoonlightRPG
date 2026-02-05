export const Kaito = {
    name: "Kaito",
    emoji: "🕵️",
    loc: "Roppongi", // District
    sub_loc: "Office", // Specific Building
    job: "Detective",
    schedule: { start: 8, end: 20 },
    topics: {
        root: { text: "Hola, soy Kaito.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
