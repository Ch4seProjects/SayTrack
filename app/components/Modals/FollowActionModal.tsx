import { useState } from "react";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { Button } from "../Button";
import toast from "react-hot-toast";
import { unfollowUser } from "@/app/services/unfollowUser";
import { followUser } from "@/app/services/followUser";
import { useQueryClient } from "@tanstack/react-query";

export default function FollowActionModal({
  onClose,
  userName,
  isFollowing,
  id,
}: {
  onClose: () => void;
  userName?: string;
  isFollowing?: boolean;
  id?: string;
}) {
  const { user } = useSupabase();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFollowToggle = async () => {
    if (!user) {
      toast.error("You must be logged in to follow users.");
      return;
    }

    if (!id) {
      toast.error("Invalid user ID. Please try again.");
      return;
    }

    const loadingToast = toast.loading(
      isFollowing ? "Unfollowing user..." : "Following user..."
    );

    try {
      setIsSubmitting(true);

      const { success, message } = isFollowing
        ? await unfollowUser(user.id, id)
        : await followUser(user.id, id);

      if (success) {
        toast.success(message, {
          id: loadingToast,
          duration: 4000,
        });

        // Revalidate follow-related data
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["userFollowings", user.id],
          }),
          queryClient.invalidateQueries({ queryKey: ["userFollowers", id] }),
        ]);

        onClose?.();
      } else {
        toast.error(
          message || "Unable to update follow status. Please try again.",
          {
            id: loadingToast,
            duration: 4000,
          }
        );
      }
    } catch (err) {
      console.error("Error following/unfollowing user:", err);
      toast.error("Something went wrong. Please try again later.", {
        id: loadingToast,
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFollowModal = () => {
    return (
      <div className="flex flex-col gap-6 p-2">
        <div className="flex flex-col w-full text-center gap-1">
          <p className="text-tertiary font-poppins text-2xl font-bold">
            Follow this user?
          </p>
          <p className="text-white font-poppins text-xs text-center">
            Are you sure you want to follow{" "}
            <span className="text-tertiary">{userName}</span>?
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button
            label={isSubmitting ? "Following..." : "Follow"}
            disabled={isSubmitting}
            onClick={handleFollowToggle}
          />
          <Button label="Cancel" variant="outline" onClick={onClose} />
        </div>
      </div>
    );
  };

  const renderUnfollowModal = () => {
    return (
      <div className="flex flex-col gap-6 p-2">
        <div className="flex flex-col w-full text-center gap-1">
          <p className="text-tertiary font-poppins text-2xl font-bold">
            Unfollow this user?
          </p>
          <p className="text-white font-poppins text-xs text-center">
            Are you sure you want to unfollow{" "}
            <span className="text-tertiary">{userName}</span>?
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button
            label={isSubmitting ? "Unfollowing..." : "Unfollow"}
            onClick={handleFollowToggle}
            disabled={isSubmitting}
          />
          <Button label="Cancel" variant="outline" onClick={onClose} />
        </div>
      </div>
    );
  };

  return <>{isFollowing ? renderUnfollowModal() : renderFollowModal()}</>;
}
