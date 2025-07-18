import z from "zod";
import { FormField } from "./ui/FormField";
import { Button } from "./ui/Button";
import { useAddSynonyms } from "../hooks/synonyms";
import { Form } from "./ui/Form";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

export const addSynonymsSchema = z.object({
  word: z
    .string()
    .trim()
    .min(1, "Word is required"),
  synonyms: z
    .string()
    .trim()
    .min(1, "Synonyms are required")
});

export const NewSynonyms = () => {
  const synonymsMutation = useAddSynonyms();
  const [message, setMessage] = useState<
    { type: "error" | "success"; text: string } | undefined
  >(undefined);

  const handleSubmit = async (
    data: z.infer<typeof addSynonymsSchema>,
    methods: UseFormReturn<{
      word: string;
      synonyms: string;
    }>
  ) => {
    const synonymsArray = data.synonyms.split(",").map((syn) => syn.trim());
    await synonymsMutation.mutateAsync(
      {
        word: data.word,
        synonyms: synonymsArray,
      },
      {
        onSuccess: (data) => {
          setMessage({
            text: `Successfully added synonyms for '${data.word}'`,
            type: "success",
          });
          methods.setValue("word", "");
          methods.setValue("synonyms", "");
        },
        onError: (err) => {
          setMessage({ text: err.message, type: "error" });
        },
      }
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 ">
      <h2 className=" text-gray-700 text-xl pb-4">
        Add New Word With Synonyms
      </h2>
      <Form
        onSubmit={handleSubmit}
        schema={addSynonymsSchema}
        formProps={{ id: "add-synonym-form" }}
        mode="onSubmit"
        reValidateMode="onSubmit"
      >
        <div className=" flex gap-4">
          <FormField name="word" placeholder="Word" setMessage={setMessage} />
          <Button
            type="submit"
            loading={synonymsMutation.isPending}
            onPress={() => setMessage(undefined)}
          >
            Add
          </Button>
        </div>
        <FormField
          name="synonyms"
          placeholder="Synonyms (example: boat, ship)"
          setMessage={setMessage}
        />
      </Form>
      {message && (
        <p className={message.type === "error" ? "text-red-500" : ""}>
          {message.text}
        </p>
      )}
    </div>
  );
};
