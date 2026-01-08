import Recommendation from "../models/recommendation.js";
async function getMoviesFromAI(prompt) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Suggest exactly 5 movies for: ${prompt}. Return only movie names, one per line.`,
                },
            ],
        }),
    });
    const data = await res.json();
    return data.choices[0].message.content
        .split("\n")
        .map((m) => m.replace(/^\d+\.?\s*/, "").trim())
        .slice(0, 5);
}
export default async function recommendRoutes(fastify) {
    fastify.post("/recommend", async (req) => {
        const { prompt } = req.body;
        // 1️⃣ Check cache
        const cached = await Recommendation.findOne({ prompt });
        if (cached) {
            return { source: "db", movies: cached.movies };
        }
        const movies = await getMoviesFromAI(prompt);
        await Recommendation.create({ prompt, movies });
        return { source: "ai", movies };
    });
}
