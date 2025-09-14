import * as React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 relative ">
      <ShadcnInput
        {...props}
        className={cn(
          "bg-white font-poppins text-lg p-7 focus:outline-none focus-visible:ring-0",
          error &&
            "border-2 border-red-600 focus-visible:ring-0 focus-visible:border-red-500"
        )}
      />
      {error && (
        <p className="text-red-600 font-poppins text-xs absolute top-[105%]">
          {error}
        </p>
      )}
    </div>
  );
}
