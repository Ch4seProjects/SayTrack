"use client";

import { Bell } from "lucide-react";
import { SelectComponent } from "@/app/components/Select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { LEADERBOARD_CATEGORIES, dummyUsers } from "@/app/lib/constants";
import { rankUsers } from "@/app/utils/deriveUsers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserMeta } from "@/app/hooks/useUserMeta";

export default function Home() {
  const [category, setCategory] = useState("SECTION");
  const router = useRouter();
  const rankedUsers = rankUsers(dummyUsers);
  const user = dummyUsers[0];
  const userMeta = useUserMeta(user);

  return (
    <div className="px-6 py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-white font-poppins text-xl">Home</p>
        <div className="flex justify-between items-center gap-4">
          <Bell
            className="text-white"
            fill="white"
            onClick={() => router.push("/notifications")}
          />
          <div
            className="w-10 h-10 bg-white rounded-full"
            onClick={() => router.push("/profile")}
          />
        </div>
      </div>

      {/* Points Earned */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-white font-poppins text-xs">Total points earned</p>
          <p className="text-white font-poppins text-7xl font-semibold">
            {userMeta.totalPoints.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SelectComponent
            category={category}
            setCategory={setCategory}
            entries={LEADERBOARD_CATEGORIES}
          />
          <p className="text-white font-poppins text-xl font-light">
            <span className="text-3xl font-semibold">13</span>th
          </p>
        </div>
      </div>

      {/* Exp Overvieew */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4">
        <p className="font-medium font-poppins text-lg mb-2 text-white">
          Exp Overview
        </p>
        <div className="flex gap-8">
          <div className="flex flex-col">
            <p className="font-poppins text-xs font-medium text-white">
              Character
            </p>
            <p className="font-poppins text-xs text-white">
              {userMeta.points.character.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-poppins text-xs font-medium text-white">
              Participation
            </p>
            <p className="font-poppins text-xs text-white">
              {userMeta.points.participation.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="progress-bar rounded-lg h-6 bg-white" />
      </div>

      {/* Leaderboard */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="font-medium font-poppins text-lg mb-2 text-white">
            Leaderboard
          </p>
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList className="h-fit gap-6 bg-white">
              {LEADERBOARD_CATEGORIES.map((type) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  className="font-poppins text-xs text-gray-600
                   data-[state=active]:bg-main data-[state=active]:text-white"
                >
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-poppins text-xs font-medium text-white">Name</p>
            <p className="font-poppins text-xs font-medium text-white">
              Points
            </p>
          </div>
          {rankedUsers.slice(0, 5).map((user, index) => (
            <Link
              key={index}
              href={`/profile/${user.username}`}
              className="bg-white p-2 rounded-sm flex justify-between items-center"
            >
              <p className="font-poppins text-xs text-secondary">{user.name}</p>
              <p className="font-poppins text-xs text-secondary">
                {user.totalPoints.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href={"/leaderboards"}
          className="text-gray-600 text-xs font-poppins self-end"
        >
          view more
        </Link>
      </div>

      {/* People you follow */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4">
        <p className="font-medium font-poppins text-lg mb-2 text-white">
          People you follow
        </p>
        <div className="flex gap-5 overflow-auto pb-4">
          {userMeta.following.map((user, index) => (
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col justify-center items-center gap-1"
              key={index}
            >
              <div className="w-10 h-10 bg-white rounded-full" />
              <p className="font-poppins text-white text-sm text-center">
                {user.username}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Joined clubs */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4">
        <p className="font-medium font-poppins text-lg mb-2 text-white">
          Joined Clubs
        </p>
        <div className="flex gap-5 overflow-auto pb-4">
          {userMeta.clubs.map((club, index) => (
            <div
              className="flex flex-col justify-center items-center gap-1"
              key={index}
            >
              <div className="w-10 h-10 bg-white rounded-full" />
              <p className="font-poppins text-white text-sm text-center">
                {club.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
