"use client";

import "../styles/globals.css";
import { House, Trophy, Search, User, Bell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; // optional helper if you use shadcn's cn()

const navItems = [
  { icon: House, route: "/home" },
  { icon: Trophy, route: "/leaderboards" },
  { icon: Search, route: "/search" },
  { icon: Bell, route: "/notifications" },
  { icon: User, route: "/profile" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className="flex flex-col h-screen">
      <div className="content flex-1">{children}</div>

      <div className="bottom-navigation flex justify-around p-4 bg-gradient-to-t from-secondary to-main">
        {navItems.map(({ icon: Icon, route }) => (
          <button
            key={route}
            onClick={() => router.push(route)}
            className={cn(
              "p-2 rounded-full transition-colors",
              pathname === route ? "bg-white/20" : "hover:bg-white/10"
            )}
          >
            <Icon
              className={cn(
                "text-2xl",
                pathname === route ? "text-yellow-300" : "text-white"
              )}
            />
          </button>
        ))}
      </div>
    </main>
  );
}
