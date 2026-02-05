export const Sora = {
    name: "Sora",
    emoji: "💻",
    loc: "Akihabara", // District
    sub_loc: "CyberCafe", // Specific Building
    job: "Hacker",
    schedule: { start: 10, end: 22 },
    topics: {
        root: { text: "Hola, soy Sora.", opts: [{t:"Hablar", n:'chat'}] },
        chat: { text: "Interesante charla.", win:{aff:5, txt:"Gracias."} }
    }
};
