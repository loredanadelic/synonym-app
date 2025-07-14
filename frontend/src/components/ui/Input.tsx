// Libraries
import * as React from "react";
import * as ReactAria from "react-aria-components";
import { twMerge } from "tailwind-merge";

type InputProps = ReactAria.InputProps;

export const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <ReactAria.Input
    {...props}
    className={twMerge(
      "h-14 w-full rounded-none border bg-white text-sm ",
      className as string
    )}
  />
);

export const TextField: React.FC<
  ReactAria.TextFieldProps & {
    isLoading?: boolean;
    inputProps?: InputProps;
  }
> = ({ isLoading, inputProps, className, ...props }) => (
  <ReactAria.TextField
    {...props}
    className={twMerge("relative", className as string)}
  >
    <Input {...inputProps} />
  </ReactAria.TextField>
);
