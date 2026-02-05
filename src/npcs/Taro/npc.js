export const Taro = {
    name: "Taro",
    emoji: "🐶",
    loc: "Shibuya", // District
    sub_loc: "Park", // Specific Building
    job: "Walker",
    schedule: { start: 7, end: 10 },
    topics: {
        root: { text: "Hola, soy Taro.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
