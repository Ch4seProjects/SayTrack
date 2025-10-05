"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { BeatLoader } from "react-spinners";
import debounce from "lodash/debounce";
import { useSearchProfiles } from "@/app/hooks/useSearchProfiles";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
      }, 500),
    []
  );

  const { data: results = [], isLoading } = useSearchProfiles(query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetQuery(value);
  };

  return (
    <div className="px-6 py-12 flex flex-col gap-4">
      {/* Header */}
      <p className="text-white font-poppins text-xl">Search</p>

      {/* Search Bar */}
      <div className="bg-main h-12 rounded-sm flex items-center gap-4 p-4">
        <SearchIcon className="text-white" />
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
          className="text-white font-poppins bg-transparent outline-none focus:ring-0 w-full placeholder:text-gray-400"
        />
      </div>

      {/* Search Results */}
      <div className="flex flex-col gap-4">
        {isLoading && (
          <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
        )}

        {!isLoading && results.length === 0 && query.trim() !== "" && (
          <p className="text-gray-400 font-poppins">No users found</p>
        )}

        {results.map((user) => (
          <Link
            href={`/profile/${user.id}`}
            key={user.id}
            className="flex gap-2 items-center p-2 hover:bg-gray-800 rounded-md transition"
          >
            <div className="h-10 w-10 bg-white rounded-full" />
            <div className="flex flex-col">
              <p className="text-white font-poppins font-medium text-sm">
                {user.name}
              </p>
              <p className="text-white font-poppins text-xs">{`${user.section} ${user.year}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
