"use client";

import "../styles/globals.css";

export default function VerificationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-secondary flex flex-col h-screen">{children}</main>
  );
}
