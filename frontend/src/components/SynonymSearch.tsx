//Libraries
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

// Components
import { TextField } from "./ui/Input";
import { useSynonymsSearch } from "../hooks/synonyms";
import LoadingSpinner from "./icons/LoadingSpinner";

export const SynonymSearch = () => {
  const [word, setWord] = useState<string>("");

  const { data, isLoading, error, isError } = useSynonymsSearch(word, {
    enabled: word.trim() !== "",
  });

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setWord(value.trim().toLowerCase());
    }, 500),
    []
  );

  const handleChange = (value: string) => {
    debouncedSearch(value);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-6">
      <h2 className="text-gray-700 text-xl pb-4">Search Synonyms</h2>
      <TextField
        aria-label="Synonym Search"
        name="word"
        onChange={handleChange}
        inputProps={{
          placeholder: "Enter a word",
          className:
            "h-10 mb-4 w-full focus:border-primary text-base border-gray-300 rounded-md p-2",
        }}
      />
      {isError ? (
        <p>{error.message}</p>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : data && data.synonyms.length > 0 && !isLoading ? (
        <div className="mt-4">
          <h3 className="text-gray-700 text-lg">Synonyms:</h3>
          <ul className="list-disc pl-5">
            {data.synonyms.map((synonym, index) => (
              <li key={index} className="text-gray-600">
                {synonym}
              </li>
            ))}
          </ul>
        </div>
      ) : data?.synonyms.length === 0 ? (
        <div className="mt-4">
          <h3 className="text-gray-700 text-lg">No Synonyms Found</h3>
        </div>
      ) : null}
    </div>
  );
};
