import React from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { updateUserStatus } from "@/app/services/updateUserStatus";
import { usePendingUsers } from "@/app/hooks/usePendingUsers";
import { Button } from "@/components/ui/button";

export default function ApproveSignups({ onClose }: { onClose: () => void }) {
  const {
    data: pendingUsers = [],
    isLoading,
    isError,
    refetch,
  } = usePendingUsers();

  const handleUpdateStatus = async (
    userId: string,
    status: "approved" | "rejected"
  ) => {
    const loadingToast = toast.loading(
      status === "approved" ? "Approving user..." : "Rejecting user..."
    );

    try {
      const { success, message } = await updateUserStatus(userId, status);

      if (success) {
        toast.success(message, { id: loadingToast });
        refetch();
      } else {
        toast.error(message || "Failed to update user status.", {
          id: loadingToast,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="relative py-2 flex flex-col gap-8">
      <X
        className="absolute top-2 right-3 text-tertiary text-lg cursor-pointer hover:opacity-80"
        onClick={onClose}
      />

      <div className="title flex flex-col w-[70%]">
        <p className="text-tertiary font-poppins text-2xl font-bold">
          Pending Signups
        </p>
        <p className="text-white font-poppins text-xs">
          Approve or Reject pending user registrations.
        </p>
      </div>

      {/* Pending Users List */}
      <div className="flex flex-col gap-4 border-2 border-main rounded-lg p-2 h-80 overflow-y-auto">
        {isLoading ? (
          <p className="text-white text-xs text-center font-poppins">
            Loading pending users...
          </p>
        ) : isError ? (
          <p className="text-red-500 text-xs text-center font-poppins">
            Failed to load pending users.
          </p>
        ) : pendingUsers.length === 0 ? (
          <p className="text-gray-400 text-xs text-center font-poppins">
            No pending signups at the moment.
          </p>
        ) : (
          pendingUsers.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center rounded-sm p-3 bg-main"
            >
              <div className="flex flex-col max-w-[50%]">
                <p className="text-white font-poppins font-semibold text-xs">
                  {user.name || "Unnamed User"}
                </p>
                <p className="text-tertiary text-[10px]">{user.email}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white text-[10px] px-2 rounded-sm"
                  onClick={() => handleUpdateStatus(user.id, "approved")}
                >
                  Approve
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-2 rounded-sm"
                  onClick={() => handleUpdateStatus(user.id, "rejected")}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
