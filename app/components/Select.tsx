import React from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SECTIONS } from "../../lib/constants";
import { cn } from "@/lib/utils";
import { Club } from "../types/global";

interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  options: Club[];
  type?: "club" | "section";
}

export function Select({
  value,
  onChange,
  error,
  placeholder,
  className,
  options,
  type = "section",
}: SelectProps) {
  return (
    <div className="w-full relative">
      <ShadcnSelect value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "bg-white w-full font-poppins text-lg p-7",
            error && "border-2 border-red-600",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="font-poppins">
          {options.length > 0 ? (
            options.map((option) => (
              <SelectItem
                key={option.id}
                value={type === "club" ? option.id : option.name}
              >
                {option.name}
              </SelectItem>
            ))
          ) : (
            <div className="text-sm text-gray-400 px-3 py-2">
              No options available
            </div>
          )}
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
  backgroundColor?: string;
}

export function SelectComponent({
  category,
  setCategory,
  entries,
  backgroundColor = "bg-main",
}: SelectComponentProps) {
  return (
    <ShadcnSelect value={category} onValueChange={setCategory}>
      <SelectTrigger
        className={cn(
          "border-none w-[100px] font-poppins text-xs text-white",
          backgroundColor
        )}
      >
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
