"use client";

import { use, useState, useEffect } from "react";
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
import { useUserClubs } from "@/app/hooks/useUserClubs";
import {
  countUserFollowing,
  countUserFollowers,
} from "@/app/services/fetchUserFollowing";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function Profile({ params }: ProfilePageProps) {
  const { id } = use(params);
  const { user } = useSupabase();
  const router = useRouter();
  const { showModal } = useModalContext();
  const isAdmin = useIsAdmin();

  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);

  const { data: profile, isLoading: profileLoading } = useUserProfile(id);
  const { data: achievements = [], isLoading: achievementsLoading } =
    useUserAchievements(id);
  const { data: titles = [], isLoading: titlesLoading } = useUserTitles(id);
  const { data: followings = [] } = useUserFollowings(user?.id);
  const {
    data: joinedClubs = [],
    isLoading: clubsLoading,
    error: clubsError,
  } = useUserClubs(id);

  const isLoading =
    achievementsLoading || titlesLoading || profileLoading || clubsLoading;

  const isFollowing = followings.some((f) => f.id === id);

  useEffect(() => {
    if (!id) return;

    const fetchCounts = async () => {
      try {
        const [following, followers] = await Promise.all([
          countUserFollowing(id),
          countUserFollowers(id),
        ]);
        setFollowingCount(following);
        setFollowerCount(followers);
      } catch (err) {
        console.error("Error fetching user counts:", err);
      }
    };

    fetchCounts();
  }, [id]);

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
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="User avatar"
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <User className="h-16 w-16 text-white" />
          )}
        </div>
        <div className="font-poppins text-white text-xs flex-1 gap-1 flex flex-col">
          <p className="text-xl font-medium">{profile.name}</p>
          <p>{profile.email}</p>
          <p>Section: {profile.section}</p>
          <p>Batch: {profile.year}</p>
          <div className="flex gap-2">
            <p>{followingCount} Following</p>
            <span>|</span>
            <p>{followerCount} Followers</p>
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
