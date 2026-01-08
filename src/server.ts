import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./db/mongo.js";
import recommendRoutes from "./routes/recommend.js";

const fastify = Fastify({
  logger: {
    level: "info",
  },
});


await fastify.register(cors, {
  origin: ["https://suggestion-icdy.vercel.app"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});


await connectDB();


await fastify.register(recommendRoutes, { prefix: "/api" });


fastify.get("/", async () => {
  return { status: "API is running 🚀" };
});

fastify.get("/health", async () => {
  return { status: "ok" };
});

await fastify.listen({ port: 4000, host: "0.0.0.0" });

console.log("🚀 Server running on port 4000");
