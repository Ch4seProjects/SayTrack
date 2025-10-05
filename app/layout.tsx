import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { createServerSupabase } from "./utils/server";
import { SupabaseProvider } from "./context/SupabaseProvider";
import { NotificationProvider } from "./context/NotificationProvider";
import { LeaderboardsProvider } from "./context/LeaderboardProvider";
import ReactQueryProvider from "./context/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "Saytrack | %s", default: "Saytrack" },
  description: "Made by Ch4se",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          poppins.variable,
          "antialiased"
        )}
      >
        <ReactQueryProvider>
          <SupabaseProvider initialSession={session}>
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                className: "",
                duration: 3000,
                style: {
                  fontFamily: "Poppins",
                  padding: "8px",
                },
              }}
            />
            {session?.user ? (
              <NotificationProvider userId={session?.user.id}>
                <LeaderboardsProvider>{children}</LeaderboardsProvider>
              </NotificationProvider>
            ) : (
              children
            )}
          </SupabaseProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
