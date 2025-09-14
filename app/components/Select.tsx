import React from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SECTIONS } from "../lib/constants";

interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export function Select({ value, onChange, error, placeholder }: SelectProps) {
  return (
    <div className="w-full relative">
      <ShadcnSelect value={value} onValueChange={onChange}>
        <SelectTrigger
          className={`${
            error ? "border-2 border-red-600" : ""
          } bg-white w-full font-poppins text-lg p-7`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="font-poppins">
          {SECTIONS.map((section) => (
            <SelectItem key={section} value={section}>
              {section}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
      {error && (
        <p className="text-red-600 text-xs absolute top-[105%]">{error}</p>
      )}
    </div>
  );
}
