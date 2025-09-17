import React from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SECTIONS } from "../lib/constants";
import { cn } from "@/lib/utils";

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
          className={cn(
            "bg-white w-full font-poppins text-lg p-7",
            error && "border-2 border-red-600"
          )}
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

interface SelectComponentProps {
  category: string;
  setCategory: (category: string) => void;
  entries: string[];
}

export function SelectComponent({
  category,
  setCategory,
  entries,
}: SelectComponentProps) {
  return (
    <ShadcnSelect value={category} onValueChange={setCategory}>
      <SelectTrigger className="bg-main border-none w-[100px] font-poppins text-xs text-white">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {entries.map((c) => (
          <SelectItem key={c} value={c} className="font-poppins">
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
}
