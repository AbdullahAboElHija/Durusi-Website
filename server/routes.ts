import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLessonSchema } from "@shared/schema";
import { ZodError } from "zod";
import mongoose from "mongoose";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const password = req.headers["x-admin-password"] as string;
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
  }
  next();
}

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
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
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

  // Admin routes
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "كلمة المرور غير صحيحة" });
    }
  });

  app.get("/api/admin/lessons", requireAdmin, async (_req, res) => {
    try {
      const lessons = await storage.getPendingLessons();
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching pending lessons:", error);
      res.status(500).json({ message: "خطأ في تحميل الدروس" });
    }
  });

  app.get("/api/admin/stats", requireAdmin, async (_req, res) => {
    try {
      const pending = await storage.getPendingCount();
      res.json({ pending });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ message: "خطأ في تحميل الإحصائيات" });
    }
  });

  app.patch("/api/admin/lessons/:id", requireAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "معرف غير صالح" });
      }
      const { status } = req.body;
      if (status !== "approved" && status !== "rejected") {
        return res.status(400).json({ message: "الحالة غير صالحة" });
      }
      const lesson = await storage.updateLessonStatus(id, status);
      if (!lesson) {
        return res.status(404).json({ message: "الدرس غير موجود" });
      }
      res.json(lesson);
    } catch (error) {
      console.error("Error updating lesson:", error);
      res.status(500).json({ message: "خطأ في تحديث الدرس" });
    }
  });

  return httpServer;
}
