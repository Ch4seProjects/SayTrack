"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { getSupabaseClient } from "@/app/utils/client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import { SelectComponent } from "@/app/components/Select";
import { Button as ShadcnButton } from "@/components/ui/button";
import { LEADERBOARD_CATEGORIES } from "@/app/lib/constants";
import { useUserMeta } from "@/app/hooks/useUserMeta";
import { dummyUsers } from "@/app/lib/constants";
import ArrayDataWrapper from "@/app/components/ArrayDataWrapper";
import { User } from "lucide-react";
import { useSupabase } from "@/app/context/SupabaseProvider";

export default function Profile() {
  const router = useRouter();
  const supabase = getSupabaseClient();
  const [category, setCategory] = useState("SECTION");
  const { user, loadingUser } = useSupabase();

  const userMeta = useUserMeta(user);

  if (loadingUser || !userMeta) return <p>Loading...</p>;

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
        <div className="h-28 w-28 bg-main rounded-full flex justify-center items-center">
          <User className="h-16 w-16 text-white" />
        </div>
        <div className=" font-poppins text-white text-xs flex-1 gap-1 flex flex-col">
          <p className="text-xl font-medium">{userMeta.name}</p>
          <p>{userMeta.email}</p>
          <p>Section: {userMeta.section}</p>
          <p>Batch: {userMeta.year}</p>
          <div className="flex gap-2">
            {/* <p>{userMeta.following.length} Following</p>|
            <p>{userMeta.clubs.length} Joined Clubs</p> */}
          </div>
        </div>
      </div>

      {/* My Progress */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4 relative">
        <p className="font-medium font-poppins text-lg  text-tertiary">
          My Progress
        </p>
        {/* <div className="flex flex-col items-center gap-2 absolute top-4 right-4">
          <SelectComponent
            category={category}
            setCategory={setCategory}
            entries={LEADERBOARD_CATEGORIES}
            backgroundColor="bg-secondary"
          />
          <p className="text-white font-poppins text-sm font-light">
            <span className="text-lg font-semibold">13</span>th
          </p>
        </div> */}
        <p className="font-medium font-poppins text-lg text-white">
          {userMeta.totalPoints.toLocaleString()} pts.
        </p>
        <div className="progress-bar rounded-lg h-8 flex border-[1px] border-tertiary">
          <div
            className="bg-gradient-to-r from-secondary from-[0%] via-secondary via-[85%] to-main to-[100%] rounded-l-lg flex justify-center items-center"
            style={{ width: `${userMeta.characterPercent}%` }}
          >
            <p className="font-poppins text-white text-xs">
              {userMeta.characterPercent}%
            </p>
          </div>
          <div
            className="bg-main rounded-r-lg flex justify-center items-center"
            style={{ width: `${userMeta.participationPercent}%` }}
          >
            <p className="font-poppins text-white text-xs">
              {userMeta.participationPercent}%
            </p>
          </div>
        </div>
        <div className="container flex flex-col divide-y divide-white">
          <div className="flex justify-between font-poppins text-xs text-white py-2">
            <p>Character</p>
            <p>
              {userMeta.character_points.toLocaleString()} (
              {userMeta.characterPercent}%)
            </p>
          </div>
          <div className="flex justify-between font-poppins text-xs text-white py-2">
            <p>Participation</p>
            <p>
              {userMeta.participation_points.toLocaleString()} (
              {userMeta.participationPercent}%)
            </p>
          </div>
        </div>
      </div>

      {/* Titles */}
      {/* <ArrayDataWrapper
        title="My Titles"
        data={userMeta.titles}
        type="titles"
      /> */}

      {/* My Achievements */}
      {/* <ArrayDataWrapper
        title="My Achievements"
        data={userMeta.achievements}
        type="achievements"
      /> */}

      {/* Logout button */}
      <Button label="Logout" onClick={handleLogout} className="mt-auto" />
    </div>
  );
}
