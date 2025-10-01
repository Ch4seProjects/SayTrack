"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { Profile } from "@/app/types/global";
import { searchService } from "@/app/services/searchService";
import { BeatLoader } from "react-spinners";
import debounce from "lodash/debounce";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (q: string) => {
        if (!q.trim()) {
          setResults([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        const profiles = await searchService(q);
        setResults(profiles);
        setLoading(false);
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(query);

    // Cancel debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-white font-poppins bg-transparent outline-none focus:ring-0 w-full placeholder:text-gray-400"
        />
      </div>

      {/* Search Results */}
      <div className="flex flex-col gap-4">
        {loading && (
          <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
        )}

        {!loading && results.length === 0 && query.trim() !== "" && (
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
