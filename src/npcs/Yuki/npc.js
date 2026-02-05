export const Yuki = {
    name: "Yuki",
    emoji: "❄️",
    loc: "Shinjuku", // District
    sub_loc: "Club", // Specific Building
    job: "Host",
    schedule: { start: 22, end: 5 },
    topics: {
        root: { text: "Hola, soy Yuki.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
