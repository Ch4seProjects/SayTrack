"use client";

import { Bell, CircleUserRound } from "lucide-react";
import { SelectComponent } from "@/app/components/Select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LEADERBOARD_CATEGORIES } from "@/app/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserMeta } from "@/app/hooks/useUserMeta";
import ArrayDataWrapper from "@/app/components/ArrayDataWrapper";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { BeatLoader } from "react-spinners";
import ProgressBar from "@/app/components/ProgressBar";
import { useLeaderboards } from "@/app/context/LeaderboardProvider";
import { LeaderboardCategory } from "@/app/types/global";
import { getOrdinalSuffix } from "@/app/utils/deriveUsers";
import { useUserClubs } from "@/app/hooks/useUserClubs";
import { useUserFollowings } from "@/app/hooks/useUserFollowings";

export default function Home() {
  const {
    category,
    setCategory,
    filteredUsers,
    currentUserRank,
    loading: leaderboardsLoading,
  } = useLeaderboards();
  const router = useRouter();
  const { user, loadingUser } = useSupabase();
  const userMeta = useUserMeta(user);

  const {
    data: joinedClubs = [],
    isLoading: clubsLoading,
    error: clubsError,
  } = useUserClubs(user?.id);

  const {
    data: followings = [],
    isLoading: followingsLoading,
    error: followingsError,
  } = useUserFollowings(user?.id);

  const isLoading =
    loadingUser || leaderboardsLoading || clubsLoading || followingsLoading;

  if (isLoading || !userMeta)
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
      </div>
    );

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
          <CircleUserRound
            className="w-7 h-7 text-white rounded-full"
            onClick={() => router.push("/profile")}
          />
        </div>
      </div>

      {/* Points Earned */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-tertiary font-poppins text-xs">
            Total points earned
          </p>
          <p className="text-white font-poppins text-7xl font-semibold">
            {userMeta.totalPoints.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SelectComponent
            category={category}
            setCategory={(val) => setCategory(val as LeaderboardCategory)}
            entries={LEADERBOARD_CATEGORIES}
          />
          <p className="text-white font-poppins text-xl font-light">
            <span className="text-3xl font-semibold">
              {getOrdinalSuffix(currentUserRank)}
            </span>
          </p>
        </div>
      </div>

      {/* Exp Overvieew */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4">
        <p className="font-medium font-poppins text-lg mb-2 text-tertiary">
          Exp Overview
        </p>
        <div className="flex gap-8">
          <div className="flex flex-col">
            <p className="font-poppins text-xs font-medium text-white">
              Character
            </p>
            <p className="font-poppins text-xs text-white">
              {userMeta.character_points.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-poppins text-xs font-medium text-white">
              Participation
            </p>
            <p className="font-poppins text-xs text-white">
              {userMeta.participation_points.toLocaleString()}
            </p>
          </div>
        </div>
        <ProgressBar userMeta={userMeta} />
      </div>

      {/* Leaderboard */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="font-medium font-poppins text-lg mb-2 text-tertiary">
            Leaderboard
          </p>
          <Tabs
            value={category}
            onValueChange={(val) => setCategory(val as LeaderboardCategory)}
          >
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
          {leaderboardsLoading ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
            </div>
          ) : (
            filteredUsers.slice(0, 5).map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.id}`}
                className="bg-white p-2 rounded-sm flex justify-between items-center"
              >
                <p className="font-poppins text-xs text-secondary">
                  {user.name}
                </p>
                <p className="font-poppins text-xs text-secondary">
                  {user.totalPoints.toLocaleString()}
                </p>
              </Link>
            ))
          )}
        </div>
        <Link
          href={"/leaderboards"}
          className="text-gray-600 text-xs font-poppins self-end"
        >
          view more
        </Link>
      </div>

      {/* People you follow */}
      <ArrayDataWrapper
        title="People you follow"
        data={followings}
        type="following"
        isLoading={isLoading}
      />

      {/* Joined clubs */}
      <ArrayDataWrapper
        title="Joined Clubs"
        data={joinedClubs}
        type="clubs"
        isLoading={isLoading}
      />
    </div>
  );
}
