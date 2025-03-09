import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }, // Store image URL
  youtubeLink: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const contents = mongoose.model('Content', ContentSchema );

export default contents;