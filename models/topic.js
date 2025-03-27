import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },  // Added subtitle
    author: { type: String },    // Added author
    price: { type: Number },     // Added price
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
