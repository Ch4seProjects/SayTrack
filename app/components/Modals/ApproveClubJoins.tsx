import React from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { updateClubJoinStatus } from "@/app/services/updateClubJoinStatus";
import { usePendingClubJoins } from "@/app/hooks/usePendingClubJoins";
import { Button } from "@/components/ui/button";

export default function ApproveClubJoins({ onClose }: { onClose: () => void }) {
  const {
    data: pendingClubJoins = [],
    isLoading,
    isError,
    refetch,
  } = usePendingClubJoins();

  const handleUpdateStatus = async (
    userId: string,
    clubId: string,
    status: "joined" | "rejected"
  ) => {
    const loadingToast = toast.loading(
      status === "joined"
        ? "Approving club join request..."
        : "Rejecting club join request..."
    );

    try {
      const { success, message } = await updateClubJoinStatus(
        userId,
        clubId,
        status
      );

      if (success) {
        toast.success(message, { id: loadingToast });
        refetch();
      } else {
        toast.error(message || "Failed to update club join status.", {
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

      <div className="title flex flex-col w-[80%]">
        <p className="text-tertiary font-poppins text-2xl font-bold">
          Pending Club Joins
        </p>
        <p className="text-white font-poppins text-xs">
          Review and approve pending club membership requests.
        </p>
      </div>

      {/* Pending Club Joins */}
      <div className="flex flex-col gap-4 border-2 border-main rounded-lg p-2 h-80 overflow-y-auto">
        {isLoading ? (
          <p className="text-white text-xs text-center font-poppins">
            Loading pending club joins...
          </p>
        ) : isError ? (
          <p className="text-red-500 text-xs text-center font-poppins">
            Failed to load pending club joins.
          </p>
        ) : pendingClubJoins.length === 0 ? (
          <p className="text-gray-400 text-xs text-center font-poppins">
            No pending club join requests at the moment.
          </p>
        ) : (
          pendingClubJoins.map((join) => (
            <div
              key={`${join.user_id}-${join.club_id}`}
              className="flex justify-between items-center rounded-sm p-3 bg-main"
            >
              <div className="flex flex-col max-w-[55%]">
                <p className="text-white font-poppins font-semibold text-xs truncate">
                  {join.user?.name || "Unnamed User"}
                </p>
                <p className="text-tertiary text-[10px] truncate">
                  {join.user?.email}
                </p>
                <p className="text-gray-400 text-[10px] italic truncate">
                  {join.club?.name || "Unknown Club"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white text-[10px] px-2 rounded-sm"
                  onClick={() =>
                    handleUpdateStatus(join.user_id, join.club_id, "joined")
                  }
                >
                  Approve
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-2 rounded-sm"
                  onClick={() =>
                    handleUpdateStatus(join.user_id, join.club_id, "rejected")
                  }
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
