import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./db/mongo.js";
import recommendRoutes from "./routes/recommend.js";

const fastify = Fastify({
  logger: {
    level: "info"
  }
});

await fastify.register(cors, { origin: true });

await connectDB();

// 🔥 IMPORTANT FIX
await fastify.register(recommendRoutes, { prefix: "/api" });

// Root routes (clean logs)
fastify.get("/", async () => {
  return { status: "API is running 🚀" };
});

fastify.get("/health", async () => {
  return { status: "ok" };
});

await fastify.listen({ port: 4000, host: "0.0.0.0" });

console.log("🚀 Server running on port 4000");
