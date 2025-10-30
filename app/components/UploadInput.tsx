"use client";

import { useState } from "react";
import { Plus, FileIcon } from "lucide-react";
import { Input as ShadcnInput } from "@/components/ui/input";

interface UploadInputProps {
  field: {
    value?: File | null;
    onChange: (value: File | null) => void;
  };
  error?: string;
}

export default function UploadInput({ field, error }: UploadInputProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    field.onChange(file);
    setFileName(file ? file.name : null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Hidden Shadcn Input */}
      <ShadcnInput
        id="upload_url"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Custom Label as Upload Area */}
      <label
        htmlFor="upload_url"
        className="cursor-pointer bg-white font-poppins rounded-lg w-full flex flex-col items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-400 hover:border-primary hover:bg-gray-50 transition"
      >
        {fileName ? (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-gray-700">
              <FileIcon className="text-primary" size={20} />
              <span className="text-sm font-medium truncate max-w-[200px]">
                {fileName}
              </span>
            </div>
            <p className="text-xs text-gray-500">Click to replace file</p>
          </div>
        ) : (
          <>
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="text-primary" size={24} />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-700">Upload ID</p>
              <p className="text-[10px] text-gray-500">(PNG, JPG, up to 5MB)</p>
            </div>
          </>
        )}
      </label>

      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
