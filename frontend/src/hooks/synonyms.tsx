import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useSynonymsSearch = (
  word: string,
  options?: Omit<
    UseQueryOptions<{ synonyms: string[] }>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["synonyms", word],
    queryFn: async () => {
      const response = await fetch(`${process.env.BACKEND_URL || "http://localhost:3000"}/synonyms/${word}`);
      return response.json();
    },
    ...options,
  });
};
