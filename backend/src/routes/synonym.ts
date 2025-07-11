import { Router } from "express";
import SynonymService from "../services/SynonymService";
import {
  validateAddSynonyms,
  validateWordParam,
} from "../middleware/validators";

const router = Router();
const synonymService = new SynonymService();

/**
 * GET /synonyms/:word
 * Returns a list of synonyms for the given word.
 * Expects: word as a URL parameter (e.g., /api/synonyms/boat)
 * Returns: 200 OK with { synonyms: string[] }
 *          400 Bad Request if validation fails
 */
router.get("/:word", validateWordParam, (req, res) => {
  const word = req.params.word;
  const synonyms = synonymService.getSynonyms(word);
  res.status(200).json({ synonyms });
});

/**
 * POST /synonyms
 * Adds a new word and its synonyms.
 * Expects: { word: string, synonyms: string[] }
 * Returns: 201 Created if successful, 400 if validation fails.
 */
router.post("/", validateAddSynonyms, (req, res) => {
  const { word, synonyms } = req.body;

  synonymService.addWordWithSynonyms(word, synonyms);
  res.status(200).json({ message: "Word and synonyms added successfully" });
});

export default router;
