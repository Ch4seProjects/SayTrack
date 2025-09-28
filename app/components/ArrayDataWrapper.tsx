import React from "react";
import Link from "next/link";
import { UserMeta } from "../types/User";

interface ArrayDataWrapperProps<T> {
  title: string;
  data: T[];
  type: "achievements" | "titles" | "clubs" | "following" | "followers";
}

export default function ArrayDataWrapper<T extends { [key: string]: any }>({
  title,
  data,
  type,
}: ArrayDataWrapperProps<T>) {
  return (
    <div className="px-4 py-2 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-0">
      <p className="font-medium font-poppins text-lg mb-2 text-tertiary">
        {title}
      </p>

      {data && data.length === 0 ? (
        <p className="text-gray-600 font-poppins text-sm">No available data</p>
      ) : (
        <div className="flex gap-5 overflow-auto pb-4">
          {data.map((item, index) => {
            if (type === "following" || type === "followers") {
              return (
                <Link
                  href={`/profile/${item.id}`}
                  className="flex flex-col justify-center items-center gap-1"
                  key={index}
                >
                  <div className="w-10 h-10 bg-white rounded-full" />
                  <p className="font-poppins text-white text-sm text-center">
                    {item.id}
                  </p>
                </Link>
              );
            }

            return (
              <div
                className="flex flex-col justify-center items-center gap-1"
                key={index}
              >
                <div className="w-10 h-10 bg-white rounded-full" />
                <p className="font-poppins text-white text-sm text-center">
                  {item.title || item.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
