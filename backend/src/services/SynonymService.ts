type SynonymMap = Map<string, Set<string>>;

class SynonymService {
  private synonymMap: SynonymMap;

  constructor() {
    this.synonymMap = new Map();
  }

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

  getSynonyms(word: string): string[] {
    if (!this.synonymMap.has(word)) {
      return [];
    }
    const set = this.synonymMap.get(word)!;
    return Array.from(set).filter((w) => w !== word);
  }
}

export default SynonymService;
