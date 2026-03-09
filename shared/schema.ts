import { z } from "zod";

export const insertLessonSchema = z.object({
  type: z.enum(["mosque", "online"]),
  title: z.string().min(1),
  sheikh: z.string().min(1),
  topic: z.string().min(1),
  day: z.string().min(1),
  time: z.string().min(1),
  description: z.string().nullable().optional(),
  whatsappContact: z.string().nullable().optional(),
  mosqueName: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  platform: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
});

export type InsertLesson = z.infer<typeof insertLessonSchema>;

export interface Lesson {
  _id: string;
  type: string;
  title: string;
  sheikh: string;
  topic: string;
  day: string;
  time: string;
  description: string | null;
  whatsappContact: string | null;
  mosqueName: string | null;
  city: string | null;
  address: string | null;
  platform: string | null;
  link: string | null;
  createdAt: string;
  updatedAt: string;
}
