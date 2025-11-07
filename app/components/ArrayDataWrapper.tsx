import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { User, Flag, Medal, Star, CircleUserRound } from "lucide-react";
import { motion } from "framer-motion";

interface ArrayDataWrapperProps<
  T extends { id: string; name?: string; title?: string; avatar_url?: string }
> {
  title: string;
  data: T[];
  type: "achievements" | "titles" | "clubs" | "following" | "followers";
  isLoading?: boolean;
}

export default function ArrayDataWrapper<
  T extends { id: string; name?: string; title?: string; avatar_url?: string }
>({ title, data, type, isLoading }: ArrayDataWrapperProps<T>) {
  const mapIcons = {
    achievements: <Medal className="text-white" />,
    titles: <Star className="text-white" />,
    // clubs: <Flag className="text-white" />,
  };

  return (
    <div className="px-4 py-2 rounded-sm bg-gradient-to-t from-secondary to-main flex flex-col gap-0">
      <p className="font-medium font-poppins text-lg mb-2 text-tertiary">
        {title}
      </p>

      {isLoading ? (
        <BeatLoader />
      ) : data.length === 0 ? (
        <p className="text-gray-600 font-poppins text-sm">No available data</p>
      ) : (
        <div className="flex gap-5 overflow-auto pb-4">
          {data.map((item, index) => {
            if (type === "following" || type === "followers") {
              return (
                <motion.div
                  key={item.id}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.1 }}
                >
                  <Link
                    href={`/profile/${item.id}`}
                    className="flex flex-col items-center gap-1 w-20"
                  >
                    {item.avatar_url ? (
                      <img
                        src={item.avatar_url}
                        alt="User avatar"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-main rounded-full border-2 flex justify-center items-center">
                        <User className="text-white" />
                      </div>
                    )}
                    <p className="font-poppins text-white text-[10px] text-center">
                      {item.name || item.id}
                    </p>
                  </Link>
                </motion.div>
              );
            }

            if (type === "clubs") {
              return (
                <motion.div
                  className="flex flex-col items-center gap-1 w-20"
                  key={item.id ?? `${item.title || item.name}-${index}`}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="w-10 h-10 bg-main rounded-full border-2 flex justify-center items-center">
                    <span className="text-white font-poppins font-semibold text-sm">
                      {item.name
                        ? item.name
                            .split(" ")
                            .map((word) => word[0])
                            .filter((char) => /[A-Za-z]/.test(char))
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "?"}
                    </span>
                  </div>
                  <p className="font-poppins text-white text-[10px] text-center truncate w-full">
                    {item.title || item.name || "Unknown"}
                  </p>
                </motion.div>
              );
            }

            return (
              <motion.div
                className="flex flex-col items-center gap-1 w-20"
                key={item.id ?? `${item.title}-${index}`}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.1 }}
              >
                <div className="w-10 h-10 bg-main rounded-full border-2 flex justify-center items-center">
                  {mapIcons[type]}
                </div>
                <p className="font-poppins text-white text-[10px] text-center">
                  {item.title || item.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
