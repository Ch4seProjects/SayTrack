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
    header: "Create account",
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
    <main className="h-screen flex flex-col justify-center items-center p-6 relative bg-linear-to-t from-secondary to-main">
      <ChevronLeft
        onClick={() => router.push("/")}
        className="absolute top-12 left-6 text-white"
      />
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-poppins font-semibold text-white">
            {header}
          </p>
          <p className="text-xs font-poppins text-white">{subheader}</p>
        </div>
        {children}
      </div>
    </main>
  );
}
