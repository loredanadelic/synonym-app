//Libraries
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

// Components
import { TextField } from "./ui/Input";

export const SynonymSearch = () => {
  const [word, setWord] = useState<string>("");

  const handleSearch = (value: string) => {
    console.log("Call API with value:", value);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim() !== "") {
        handleSearch(value);
      }
    }, 500),
    []
  );

  const handleChange = (value: string) => {
    setWord(value);
    debouncedSearch(value);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-6">
      <h2 className="text-gray-700 text-xl pb-4">Search Synonyms</h2>
      <TextField
        name="word"
        value={word}
        onChange={handleChange}
        inputProps={{
          placeholder: "Enter a word",
          className:
            "h-10 mb-4 w-full focus:border-primary text-base border-gray-300 rounded-md p-2",
        }}
      />
    </div>
  );
};
