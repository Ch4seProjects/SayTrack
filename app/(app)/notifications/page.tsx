"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NOTIFICATION_CATEGORIES } from "@/app/lib/constants";
import { useNotificationContext } from "@/app/context/NotificationContext";
import { Bell } from "lucide-react";
import { SyncLoader } from "react-spinners";

export default function Notifications() {
  const [category, setCategory] = useState("GENERAL");
  const { notifications, loading } = useNotificationContext();

  // Split notifications into global and club-specific
  const generalNotifs = notifications.filter((n) => n.club_id === null);
  const clubNotifs = notifications.filter((n) => n.club_id !== null);

  const filtered = category === "GENERAL" ? generalNotifs : clubNotifs;

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
        {loading ? (
          <SyncLoader
            color="#fff"
            size={8}
            aria-label="Loading Spinner"
            className="self-center"
          />
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            No {category.toLowerCase()} notifications 🎉
          </p>
        ) : (
          filtered.map((notif) => (
            <div
              className="flex justify-between gap-4 px-2 py-4"
              key={notif.id}
            >
              <div className="h-10 w-10 bg-main rounded-full flex justify-center items-center">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-poppins text-white flex-1">
                {notif.message}
              </p>
              <p className="text-[10px] font-poppins text-white">
                {new Date(notif.created_at).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
