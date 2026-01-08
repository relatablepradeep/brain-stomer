import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./db/mongo.js";
import recommendRoutes from "./routes/recommend.js";

const fastify = Fastify({ logger: true });

/**
 * ✅ CORS — ALLOW YOUR FRONTEND DOMAIN
 */
await fastify.register(cors, {
  origin: "https://suggestion-icdy.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

/**
 * ✅ DB
 */
await connectDB();

/**
 * ✅ API routes
 */
await fastify.register(recommendRoutes, { prefix: "/api" });

/**
 * ✅ Root routes (avoid 404 spam)
 */
fastify.get("/", async () => {
  return { status: "API is running 🚀" };
});

fastify.get("/health", async () => {
  return { status: "ok" };
});

/**
 * ✅ Start server (Render requirement)
 */
await fastify.listen({ port: 4000, host: "0.0.0.0" });

console.log("🚀 Server running on port 4000");
