import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const lessons = pgTable("lessons", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  type: text("type").notNull(), // 'mosque' | 'online'
  title: text("title").notNull(),
  sheikh: text("sheikh").notNull(),
  topic: text("topic").notNull(),
  day: text("day").notNull(),
  time: text("time").notNull(),
  description: text("description"),
  whatsappContact: text("whatsapp_contact"),
  mosqueName: text("mosque_name"),
  city: text("city"),
  address: text("address"),
  platform: text("platform"),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
});

export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessons.$inferSelect;
