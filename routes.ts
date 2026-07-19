import { z } from "zod";
import { insertQuestionSchema, questions } from "./schema";

export const api = {
  questions: {
    list: {
      method: "GET",
      path: "/api/questions",
      responses: {
        200: z.array(z.custom<typeof questions.$inferSelect>()),
      },
    },
    getByChapter: {
      method: "GET",
      path: "/api/questions/:chapterId",
      responses: {
        200: z.array(z.custom<typeof questions.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
