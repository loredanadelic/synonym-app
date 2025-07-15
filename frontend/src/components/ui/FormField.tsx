// Libraries
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";

// Components
import { TextField } from "./Input";

export const FormField = ({
  placeholder,
  name,
}: {
  placeholder: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
}) => {
  const { field, fieldState } = useController({ name });
  const { trigger } = useFormContext();

  return (
    <div className="flex flex-col w-full">
      <TextField
        inputProps={{
          className:
            "h-10 mb-4 w-full focus:border-primary  text-base border-gray-300 rounded-md p-2",
          placeholder: placeholder,
        }}
        onChange={(text) => {
          field.onChange(text);
          if (fieldState.invalid) {
            trigger(name);
          }
        }}
        value={field.value}
      />
    </div>
  );
};
