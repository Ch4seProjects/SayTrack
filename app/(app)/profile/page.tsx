"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { createBrowserSupabase } from "@/app/utils/client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import { SelectComponent } from "@/app/components/Select";
import { Button as ShadcnButton } from "@/components/ui/button";
import { LEADERBOARD_CATEGORIES } from "@/app/lib/constants";
import { useUserMeta } from "@/app/hooks/useUserMeta";
import { dummyUsers } from "@/app/lib/constants";

export default function Profile() {
  const router = useRouter();
  const supabase = createBrowserSupabase();
  const [category, setCategory] = useState("SECTION");

  const user = dummyUsers[0];
  const userMeta = useUserMeta(user);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <div className="px-6 py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-white font-poppins text-xl">Profile</p>
        <ShadcnButton className="bg-main">Edit Profile</ShadcnButton>
      </div>

      {/* Profile Information */}
      <div className="flex gap-6">
        <div className="h-28 w-28 bg-main rounded-full" />
        <div className=" font-poppins text-white text-xs flex-1 gap-1 flex flex-col">
          <p className="text-xl font-medium">{userMeta.name}</p>
          <p>{userMeta.email}</p>
          <p>Section: {userMeta.section}</p>
          <p>Batch: {userMeta.year}</p>
          <div className="flex gap-2">
            <p>{userMeta.following.length} Following</p>|
            <p>{userMeta.clubs.length} Joined Clubs</p>
          </div>
        </div>
      </div>

      {/* My Progress */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4 relative">
        <p className="font-medium font-poppins text-lg  text-white">
          My Progress
        </p>
        <div className="flex flex-col items-center gap-2 absolute top-4 right-4">
          <SelectComponent
            category={category}
            setCategory={setCategory}
            entries={LEADERBOARD_CATEGORIES}
            backgroundColor="bg-secondary"
          />
          <p className="text-white font-poppins text-sm font-light">
            <span className="text-lg font-semibold">13</span>th
          </p>
        </div>
        <p className="font-medium font-poppins text-lg text-white">
          {userMeta.totalPoints.toLocaleString()} pts.
        </p>
        <div className="progress-bar rounded-lg h-6 bg-white" />
        <div className="container flex flex-col divide-y divide-white">
          <div className="flex justify-between font-poppins text-xs text-white py-2">
            <p>Character</p>
            <p>
              {userMeta.points.character.toLocaleString()} (
              {userMeta.characterPercent}%)
            </p>
          </div>
          <div className="flex justify-between font-poppins text-xs text-white py-2">
            <p>Participation</p>
            <p>
              {userMeta.points.participation.toLocaleString()} (
              {userMeta.participationPercent}%)
            </p>
          </div>
        </div>
      </div>

      {/* Titles */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4">
        <p className="font-medium font-poppins text-lg mb-2 text-white">
          My Titles
        </p>
        <div className="flex gap-5 overflow-auto pb-4">
          {userMeta.titles.map((title, index) => (
            <div
              className="flex flex-col justify-center items-center gap-1"
              key={index}
            >
              <div className="w-10 h-10 bg-white rounded-full" />
              <p className="font-poppins text-white text-sm text-center">
                {title.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* My Achievements */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4">
        <p className="font-medium font-poppins text-lg mb-2 text-white">
          My Achievements
        </p>
        <div className="flex gap-5 overflow-auto pb-4">
          {userMeta.achievements.map((achievement, index) => (
            <div
              className="flex flex-col justify-center items-center gap-1"
              key={index}
            >
              <div className="w-10 h-10 bg-white rounded-full" />
              <p className="font-poppins text-white text-sm text-center">
                {achievement.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logout button */}
      <Button label="Logout" onClick={handleLogout} className="mt-auto" />
    </div>
  );
}
