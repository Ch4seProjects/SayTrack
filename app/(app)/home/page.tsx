"use client";

import { Bell } from "lucide-react";
import { SelectComponent } from "@/app/components/Select";
import { useState } from "react";

const LEADERBOARD_CATEGORIES = ["Section", "Batch"];

export default function Home() {
  const [category, setCategory] = useState("Section");

  return (
    <div className=" h-full px-6 py-12 bg-secondary flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="text-white font-poppins text-xl">Home</p>
        <div className="flex justify-between items-center gap-4">
          <Bell className="text-white" fill="white" />
          <div className="w-10 h-10 bg-white rounded-full" />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-white font-poppins text-xs">Total points earned</p>
          <p className="text-white font-poppins text-7xl font-semibold">
            2,000
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SelectComponent
            category={category}
            setCategory={setCategory}
            entries={LEADERBOARD_CATEGORIES}
          />
          <p className="text-white font-poppins text-xl font-light">
            <span className="text-3xl font-semibold">13</span>th
          </p>
        </div>
      </div>
    </div>
  );
}
