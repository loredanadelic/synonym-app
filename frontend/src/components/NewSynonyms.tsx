import z from "zod";
import Form from "./ui/Form";
import { FormField } from "./ui/FormField";
import { Button } from "./ui/Button";
import { useAddSynonyms } from "../hooks/synonyms";

export const addSynonymsSchema = z.object({
  word: z.string().min(1, "Word is required"),
  synonyms: z.string().min(1, "Synonyms are required"),
});

export const NewSynonyms = () => {
  const synonymsMutation = useAddSynonyms();

  const handleSubmit = (data: z.infer<typeof addSynonymsSchema>) => {
    const synonymsArray = data.synonyms.split(",").map((syn) => syn.trim());
    synonymsMutation.mutate({
      word: data.word,
      synonyms: synonymsArray,
    });
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 ">
      <h2 className=" text-gray-700 text-xl pb-4">
        Add New Word With Synonyms
      </h2>
      <Form
        onSubmit={async (data) => {
          console.log("abcd");
          handleSubmit(data);
        }}
        schema={addSynonymsSchema}
      >
        {({ onSubmit }) => (
          <>
            <div className=" flex gap-4">
              <FormField name="word" placeholder="Word" />
              <Button
                type="submit"
                onClick={onSubmit}
                loading={synonymsMutation.isPending}
              >
                Add
              </Button>
            </div>
            <FormField
              name="synonyms"
              placeholder="Synonyms (example: boat, ship)"
            />
          </>
        )}
      </Form>
    </div>
  );
};
