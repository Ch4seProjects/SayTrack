"use client";

import { Bell, CircleUserRound, ChevronDown } from "lucide-react";
import { SelectComponent } from "@/app/components/Select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LEADERBOARD_CATEGORIES } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserMeta } from "@/app/hooks/useUserMeta";
import ArrayDataWrapper from "@/app/components/ArrayDataWrapper";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { BeatLoader } from "react-spinners";
import ProgressBar from "@/app/components/ProgressBar";
import { LeaderboardCategory } from "@/app/types/global";
import { getOrdinalSuffix } from "@/app/utils/deriveUsers";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLeaderboards } from "@/app/context/LeaderboardProvider";
import { UserPoints, UserClub, UserSummary } from "@/app/types/global";
import { useNotificationContext } from "@/app/context/NotificationContext";

interface StudentLayoutProps {
  isLoading: boolean;
  userPoints: UserPoints[];
  userClubs: UserClub[];
  followings: UserSummary[];
}

export default function StudentLayout({
  isLoading,
  userPoints,
  userClubs,
  followings,
}: StudentLayoutProps) {
  const { category, setCategory, filteredUsers, currentUserRank } =
    useLeaderboards();
  const router = useRouter();
  const { user } = useSupabase();
  const userMeta = useUserMeta(user);
  const { hasTodayNotif } = useNotificationContext();

  const [isExpanded, setIsExpanded] = useState(false);

  const joinedClubs = userClubs.filter((club) => club.status === "joined");

  return (
    <div className="px-6 py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-white font-poppins text-xl">Home</p>
        <div className="flex justify-between items-center gap-4">
          <div className="relative">
            <Bell
              className="text-white"
              fill="white"
              onClick={() => router.push("/notifications")}
            />
            <div
              className={`absolute top-[-2] right-[-2] h-3 w-3 rounded-full ${
                hasTodayNotif ? "bg-red-600" : ""
              }`}
            />
          </div>
          {userMeta?.avatar_url ? (
            <img
              src={userMeta.avatar_url}
              alt="User avatar"
              className="w-7 h-7 object-cover rounded-full"
              onClick={() => router.push("/profile")}
            />
          ) : (
            <CircleUserRound
              className="w-7 h-7 text-white rounded-full"
              onClick={() => router.push("/profile")}
            />
          )}
        </div>
      </div>

      {/* Points Earned */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-tertiary font-poppins text-xs">
            Total points earned
          </p>
          <p className="text-white font-poppins text-7xl font-semibold">
            {userMeta?.totalPoints.toLocaleString()}
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
        <div className="flex justify-between items-center">
          <p className="font-medium font-poppins text-lg mb-2 text-tertiary">
            Exp Overview
          </p>
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer
             hover:bg-gray-800 transition-colors duration-200"
          >
            <ChevronDown
              className={`text-tertiary transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col">
            <p className="font-poppins text-xs font-medium text-white">
              Character
            </p>
            <p className="font-poppins text-xs text-white">
              {userMeta?.character_points.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-poppins text-xs font-medium text-white">
              Participation
            </p>
            <p className="font-poppins text-xs text-white">
              {userMeta?.participation_points.toLocaleString()}
            </p>
          </div>
        </div>
        <ProgressBar userMeta={userMeta!} />
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="points-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden flex flex-col gap-2 relative"
            >
              <div className="flex justify-between">
                <p className="font-poppins text-xs font-medium text-white">
                  Reason
                </p>
                <p className="font-poppins text-xs font-medium text-white">
                  Points
                </p>
              </div>

              {isLoading ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <BeatLoader
                    color="#fff"
                    size={8}
                    aria-label="Loading Spinner"
                  />
                </div>
              ) : userPoints && userPoints.length > 0 ? (
                userPoints
                  .reverse()
                  .slice(0, 5)
                  .map((point, index) => (
                    <motion.div
                      key={point.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.25 }}
                      className="bg-white p-2 rounded-sm flex justify-between items-center"
                    >
                      <div className="flex flex-col w-[60%]">
                        <p className="font-poppins text-xs text-secondary font-semibold">
                          {point.reason || "No reason provided"}
                        </p>
                        <p className="font-poppins text-[8px] text-gray-500 capitalize">
                          {point.point_type} points
                        </p>
                      </div>
                      <p
                        className={`font-poppins text-xs font-medium ${
                          point.points > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {point.points > 0 ? "+" : ""}
                        {point.points}
                      </p>
                    </motion.div>
                  ))
              ) : (
                <p className="text-gray-400 font-poppins text-xs text-center mt-2">
                  No recent points yet.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
          {isLoading ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
            </div>
          ) : (
            filteredUsers.slice(0, 5).map((user) => (
              <motion.div
                key={user.id}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.1 }}
              >
                <Link
                  href={`/profile/${user.id}`}
                  className="bg-white p-2 rounded-sm flex justify-between items-center"
                >
                  <div className="flex flex-col ">
                    <p className="font-poppins text-sm font-medium text-secondary">
                      {user.name}
                    </p>
                    <p className="font-poppins text-[10px] font-light text-secondary">
                      {user.email}
                    </p>
                  </div>
                  <p className="font-poppins text-xs text-secondary">
                    {user.totalPoints.toLocaleString()}
                  </p>
                </Link>
              </motion.div>
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
        data={joinedClubs.map((club) => ({
          id: club.club_id,
          name: club.name,
          title: club.name,
        }))}
        type="clubs"
        isLoading={isLoading}
      />
    </div>
  );
}
