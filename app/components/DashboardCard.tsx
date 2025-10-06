"use client";

import { useState } from "react";
import { Bell, ChevronsUp, Medal, Star } from "lucide-react";

export default function DashboardCard() {
  const [activeCategory, setActiveCategory] = useState<
    "notifications" | "points" | "titles" | "achievements"
  >("notifications");

  // Dummy Data
  // TODO: Implement this
  const dashboardData = {
    notifications: { total: 40, label: "Total Notifications" },
    points: { total: 320, label: "Total Points Given" },
    titles: { total: 12, label: "Total Titles Awarded" },
    achievements: { total: 25, label: "Total Achievements Awarded" },
  };

  const icons = [
    { id: "notifications", icon: Bell },
    { id: "points", icon: ChevronsUp },
    { id: "titles", icon: Star },
    { id: "achievements", icon: Medal },
  ];

  return (
    <div className="p-4 bg-gradient-to-t from-secondary to-main rounded-xl">
      <div className="flex gap-3 justify-end mb-3">
        {icons.map(({ id, icon: Icon }) => (
          <div
            key={id}
            onClick={() => setActiveCategory(id as any)}
            className={`border-[1px] rounded-full p-1 cursor-pointer transition-all ${
              activeCategory === id
                ? "border-tertiary bg-tertiary/10 scale-150"
                : "border-white"
            }`}
          >
            <Icon
              size={14}
              className={`${
                activeCategory === id ? "text-tertiary" : "text-white"
              } transition-colors`}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <p className="font-poppins text-5xl text-tertiary">
          {dashboardData[activeCategory].total}
        </p>
        <p className="font-poppins text-xs text-white">
          {dashboardData[activeCategory].label}
        </p>
      </div>
    </div>
  );
}
