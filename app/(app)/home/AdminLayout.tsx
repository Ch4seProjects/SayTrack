"use client";

import {
  Bell,
  CircleUserRound,
  ShieldUser,
  Captions,
  Medal,
  Trophy,
} from "lucide-react";
import ActionTile from "@/app/components/ActionTile";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { useDashboardStats } from "@/app/hooks/useDashboardStats";
import { BeatLoader } from "react-spinners";

export default function AdminLayout() {
  const router = useRouter();
  const { user } = useSupabase();
  const {
    loading,
    error,
    sectionCounts,
    totalAdmins,
    totalUsers,
    totalClubs,
    totalTitles,
    totalAchievements,
  } = useDashboardStats();

  const renderSectionCounts = () => {
    if (loading)
      return (
        <div className="bg-main rounded-md flex flex-col gap-1 p-4 font-poppins text-white mr-2 mb-2">
          <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
        </div>
      );

    return sectionCounts.map(({ section, count }) => (
      <div
        key={section}
        className="bg-main rounded-md flex flex-col gap-1 p-4 font-poppins text-white mr-2 mb-2"
      >
        <p className="text-xs font-semibold">{section}</p>
        <p className="text-3xl font-semibold">{count}</p>
      </div>
    ));
  };

  return (
    <div className="px-6 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-white font-poppins text-xs">Welcome Admin</p>
          <p className="text-white font-bold font-poppins text-2xl">
            {user?.name}
          </p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <CircleUserRound
            className="w-7 h-7 text-white rounded-full"
            onClick={() => router.push("/profile")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-10 items-start">
        <div className="bg-gradient-to-t from-secondary to-main w-full p-6 font-poppins text-white rounded-lg">
          <p className="text-6xl font-bold">{totalUsers.toLocaleString()}</p>
          <p className="text-xs">Total number of users</p>
        </div>
        <Carousel
          autoPlay
          autoPlaySpeed={2000}
          centerMode
          containerClass="container"
          draggable
          focusOnSelect={false}
          infinite
          arrows={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          slidesToSlide={1}
          swipeable
        >
          {renderSectionCounts()}
        </Carousel>
        <div className="grid grid-cols-2 gap-4">
          <ActionTile
            stat={totalAdmins.toLocaleString()}
            title="Total number of Admins"
            icon={<ShieldUser className="text-tertiary" size={24} />}
            isLoading={loading}
          />
          <ActionTile
            stat={totalTitles.toLocaleString()}
            title="Total number of Titles"
            icon={<Captions className="text-tertiary" size={24} />}
            isLoading={loading}
          />
          <ActionTile
            stat={totalAchievements.toLocaleString()}
            title="Total number of Achievements"
            icon={<Medal className="text-tertiary" size={24} />}
            isLoading={loading}
          />
          <ActionTile
            stat={totalClubs.toLocaleString()}
            title="Total number of Clubs"
            icon={<Trophy className="text-tertiary" size={24} />}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}
