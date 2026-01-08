import mongoose from "mongoose";
const RecommendationSchema = new mongoose.Schema({
    prompt: { type: String, unique: true },
    movies: [String],
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Recommendation", RecommendationSchema);
