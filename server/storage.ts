import { type Lesson, type InsertLesson } from "@shared/schema";
import { LessonModel } from "./models/Lesson";

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
}

export class MongoStorage implements IStorage {
  async getLessons(filters?: {
    type?: string;
    city?: string;
    topic?: string;
    search?: string;
  }): Promise<Lesson[]> {
    const query: Record<string, any> = {};

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
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
      updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
    })) as Lesson[];
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    try {
      const doc = await LessonModel.findById(id).lean();
      if (!doc) return undefined;
      return {
        ...doc,
        _id: doc._id.toString(),
        createdAt: doc.createdAt?.toISOString?.() ?? new Date().toISOString(),
        updatedAt: doc.updatedAt?.toISOString?.() ?? new Date().toISOString(),
      } as Lesson;
    } catch {
      return undefined;
    }
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const doc = await LessonModel.create(lesson);
    const plain = doc.toObject();
    return {
      ...plain,
      _id: plain._id.toString(),
      createdAt: plain.createdAt?.toISOString?.() ?? new Date().toISOString(),
      updatedAt: plain.updatedAt?.toISOString?.() ?? new Date().toISOString(),
    } as Lesson;
  }

  async getStats(): Promise<{ lessons: number; cities: number; online: number }> {
    const total = await LessonModel.countDocuments();
    const cities = await LessonModel.distinct("city", { city: { $ne: null } });
    const online = await LessonModel.countDocuments({ type: "online" });
    return {
      lessons: total,
      cities: cities.length,
      online,
    };
  }
}

export const storage = new MongoStorage();
