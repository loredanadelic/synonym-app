import { Router } from "express";
import SynonymService from "../services/SynonymService";
import { validateAddSynonyms, validateWordParam } from "../middleware/validators";

const router = Router();
const synonymService = new SynonymService();

router.get("/:word", validateWordParam, (req, res) => {
  const word = req.params.word;
  const synonyms = synonymService.getSynonyms(word);
  res.status(200).json({ synonyms });
});

router.post("/", validateAddSynonyms, (req, res) => {
  const { word, synonyms } = req.body;

  synonymService.addWordWithSynonyms(word, synonyms);
  res.status(200).json({ message: "Word and synonyms added successfully" });
});

export default router;
