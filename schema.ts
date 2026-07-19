import { pgTable, text, serial, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull(),
  chapterName: text("chapter_name").notNull(),
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // Array of strings
  correctAnswer: text("correct_answer").notNull(),
});

export const insertQuestionSchema = createInsertSchema(questions);

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
