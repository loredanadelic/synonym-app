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
      const response = await fetch(`http://localhost:3000/synonyms/${word}`);
      return response.json();
    },
    ...options,
  });
};
