import Link from "next/link";
import { BeatLoader } from "react-spinners";

interface ArrayDataWrapperProps<
  T extends { id: string; name?: string; title?: string }
> {
  title: string;
  data: T[];
  type: "achievements" | "titles" | "clubs" | "following" | "followers";
  isLoading?: boolean;
}

export default function ArrayDataWrapper<
  T extends { id: string; name?: string; title?: string }
>({ title, data, type, isLoading }: ArrayDataWrapperProps<T>) {
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
          {data.map((item) => {
            if (type === "following" || type === "followers") {
              return (
                <Link
                  href={`/profile/${item.id}`}
                  className="flex flex-col items-center gap-1 w-20"
                  key={item.id}
                >
                  <div className="w-10 h-10 bg-white rounded-full" />
                  <p className="font-poppins text-white text-sm text-center">
                    {item.name || item.id}
                  </p>
                </Link>
              );
            }

            return (
              <div
                className="flex flex-col items-center gap-1 w-20"
                key={item.id}
              >
                <div className="w-10 h-10 bg-white rounded-full" />
                <p className="font-poppins text-white text-[10px] text-center">
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
