//Libraries
import React from "react";
import { twMerge } from "tailwind-merge";

const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={twMerge(
          "w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin",
          className
        )}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
