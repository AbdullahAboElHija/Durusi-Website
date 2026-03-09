import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLessonSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/lessons", async (req, res) => {
    try {
      const { type, city, topic, search } = req.query;
      const lessons = await storage.getLessons({
        type: type as string | undefined,
        city: city as string | undefined,
        topic: topic as string | undefined,
        search: search as string | undefined,
      });
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "خطأ في تحميل الدروس" });
    }
  });

  app.get("/api/lessons/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "خطأ في تحميل الإحصائيات" });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "معرف غير صالح" });
      }
      const lesson = await storage.getLesson(id);
      if (!lesson) {
        return res.status(404).json({ message: "الدرس غير موجود" });
      }
      res.json(lesson);
    } catch (error) {
      console.error("Error fetching lesson:", error);
      res.status(500).json({ message: "خطأ في تحميل الدرس" });
    }
  });

  app.post("/api/lessons", async (req, res) => {
    try {
      const data = insertLessonSchema.parse(req.body);
      const lesson = await storage.createLesson(data);
      res.status(201).json(lesson);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "بيانات غير صالحة", errors: error.errors });
      }
      console.error("Error creating lesson:", error);
      res.status(500).json({ message: "خطأ في إضافة الدرس" });
    }
  });

  return httpServer;
}
