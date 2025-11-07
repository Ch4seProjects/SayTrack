"use client";

import ActionTile from "@/app/components/ActionTile";
import { ChevronsUp, Star, Medal } from "lucide-react";
import { useModalContext } from "@/app/context/ModalContext";

export default function page() {
  const { showModal } = useModalContext();

  return (
    <div className="px-6 py-12 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="text-white font-poppins text-xl">Actions</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-4">
          <ActionTile
            title="Award Points"
            description="Award points to students based on their performance."
            icon={<ChevronsUp className="text-tertiary" size={24} />}
            onClick={() => showModal("GIVE_POINTS", {})}
          />
          <ActionTile
            title="Assign Titles"
            description="Assign titles to recognize outstanding achievements or milestones."
            icon={<Star className="text-tertiary" size={24} />}
            onClick={() => showModal("AWARD_TITLES", {})}
          />
          <ActionTile
            title="Grant Achievements"
            description="Grant achievements to acknowledge individual accomplishments."
            icon={<Medal className="text-tertiary" size={24} />}
            onClick={() => showModal("AWARD_ACHIEVEMENTS", {})}
          />
        </div>
      </div>
    </div>
  );
}
