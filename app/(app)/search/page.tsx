"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Flag, Search as SearchIcon } from "lucide-react";
import { BeatLoader } from "react-spinners";
import debounce from "lodash/debounce";
import { useSearchProfiles } from "@/app/hooks/useSearchProfiles";
import { useClubs } from "@/app/hooks/useClubs";
import { useUserClubs } from "@/app/hooks/useUserClubs";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { useModalContext } from "@/app/context/ModalContext";

export default function Search() {
  const { user, loadingUser } = useSupabase();
  const { showModal } = useModalContext();
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
  const { data: clubs = [], isLoading: clubsLoading } = useClubs();
  const { data: joinedClubs = [], isLoading: userClubsLoading } = useUserClubs(
    user?.id
  );

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

        {/* --- Display Clubs --- */}
        {!clubsLoading &&
          !userClubsLoading &&
          !loadingUser &&
          clubs.length > 0 && (
            <div className="flex flex-col gap-3 mt-4">
              <p className="font-poppins text-tertiary text-md font-semibold">
                Discover Clubs
              </p>
              <div className="club-container flex flex-col gap-3">
                {clubs.map((club) => {
                  const isJoined = joinedClubs.some(
                    (joined) => joined.club_id === club.id
                  );

                  return (
                    <div
                      key={club.id}
                      className="club-container flex justify-between items-center p-4 rounded-md shadow-lg shadow-main/20"
                    >
                      <div className="flex justify-center items-center gap-2 max-w-[70%]">
                        <div
                          className={`club-logo ${
                            isJoined ? "bg-main/40" : "bg-main"
                          }  flex items-center justify-center rounded-md p-4`}
                        >
                          <Flag className="text-white" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-white font-poppins font-medium text-sm">
                            {club.name}
                          </p>
                          <p className="text-gray-400 font-poppins text-xs line-clamp-1">
                            {club.description}
                          </p>
                        </div>
                      </div>
                      {isJoined ? (
                        <p className="font-poppins text-tertiary/50 text-xs uppercase">
                          Joined
                        </p>
                      ) : (
                        <p
                          className="font-poppins text-tertiary text-xs uppercase"
                          onClick={() =>
                            showModal("JOIN_CLUB", { clubName: club.name, club_id: club.id })
                          }
                        >
                          Join
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
