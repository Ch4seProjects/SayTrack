"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { SelectComponent } from "@/app/components/Select";
import { Button as ShadcnButton } from "@/components/ui/button";
import { ChevronLeft, User } from "lucide-react";
import { LEADERBOARD_CATEGORIES } from "@/app/lib/constants";
import ArrayDataWrapper from "@/app/components/ArrayDataWrapper";
import { fetchProfileById } from "@/app/services/profileService";
import { Profile as ProfileType } from "@/app/types/global";
import { BeatLoader } from "react-spinners";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function Profile({ params }: ProfilePageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [category, setCategory] = useState("SECTION");
  const [user, setUser] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const profile = await fetchProfileById(id);
      setUser(profile);
      setLoading(false);
    };
    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <BeatLoader color="#fff" size={8} />
      </div>
    );
  }

  if (!user) {
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
        <ShadcnButton className="bg-main">Follow</ShadcnButton>
      </div>

      {/* Profile Info */}
      <div className="flex gap-6">
        <div className="h-28 w-28 bg-main rounded-full flex justify-center items-center">
          <User className="h-16 w-16 text-white" />
        </div>
        <div className="font-poppins text-white text-xs flex-1 gap-1 flex flex-col">
          <p className="text-xl font-medium">{user.name}</p>
          <p>{user.email}</p>
          <p>Section: {user.section}</p>
          <p>Batch: {user.year}</p>
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
          {user.totalPoints.toLocaleString()} pts.
        </p>
        {/* progress bars */}
      </div>

      {/* Titles + Achievements placeholders */}
      <ArrayDataWrapper title="Titles" data={[]} type="titles" />
      <ArrayDataWrapper title="Achievements" data={[]} type="achievements" />
    </div>
  );
}
