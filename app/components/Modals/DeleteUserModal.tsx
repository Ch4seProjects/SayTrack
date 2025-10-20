import React, { useState } from "react";
import { Button } from "../Button";
import toast from "react-hot-toast";

export default function DeleteUserModal({
  onClose,
  userId,
  userName,
}: {
  onClose: () => void;
  userId?: string;
  userName?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteUser = async () => {
    if (!userId) {
      toast.error("Invalid user ID. Please try again.");
      return;
    }

    const loadingToast = toast.loading("Deleting user...");

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const { success, message } = await res.json();

      if (success) {
        toast.success(message, { id: loadingToast });
        onClose?.();
      } else {
        toast.error(message || "Failed to delete user.", { id: loadingToast });
      }
    } catch (err) {
      console.error("Error deleting user:", err);
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
          Delete this user?
        </p>
        <p className="text-white font-poppins text-xs text-center">
          Are you sure you want to delete{" "}
          <span className="text-tertiary">{userName}</span>?
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Button
          label={isSubmitting ? "Deleting..." : "Delete"}
          onClick={handleDeleteUser}
          disabled={isSubmitting}
        />
        <Button label="Cancel" variant="outline" onClick={onClose} />
      </div>
    </div>
  );
}
