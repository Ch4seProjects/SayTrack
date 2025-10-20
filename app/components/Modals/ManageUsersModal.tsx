"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon, User, X, Trash } from "lucide-react";
import { BeatLoader } from "react-spinners";
import debounce from "lodash/debounce";
import { useSearchProfiles } from "@/app/hooks/useSearchProfiles";
import { useModalContext } from "@/app/context/ModalContext";

export default function ManageUsersModal({ onClose }: { onClose: () => void }) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const { showModal } = useModalContext();

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
    <div className="relative py-2 flex flex-col gap-8">
      <X
        className="absolute top-2 right-3 text-tertiary text-lg cursor-pointer hover:opacity-80"
        onClick={onClose}
      />

      <div className="title flex flex-col w-[70%]">
        <p className="text-tertiary font-poppins text-2xl font-bold">
          Manage Users
        </p>
        <p className="text-white font-poppins text-xs">
          Oversee user accounts and manage their roles.
        </p>
      </div>

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
      <div className="flex flex-col gap-4 border-2 border-main rounded-lg p-2 h-80 overflow-y-auto">
        {isLoading && (
          <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
        )}

        {!isLoading && results.length === 0 && query.trim() !== "" && (
          <p className="text-gray-400 font-poppins">No users found</p>
        )}

        {results.map((user) => (
          <div
            key={user.id}
            className="relative flex gap-2 items-center p-2 hover:bg-gray-800 rounded-md transition"
          >
            <div className="w-10 h-10 bg-main rounded-full border-2 flex justify-center items-center">
              <User className="text-white" />
            </div>
            <div className="flex flex-col">
              <p className="text-white font-poppins font-medium text-sm">
                {user.name}
              </p>
              <p className="text-gray-300 font-poppins text-[10px]">
                {user.email}
              </p>
              <p className="text-gray-300 font-poppins text-[10px]">{`${user.section} ${user.year}`}</p>
            </div>
            <Trash
              className="text-red-600 absolute right-0"
              size={20}
              onClick={() =>
                showModal("DELETE_USER", {
                  userId: user.id,
                  userName: user.name,
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
