"use client";

import toast from "react-hot-toast";
import { getSupabaseClient } from "@/app/utils/client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import { Button as ShadcnButton } from "@/components/ui/button";
import { useUserMeta } from "@/app/hooks/useUserMeta";
import { useSupabase } from "@/app/context/SupabaseProvider";
import ProgressBar from "@/app/components/ProgressBar";
import { BeatLoader } from "react-spinners";
import ArrayDataWrapper from "@/app/components/ArrayDataWrapper";
import { User } from "lucide-react";
import { useUserAchievements } from "@/app/hooks/useUserAchievements";
import { useUserTitles } from "@/app/hooks/useUserTitles";
import { useIsAdmin } from "@/app/hooks/useIsAdmin";

export default function Profile() {
  const router = useRouter();
  const supabase = getSupabaseClient();
  const { user, loadingUser } = useSupabase();
  const userMeta = useUserMeta(user);
  const isAdmin = useIsAdmin();

  const { data: achievements = [], isLoading: achievementsLoading } =
    useUserAchievements(user?.id);
  const { data: titles = [], isLoading: titlesLoading } = useUserTitles(
    user?.id
  );

  const isLoading = achievementsLoading || titlesLoading || loadingUser;

  if (isLoading || !userMeta)
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
      </div>
    );

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged out successfully");
    router.push("/");
  };

  const renderIsStudentLayout = () => {
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
          </div>
        </div>

        {/* My Progress */}
        <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4 relative">
          <p className="font-medium font-poppins text-lg  text-tertiary">
            My Progress
          </p>
          <p className="font-medium font-poppins text-lg text-white">
            {userMeta.totalPoints.toLocaleString()} pts.
          </p>
          <ProgressBar userMeta={userMeta} />
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
        <ArrayDataWrapper
          title="My Titles"
          data={titles}
          type="titles"
          isLoading={isLoading}
        />

        {/* My Achievements */}
        <ArrayDataWrapper
          title="My Achievements"
          data={achievements}
          type="achievements"
          isLoading={isLoading}
        />

        {/* Logout button */}
        <Button label="Logout" onClick={handleLogout} className="mt-auto" />
      </div>
    );
  };

  const renderIsAdminLayout = () => {
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
            <p>
              Role: <span className="uppercase">{userMeta.type}</span>
            </p>
          </div>
        </div>

        {/* Logout button */}
        <Button label="Logout" onClick={handleLogout} className="mt-auto" />
      </div>
    );
  };

  return isAdmin ? renderIsAdminLayout() : renderIsStudentLayout();
}
