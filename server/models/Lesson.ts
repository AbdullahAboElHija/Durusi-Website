import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["mosque", "online"] },
  title: { type: String, required: true },
  sheikh: { type: String, required: true },
  topic: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, default: null },
  whatsappContact: { type: String, default: null },
  mosqueName: { type: String, default: null },
  city: { type: String, default: null },
  address: { type: String, default: null },
  platform: { type: String, default: null },
  link: { type: String, default: null },
  mapsUrl: { type: String, default: null },
  status: { type: String, required: true, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });

export const LessonModel = mongoose.model("Lesson", lessonSchema);
