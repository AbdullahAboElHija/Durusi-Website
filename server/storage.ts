import { type Lesson, type InsertLesson, lessons } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, ilike, or } from "drizzle-orm";

export interface IStorage {
  getLessons(filters?: {
    type?: string;
    city?: string;
    topic?: string;
    search?: string;
  }): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  getStats(): Promise<{ lessons: number; cities: number; online: number }>;
}

export class DatabaseStorage implements IStorage {
  async getLessons(filters?: {
    type?: string;
    city?: string;
    topic?: string;
    search?: string;
  }): Promise<Lesson[]> {
    const conditions = [];

    if (filters?.type && filters.type !== "all") {
      conditions.push(eq(lessons.type, filters.type));
    }

    if (filters?.city && filters.city !== "all") {
      conditions.push(eq(lessons.city, filters.city));
    }

    if (filters?.topic && filters.topic !== "all") {
      conditions.push(eq(lessons.topic, filters.topic));
    }

    if (filters?.search) {
      conditions.push(
        or(
          ilike(lessons.title, `%${filters.search}%`),
          ilike(lessons.sheikh, `%${filters.search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      return await db
        .select()
        .from(lessons)
        .where(and(...conditions))
        .orderBy(desc(lessons.createdAt));
    }

    return await db
      .select()
      .from(lessons)
      .orderBy(desc(lessons.createdAt));
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, id));
    return lesson;
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [created] = await db.insert(lessons).values(lesson).returning();
    return created;
  }

  async getStats(): Promise<{ lessons: number; cities: number; online: number }> {
    const allLessons = await db.select().from(lessons);
    const cities = new Set(
      allLessons.filter((l) => l.city).map((l) => l.city)
    );
    const online = allLessons.filter((l) => l.type === "online").length;
    return {
      lessons: allLessons.length,
      cities: cities.size,
      online,
    };
  }
}

export const storage = new DatabaseStorage();
