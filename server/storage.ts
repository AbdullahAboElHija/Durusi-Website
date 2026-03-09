import { type Lesson, type InsertLesson } from "@shared/schema";
import { LessonModel } from "./models/Lesson";

function toLesson(doc: any): Lesson {
  return {
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  } as Lesson;
}

export interface IStorage {
  getLessons(filters?: {
    type?: string;
    city?: string;
    topic?: string;
    search?: string;
  }): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  getStats(): Promise<{ lessons: number; cities: number; online: number }>;
  getPendingLessons(): Promise<Lesson[]>;
  updateLessonStatus(id: string, status: "approved" | "rejected"): Promise<Lesson | undefined>;
  getPendingCount(): Promise<number>;
}

export class MongoStorage implements IStorage {
  async getLessons(filters?: {
    type?: string;
    city?: string;
    topic?: string;
    search?: string;
  }): Promise<Lesson[]> {
    const query: Record<string, any> = { status: "approved" };

    if (filters?.type && filters.type !== "all") {
      query.type = filters.type;
    }

    if (filters?.city && filters.city !== "all") {
      query.city = filters.city;
    }

    if (filters?.topic && filters.topic !== "all") {
      query.topic = filters.topic;
    }

    if (filters?.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { sheikh: { $regex: filters.search, $options: "i" } },
      ];
    }

    const docs = await LessonModel.find(query).sort({ createdAt: -1 }).lean();
    return docs.map(toLesson);
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    try {
      const doc = await LessonModel.findOne({ _id: id, status: "approved" }).lean();
      if (!doc) return undefined;
      return toLesson(doc);
    } catch {
      return undefined;
    }
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const doc = await LessonModel.create({ ...lesson, status: "pending" });
    return toLesson(doc.toObject());
  }

  async getStats(): Promise<{ lessons: number; cities: number; online: number }> {
    const total = await LessonModel.countDocuments({ status: "approved" });
    const cities = await LessonModel.distinct("city", { city: { $ne: null }, status: "approved" });
    const online = await LessonModel.countDocuments({ type: "online", status: "approved" });
    return {
      lessons: total,
      cities: cities.length,
      online,
    };
  }

  async getPendingLessons(): Promise<Lesson[]> {
    const docs = await LessonModel.find({ status: "pending" }).sort({ createdAt: -1 }).lean();
    return docs.map(toLesson);
  }

  async updateLessonStatus(id: string, status: "approved" | "rejected"): Promise<Lesson | undefined> {
    try {
      const doc = await LessonModel.findByIdAndUpdate(id, { status }, { new: true }).lean();
      if (!doc) return undefined;
      return toLesson(doc);
    } catch {
      return undefined;
    }
  }

  async getPendingCount(): Promise<number> {
    return await LessonModel.countDocuments({ status: "pending" });
  }
}

export const storage = new MongoStorage();
