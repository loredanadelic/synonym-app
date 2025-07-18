// Libraries
import { useController, useFormContext } from "react-hook-form";

// Components
import { TextField } from "./Input";
import { Dispatch, SetStateAction } from "react";

export const FormField = ({
  placeholder,
  name,
  setMessage,
}: {
  placeholder: string;
  name: string;
  setMessage?: Dispatch<
    SetStateAction<{ type: "error" | "success"; text: string } | undefined>
  >;
}) => {
  const { field, fieldState } = useController({ name });
  const { trigger } = useFormContext();

  return (
    <div className="flex flex-col w-full mb-4">
      <TextField
        aria-label="Form Field"
        inputProps={{
          className:
            "h-10 w-full focus:border-primary  text-base border-gray-300 rounded-md p-2",
          placeholder: placeholder,
        }}
        onChange={(text) => {
          if (setMessage) {
            setMessage(undefined);
          }
          field.onChange(text);

          if (fieldState.invalid) {
            trigger(name);
          }
        }}
        value={field.value ?? ""}
      />
      {fieldState.error && (
        <p className="text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};
