import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const addWordSchema = z
  .object({
    word: z
      .string()
      .trim()
      .min(1, "Word must be a non-empty string")
      .transform((value) => value.toLowerCase()),
    synonyms: z
      .array(z.string().trim().min(1, "Synonym must be a non-empty string"))
      .nonempty("Synonyms array must not be empty")
      .transform((val) => val.map((syn) => syn.toLowerCase())),
  })
  .refine(({ word, synonyms }) => !synonyms.includes(word), {
    message: "Synonyms cannot contain the same word",
  });

export function validateAddSynonyms(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = addWordSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: "Invalid payload",
      message: result.error.message,
    });
  }
  req.body = result.data;
  next();
}

const wordParamSchema = z.object({
  word: z
    .string()
    .trim()
    .min(1, "Word parameter must be non-empty")
    .transform((val) => val.toLowerCase()),
});

export function validateWordParam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = wordParamSchema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({
      error: "Invalid word parameter",
      message: result.error.message,
    });
  }
  req.params = result.data;
  next();
}
