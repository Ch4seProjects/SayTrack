"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Button as ShadcnButton } from "@/components/ui/button";
import { ChevronLeft, User } from "lucide-react";
import ArrayDataWrapper from "@/app/components/ArrayDataWrapper";
import { BeatLoader } from "react-spinners";
import { useUserAchievements } from "@/app/hooks/useUserAchievements";
import { useUserTitles } from "@/app/hooks/useUserTitles";
import { useUserProfile } from "@/app/hooks/useUserProfile";
import { useUserFollowings } from "@/app/hooks/useUserFollowings";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { useModalContext } from "@/app/context/ModalContext";
import { useIsAdmin } from "@/app/hooks/useIsAdmin";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function Profile({ params }: ProfilePageProps) {
  const { id } = use(params);
  const { user } = useSupabase();
  const router = useRouter();
  const { showModal } = useModalContext();
  const isAdmin = useIsAdmin();

  const { data: profile, isLoading: profileLoading } = useUserProfile(id);
  const { data: achievements = [], isLoading: achievementsLoading } =
    useUserAchievements(id);
  const { data: titles = [], isLoading: titlesLoading } = useUserTitles(id);
  const { data: followings = [] } = useUserFollowings(user?.id);

  const isLoading = achievementsLoading || titlesLoading || profileLoading;

  const isFollowing = followings.some((f) => f.id === id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <BeatLoader color="#fff" size={8} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="px-6 py-12">
        <p className="text-white">User not found</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <ChevronLeft onClick={() => router.back()} className="text-white" />
        {!isAdmin && user?.id !== id && (
          <ShadcnButton
            className="bg-main"
            onClick={() =>
              showModal("FOLLOW_ACTION", {
                userName: profile.name,
                isFollowing,
                id: id,
              })
            }
          >
            {isFollowing ? "Following" : "Follow"}
          </ShadcnButton>
        )}
      </div>

      {/* Profile Info */}
      <div className="flex gap-6">
        <div className="h-28 w-28 bg-main rounded-full flex justify-center items-center">
          <User className="h-16 w-16 text-white" />
        </div>
        <div className="font-poppins text-white text-xs flex-1 gap-1 flex flex-col">
          <p className="text-xl font-medium">{profile.name}</p>
          <p>{profile.email}</p>
          <p>Section: {profile.section}</p>
          <p>Batch: {profile.year}</p>
          {/* placeholders until you join with following/clubs */}
          <div className="flex gap-2">
            <p>0 Following</p>|<p>0 Joined Clubs</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="p-4 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-4 relative">
        <p className="font-medium font-poppins text-lg text-tertiary">
          Progress
        </p>

        <p className="font-medium font-poppins text-lg text-white">
          {profile.totalPoints.toLocaleString()} pts.
        </p>
        {/* progress bars */}
      </div>

      {/* Titles + Achievements placeholders */}
      <ArrayDataWrapper
        title="Titles"
        data={titles}
        type="titles"
        isLoading={isLoading}
      />
      <ArrayDataWrapper
        title="Achievements"
        data={achievements}
        type="achievements"
        isLoading={isLoading}
      />
    </div>
  );
}
