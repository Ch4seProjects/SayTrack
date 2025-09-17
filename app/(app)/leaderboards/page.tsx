"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const LEADERBOARD_CATEGORIES = ["Section", "Batch"];

export default function Leaderboards() {
  const [category, setCategory] = useState("Section");

  return (
    <div className="flex flex-col h-full">
      {/* Content */}
      <div className="px-6 py-12 flex flex-col gap-8">
        {/* Header */}
        <p className="text-white font-poppins text-xl text-center">
          Leaderboard
        </p>

        {/* Tabs */}
        <Tabs
          value={category}
          onValueChange={setCategory}
          className="flex justify-center items-center"
        >
          <TabsList className="h-fit gap-6 bg-main p-1">
            {LEADERBOARD_CATEGORIES.map((type) => (
              <TabsTrigger
                key={type}
                value={type}
                className="font-poppins text-md px-10 py-1 text-white
                   data-[state=active]:bg-white data-[state=active]:text-secondary"
              >
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Top 3 */}
        <div className="flex justify-between">
          <div className="flex flex-col items-center gap-1 mt-8">
            <div className="h-24 w-24 bg-white rounded-full mb-2 relative">
              <div className="h-6 w-6 left-2 bg-gray-400 rounded-full absolute" />
            </div>
            <p className="font-poppins text-sm text-white font-medium">
              Pedro John
            </p>
            <p className="font-poppins text-xs text-white">Galileo 2025</p>
            <p className="font-poppins text-sm text-white font-medium">4,200</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-24 w-24 bg-white rounded-full mb-2 relative">
              <div className="h-6 w-6 left-2 bg-yellow-400 rounded-full absolute" />
            </div>
            <p className="font-poppins text-sm text-white font-medium">
              Pedro John
            </p>
            <p className="font-poppins text-xs text-white">Galileo 2025</p>
            <p className="font-poppins text-sm text-white font-medium">4,200</p>
          </div>
          <div className="flex flex-col items-center gap-1 mt-12">
            <div className="h-24 w-24 bg-white rounded-full mb-2 relative">
              <div className="h-6 w-6 left-2 bg-amber-800 rounded-full absolute" />
            </div>
            <p className="font-poppins text-sm text-white font-medium">
              Pedro John
            </p>
            <p className="font-poppins text-xs text-white">Galileo 2025</p>
            <p className="font-poppins text-sm text-white font-medium">4,200</p>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-gradient-to-t from-secondary to-main flex-1 rounded-tl-xl rounded-tr-xl p-6 flex flex-col gap-4 overflow-auto">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            className="bg-white p-4 rounded-md flex gap-4 items-center"
            key={index}
          >
            <p className="font-poppins text-sm font-medium">4</p>
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 bg-main rounded-full" />
              <div className="flex flex-col">
                <p className="font-poppins font-medium text-sm">
                  Juan Dela Cruz
                </p>
                <p className="font-poppins text-xs">Galileo 2025</p>
              </div>
            </div>
            <p className="font-poppins font-semibold text-xs flex-1 text-end">
              3,000
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
