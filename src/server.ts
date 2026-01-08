import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./db/mongo";
import recommendRoutes from "./routes/recommend";

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: true });

await connectDB();
await fastify.register(recommendRoutes);

fastify.listen({ port: 4000, host: "0.0.0.0" }, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
