type SynonymMap = Map<string, Set<string>>;

/**
 * Service for managing synonyms.
 * Internally maintains a map of words to their synonym groups (represented as shared sets).
 */
class SynonymService {
  private synonymMap: SynonymMap;

  constructor() {
    this.synonymMap = new Map();
  }

  /**
   * Adds a new word and its synonyms to the service.
   * Also merges synonym groups if needed (transitive rule).
   * @param word - the main word
   * @param synonyms - list of synonyms for the word
   */
  addWordWithSynonyms(word: string, synonyms: string[]) {
    const allWords = [word, ...synonyms];

    const existingSets = new Set<Set<string>>();
    for (const w of allWords) {
      if (this.synonymMap.has(w)) {
        existingSets.add(this.synonymMap.get(w)!);
      }
    }

    const mergedSet = new Set<string>();
    for (const s of existingSets) {
      for (const w of s) {
        mergedSet.add(w);
      }
    }
    for (const w of allWords) {
      mergedSet.add(w);
    }

    for (const w of mergedSet) {
      this.synonymMap.set(w, mergedSet);
    }
  }

  /**
   * Retrieves all synonyms for a given word.
   * If the word does not exist, returns an empty array.
   * @param word - The word to look up.
   * @returns An array of synonyms for the word (excluding the word itself).
   */
  getSynonyms(word: string): string[] {
    if (!this.synonymMap.has(word)) {
      return [];
    }
    const set = this.synonymMap.get(word)!;
    return Array.from(set).filter((w) => w !== word);
  }
}

export default SynonymService;
