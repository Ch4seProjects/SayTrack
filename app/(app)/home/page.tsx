"use client";

import { useUserMeta } from "@/app/hooks/useUserMeta";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { BeatLoader } from "react-spinners";
import { useLeaderboards } from "@/app/context/LeaderboardProvider";
import { useUserClubs } from "@/app/hooks/useUserClubs";
import { useUserFollowings } from "@/app/hooks/useUserFollowings";
import { useIsAdmin } from "@/app/hooks/useIsAdmin";
import { useUserPoints } from "@/app/hooks/useUserPoints";

import StudentLayout from "./StudentLayout";
import AdminLayout from "./AdminLayout";

export default function Home() {
  const { loading: leaderboardsLoading } = useLeaderboards();
  const { user, loadingUser } = useSupabase();
  const userMeta = useUserMeta(user);
  const isAdmin = useIsAdmin();

  const { data: userPoints = [], isLoading: pointsLoading } = useUserPoints(
    user?.id
  );

  const { data: userClubs = [], isLoading: clubsLoading } = useUserClubs(
    user?.id
  );

  const { data: followings = [], isLoading: followingsLoading } =
    useUserFollowings(user?.id);

  const isLoading =
    loadingUser ||
    leaderboardsLoading ||
    clubsLoading ||
    followingsLoading ||
    pointsLoading;

  if (isLoading || !userMeta)
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
      </div>
    );

  return isAdmin ? (
    <AdminLayout />
  ) : (
    <StudentLayout
      isLoading={isLoading}
      userPoints={userPoints}
      userClubs={userClubs}
      followings={followings}
    />
  );
}
