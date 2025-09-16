"use client";

import toast from "react-hot-toast";
import { createBrowserSupabase } from "@/app/utils/client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";

export default function Profile() {
  const router = useRouter();
  const supabase = createBrowserSupabase();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged out successfully");
    router.push("/");
  };
  return <Button label="Logout" onClick={handleLogout} className="mt-auto" />;
}
