"use client";

import { Button } from "../Button";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import { joinClub } from "@/app/services/joinClubService";
import { useQueryClient } from "@tanstack/react-query";

export default function JoinAClub({
  onClose,
  clubName,
  club_id,
}: {
  onClose: () => void;
  clubName?: string;
  club_id?: string;
}) {
  const { user } = useSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleJoin = async () => {
    if (!user) {
      toast.error("You must be logged in to join a club.");
      return;
    }

    if (!club_id) {
      toast.error("Invalid club ID. Please try again.");
      return;
    }

    const loadingToast = toast.loading("Joining club...");

    try {
      setIsSubmitting(true);

      const { success, message } = await joinClub(user.id, club_id);

      if (success) {
        toast.success(message, {
          id: loadingToast,
          duration: 4000,
        });

        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["userClubs", user.id] }),
          queryClient.invalidateQueries({ queryKey: ["clubs"] }),
        ]);

        onClose();
      } else {
        toast.error(message || "Unable to join club. Please try again.", {
          id: loadingToast,
          duration: 4000,
        });
      }
    } catch (err) {
      console.error("Error joining club:", err);
      toast.error("Something went wrong. Please try again later.", {
        id: loadingToast,
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex flex-col w-full text-center gap-1">
        <p className="text-tertiary font-poppins text-2xl font-bold">
          Join this club?
        </p>
        <p className="text-white font-poppins text-xs text-center">
          Are you sure you want to join{" "}
          <span className="text-tertiary">{clubName}</span>? You’ll become a
          member and start seeing updates from this club.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Button
          label={isSubmitting ? "Joining..." : "Join"}
          onClick={handleJoin}
          disabled={isSubmitting}
        />
        <Button label="Cancel" variant="outline" onClick={onClose} />
      </div>
    </div>
  );
}
