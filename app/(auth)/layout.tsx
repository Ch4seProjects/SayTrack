"use client";

import "../styles/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const headerText = {
  login: {
    header: "Welcome Back!",
    subheader: "Enter your email and password to login.",
  },
  signup: {
    header: "Create a new account",
    subheader: "Please fill in the forms to continue.",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname?.includes("signup") ? "signup" : "login";
  const { header, subheader } = headerText[page];

  return (
    <main className="border-2 border-red-600 h-screen flex flex-col gap-6 p-6 pt-12">
      <ChevronLeft onClick={() => router.push("/")} />
      <div>
        <p className="text-3xl font-poppins">{header}</p>
        <p className="text-xs font-poppins">{subheader}</p>
      </div>
      {children}
    </main>
  );
}
