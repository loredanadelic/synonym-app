import z from "zod";
import Form from "./ui/Form";
import { FormField } from "./ui/FormField";
import { Button } from "./ui/Button";

export const addSynonymsSchema = z.object({
  word: z.string().min(1, "Word is required"),
  synonyms: z.string().min(1, "Synonyms are required"),
});

export const NewSynonyms = () => {
  const handleSubmit = async (data: z.infer<typeof addSynonymsSchema>) => {
    console.log("Submitted word:", data.word);
    console.log("Submitted synonyms:", data.synonyms);
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
            <FormField name="word" placeholder="Enter a word" />
            <div className=" flex gap-4">
              <FormField name="synonyms" placeholder="Enter synonyms" />
              <Button type="submit" onClick={onSubmit}>
                Add
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
