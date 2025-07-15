// Libraries
import * as React from "react";
import { twJoin, twMerge } from "tailwind-merge";

// Components
import * as ReactAria from "react-aria-components";
import LoadingSpinner from "../icons/LoadingSpinner";

export const AriaButton = ReactAria.Button;

export type ButtonOwnProps = {
  variant?: "solid";
  colorScheme?: "primary";
  size?: "md";
  loading?: boolean;
};

type ButtonProps = React.ComponentProps<"button"> &
  ButtonOwnProps &
  ReactAria.ButtonProps;

export const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  colorScheme = "primary",
  size = "md",
  className,
  children,
  loading,
  ...props
}) => (
  <ReactAria.Button
    {...props}
    className={twMerge(
      getButtonClassNames({
        variant,
        colorScheme,
        size,
      }),
      className
    )}
  >
    {!loading ? (
      children
    ) : (
      <LoadingSpinner className="w-6 h-6 border-white border-t-primary-500" />
    )}
  </ReactAria.Button>
);

export const getButtonClassNames = ({
  variant,
  colorScheme,
  size,
}: Pick<ButtonOwnProps, "colorScheme" | "size" | "variant">) =>
  twJoin(
    "inline-flex items-center justify-center cursor-pointer  rounded-lg  gap-2",

    // Variants and color schemes
    variant === "solid" &&
      colorScheme === "primary" &&
      "bg-primary-500 text-white hover:bg-primary-700 ",

    // Sizes
    size === "md" && "px-6 h-10"
  );
