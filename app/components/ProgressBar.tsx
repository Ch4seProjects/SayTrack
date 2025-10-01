import React from "react";
import { UserMeta } from "../types/User";

interface ProgressBarProps {
  userMeta: UserMeta;
}

export default function ProgressBar({ userMeta }: ProgressBarProps) {
  if (userMeta.characterPercent === 0 && userMeta.participationPercent === 0) {
    return (
      <div className="progress-bar rounded-lg h-8 flex border-[1px] border-tertiary overflow-hidden justify-center items-center">
        <p className="font-poppins text-white text-xs">No points earned</p>
      </div>
    );
  }
  return (
    <div className="progress-bar rounded-lg h-8 flex border-[1px] border-tertiary overflow-hidden">
      <div
        className="bg-gradient-to-r from-secondary from-[0%] via-secondary via-[85%] to-main to-[100%] rounded-l-lg flex justify-center items-center"
        style={{ width: `${userMeta.characterPercent}%` }}
      >
        <p className="font-poppins text-white text-xs">
          {userMeta.characterPercent}%
        </p>
      </div>
      <div
        className="bg-main rounded-r-lg flex justify-center items-center"
        style={{ width: `${userMeta.participationPercent}%` }}
      >
        <p className="font-poppins text-white text-xs">
          {userMeta.participationPercent}%
        </p>
      </div>
    </div>
  );
}
