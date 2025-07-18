const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function fetchSynonyms(word: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/synonyms/${word}`);
    const synonyms: { synonyms: string[] } = await response.json();
    return synonyms;
  } catch (err) {
    const message = (err as { message: string })?.message;
    throw new Error(message);
  }
}

export async function postSynonyms(word: string, synonyms: string[]) {
  try {
    const response = await fetch(`${BACKEND_URL}/synonyms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word, synonyms }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const data: {
      message: string;
      data: { synonyms: string[]; word: string };
    } = await response.json();
    return data.data;
  } catch (err) {
    const message = (err as { message: string })?.message;
    throw new Error(message);
  }
}
