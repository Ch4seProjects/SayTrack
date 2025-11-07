"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotificationContext } from "@/app/context/NotificationContext";
import { NOTIFICATION_CATEGORIES } from "@/lib/constants";
import { Bell } from "lucide-react";
import { BeatLoader } from "react-spinners";

import { useIsAdmin } from "@/app/hooks/useIsAdmin";

export default function Notifications() {
  const [category, setCategory] = useState("GENERAL");
  const { notifications, loading } = useNotificationContext();
  const isAdmin = useIsAdmin();

  // Split notifications into global and club-specific
  const generalNotifs = notifications.filter((n) => n.club_id === null);
  const clubNotifs = notifications.filter((n) => n.club_id !== null);

  const filtered = isAdmin
    ? notifications
    : category === "GENERAL"
    ? generalNotifs
    : clubNotifs;

  return (
    <div className="px-6 pt-12 pb-6 flex flex-col gap-8 h-full">
      {/* Header */}
      <p className="text-white font-poppins text-xl">Notifications</p>

      {/* Tabs */}
      {!isAdmin && (
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
      )}

      {/* Notification Items */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {loading ? (
          <BeatLoader
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
              className="flex justify-between gap-4 px-2 py-4 border-[1px] border-main rounded-lg"
              key={notif.id}
            >
              <div className="h-10 w-10 bg-main rounded-full flex justify-center items-center">
                {notif.club_id ? (
                  <span className="text-white font-poppins font-semibold text-xs">
                    {notif.clubs?.name
                      .split(" ")
                      .map((word) => word[0])
                      .filter((char) => /[A-Za-z]/.test(char))
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                ) : (
                  <Bell className="h-6 w-6 text-white" />
                )}
              </div>
              <div className="flex flex-col flex-1">
                {notif.club_id && (
                  <span className="text-[9px] bg-main text-tertiary px-2 py-[2px] rounded-full self-start">
                    {notif.clubs?.name || "Unknown Club"}
                  </span>
                )}
                <p className="text-sm font-poppins font-bold text-white">
                  {notif.title}
                </p>
                <p className="text-[10px] font-poppins text-white ">
                  {notif.message}
                </p>
              </div>
              <p
                className={`text-[10px] font-poppins ${
                  new Date(notif.created_at).toDateString() ===
                  new Date().toDateString()
                    ? "text-tertiary"
                    : "text-white"
                }`}
              >
                {new Date(notif.created_at).toDateString() ===
                new Date().toDateString()
                  ? "Today"
                  : new Date(notif.created_at).toLocaleDateString("en-US", {
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
