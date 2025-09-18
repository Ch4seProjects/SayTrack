"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NOTIFICATION_CATEGORIES = ["GENERAL", "CLUB"];

export default function Notifications() {
  const [category, setCategory] = useState("GENERAL");
  return (
    <div className="px-6 py-12 flex flex-col gap-8">
      {/* Header */}
      <p className="text-white font-poppins text-xl">Notifications</p>

      {/* Tabs */}
      <Tabs value={category} onValueChange={setCategory}>
        <TabsList className="h-fit w-full gap-6 bg-white">
          {NOTIFICATION_CATEGORIES.map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              className="font-poppins text-md text-gray-600 p-2
                   data-[state=active]:bg-main data-[state=active]:text-white"
            >
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Notification Items */}
      <div className="flex flex-col divide-y divide-white">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex justify-between gap-4 px-2 py-4" key={index}>
            <div className="h-10 w-10 bg-main rounded-full" />
            <p className="text-[10px] font-poppins text-white flex-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero
              cum sed.
            </p>
            <p className="text-[10px] font-poppins text-white">5m ago</p>
          </div>
        ))}
      </div>
    </div>
  );
}
