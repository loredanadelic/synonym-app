import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { postSynonyms, fetchSynonyms } from "../lib/data/synonyms";

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
      const response = await fetchSynonyms(word);
      return response;
    },
    ...options,
  });
};

export const useAddSynonyms = (
  options?: UseMutationOptions<
    { word: string; synonyms: string[] },
    Error,
    { word: string; synonyms: string[] }
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { word: string; synonyms: string[] }) => {
      const response = await postSynonyms(data.word, data.synonyms);
      return response;
    },
    mutationKey: ["addSynonyms"],
    onSuccess: async (data, ...args) => {
      await options?.onSuccess?.(data, ...args);
      await Promise.all(
        [data.word, ...data.synonyms].map((w) =>
          queryClient.refetchQueries({
            queryKey: ["synonyms", w],
          })
        )
      );
    },
    ...options,
  });
};
