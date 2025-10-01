"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LEADERBOARD_CATEGORIES } from "@/app/lib/constants";
import Link from "next/link";
import { User } from "lucide-react";
import { useLeaderboards } from "@/app/context/LeaderboardProvider";
import { BeatLoader } from "react-spinners";
import { LeaderboardCategory } from "@/app/types/User";

export default function Leaderboards() {
  const { filteredUsers, setCategory, category, loading } = useLeaderboards();

  const podium = [filteredUsers[1], filteredUsers[0], filteredUsers[2]];

  if (loading) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white">No users found 👀</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Content */}
      <div className="px-6 py-12 flex flex-col gap-8">
        {/* Header */}
        <p className="text-white font-poppins text-xl text-center">
          Leaderboard
        </p>

        {/* Tabs */}
        <Tabs
          value={category}
          onValueChange={(val) => setCategory(val as LeaderboardCategory)}
          className="flex justify-center items-center"
        >
          <TabsList className="h-fit gap-6 bg-main p-1">
            {LEADERBOARD_CATEGORIES.map((type) => (
              <TabsTrigger
                key={type}
                value={type}
                className="font-poppins text-md px-10 py-1 text-white
                   data-[state=active]:bg-white data-[state=active]:text-secondary"
              >
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Top 3 */}
        <div className="flex justify-between">
          {podium.map((user, index) => {
            if (!user) return null;

            const medalColors = [
              "bg-gray-400", // 2nd
              "bg-yellow-400", // 1st
              "bg-amber-800", // 3rd
            ];
            const marginTop =
              index === 1 ? "mt-0" : index === 0 ? "mt-8" : "mt-12";

            return (
              <Link
                key={user.id}
                href={`/profile/${user.id}`}
                className={`flex flex-col items-center gap-1 ${marginTop}`}
              >
                <div className="h-24 w-24 bg-white rounded-full flex justify-center items-center mb-2 relative">
                  <User className="h-16 w-16 text-main" />
                  <div
                    className={`h-6 w-6 left-0 top-0 ${medalColors[index]} rounded-full absolute`}
                  />
                </div>
                <p className="font-poppins text-sm text-white font-medium">
                  {user.name}
                </p>
                <p className="font-poppins text-xs text-white">
                  {user.section} {user.year}
                </p>
                <p className="font-poppins text-sm text-white font-medium">
                  {user.totalPoints.toLocaleString()}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="bg-gradient-to-t from-secondary to-main flex-1 rounded-tl-xl rounded-tr-xl p-6 flex flex-col gap-4 overflow-auto">
        {filteredUsers.slice(3, 10).map((user, index) => (
          <Link
            className="bg-white p-4 rounded-md flex gap-4 items-center"
            key={user.id}
            href={`/profile/${user.id}`}
          >
            <p className="font-poppins text-sm font-medium">{index + 4}</p>
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 bg-main rounded-full flex justify-center items-center">
                <User className="text-white" />
              </div>
              <div className="flex flex-col">
                <p className="font-poppins font-medium text-sm">{user.name}</p>
                <p className="font-poppins text-xs">
                  {user.section} {user.year}
                </p>
              </div>
            </div>
            <p className="font-poppins font-semibold text-xs flex-1 text-end">
              {user.totalPoints.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
