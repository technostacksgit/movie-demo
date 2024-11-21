import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  isInputvalid?: boolean | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isInputvalid = null, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-[45px] px-3 py-2  border border-input rounded-lg bg-input text-primary-foreground text-sm placeholder:text-primary-foreground placeholder:text-sm placeholder:pl-4 placeholder:font-normal  focus:placeholder-transparent focus:border-input focus:outline-none caret-white ${
            isInputvalid === null
              ? ""
              : !isInputvalid
              ? "caret-error border-error focus:border-error"
              : ""
          }`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
