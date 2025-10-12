"use client";

import "../styles/globals.css";
import { House, Trophy, Search, User, Bell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { NotificationProvider } from "../context/NotificationProvider";
import { useSupabase } from "../context/SupabaseProvider";

const navItems = [
  { icon: House, route: "/home", key: "home" },
  { icon: Trophy, route: "/leaderboards", key: "leaderboards" },
  { icon: Search, route: "/search", key: "search" },
  { icon: Bell, route: "/notifications", key: "notifications" },
  { icon: User, route: "/profile", key: "profile" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = useIsAdmin();
  const { user } = useSupabase();

  // Filter out the leaderboards nav for admin users
  const filteredNavItems = isAdmin
    ? navItems.filter((item) => item.key !== "leaderboards")
    : navItems;

  const isActive = (route: string, key: string) => {
    if (key === "search") {
      return (
        pathname.startsWith("/search") ||
        (pathname.startsWith("/profile/") && pathname !== "/profile")
      );
    }
    if (key === "profile") {
      return pathname === "/profile";
    }
    return pathname.startsWith(route);
  };

  return (
    <main className="bg-secondary flex flex-col h-screen">
      <div className="content flex-1 overflow-auto">
        <NotificationProvider userId={user?.id}>
          {children}
        </NotificationProvider>
      </div>

      <div className="bottom-navigation flex justify-around p-4 bg-gradient-to-t from-secondary to-main">
        {filteredNavItems.map(({ icon: Icon, route, key }) => (
          <button
            key={route}
            onClick={() => router.push(route)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isActive(route, key) ? "bg-white/20" : "hover:bg-white/10"
            )}
          >
            <Icon
              className={cn(
                "text-2xl",
                isActive(route, key) ? "text-yellow-300" : "text-white"
              )}
            />
          </button>
        ))}
      </div>
    </main>
  );
}
