"use client";

import ActionTile from "@/app/components/ActionTile";
import { Bell, Medal, Flag } from "lucide-react";
import { useModalContext } from "@/app/context/ModalContext";

export default function page() {
  const { showModal } = useModalContext();

  return (
    <div className="px-6 py-12 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="text-white font-poppins text-xl">Collections</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-4">
          <ActionTile
            title="Manage Title Collection"
            description="Add available titles for users."
            icon={<Bell className="text-tertiary" size={24} />}
            onClick={() => showModal("ADD_TITLE", {})}
          />
          <ActionTile
            title="Manage Achievement Collection"
            description="Create achievement badges and milestones."
            icon={<Medal className="text-tertiary" size={24} />}
            onClick={() => showModal("ADD_ACHIEVEMENT", {})}
          />
          <ActionTile
            title="Manage Club Collection"
            description="Create and manage all school clubs."
            icon={<Flag className="text-tertiary" size={24} />}
            onClick={() => showModal("ADD_CLUB", {})}
          />
        </div>
      </div>
    </div>
  );
}
