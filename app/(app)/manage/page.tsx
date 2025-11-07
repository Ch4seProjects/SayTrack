"use client";

import ActionTile from "@/app/components/ActionTile";
import { User, Trophy, Check } from "lucide-react";
import { useModalContext } from "@/app/context/ModalContext";

export default function page() {
  const { showModal } = useModalContext();

  return (
    <div className="px-6 py-12 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="text-white font-poppins text-xl">Manage</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-4">
          <ActionTile
            title="Manage Users"
            description="Oversee user accounts and manage their roles."
            icon={<User className="text-tertiary" size={24} />}
            onClick={() => showModal("MANAGE_USERS", {})}
          />
          <ActionTile
            title="Manage Notifications"
            description="Send notifications to keep everyone updated."
            icon={<Trophy className="text-tertiary" size={24} />}
            onClick={() => showModal("ADD_NOTIFICATION", {})}
          />
          <ActionTile
            title="Approve Signups"
            description="Review pending user registrations."
            icon={<Check className="text-tertiary" size={24} />}
            onClick={() => showModal("APPROVE_SIGNUPS", {})}
          />
          <ActionTile
            title="Approve Club Joins"
            description="Review and approve pending club membership requests."
            icon={<Check className="text-tertiary" size={24} />}
            onClick={() => showModal("APPROVE_CLUB_JOINS", {})}
          />
        </div>
      </div>
    </div>
  );
}
