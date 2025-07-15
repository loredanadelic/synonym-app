const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function fetchSynonyms(word: string) {
  const response = await fetch(`${BACKEND_URL}/synonyms/${word}`);
  const synonyms: { synonyms: string[] } = await response.json();
  return synonyms;
}

export async function postSynonyms(word: string, synonyms: string[]) {
  const response = await fetch(`${BACKEND_URL}/synonyms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word, synonyms }),
  });
  const data: { message: string; data: { synonyms: string[]; word: string } } =
    await response.json();
  return data.data;
}
