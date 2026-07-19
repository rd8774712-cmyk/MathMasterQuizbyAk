import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed database on startup
  await storage.seedQuestions();

  app.get(api.questions.list.path, async (req, res) => {
    const questions = await storage.getAllQuestions();
    res.json(questions);
  });

  app.get(api.questions.getByChapter.path, async (req, res) => {
    const chapterId = parseInt(req.params.chapterId);
    const questions = await storage.getQuestionsByChapter(chapterId);
    res.json(questions);
  });

  return httpServer;
}
