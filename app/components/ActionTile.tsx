import { BeatLoader } from "react-spinners";

interface ActionTileProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isComingSoon?: boolean;
  stat?: string;
  isLoading?: boolean;
}
//  <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />

export default function ActionTile({
  title,
  description,
  icon,
  onClick,
  isComingSoon = false,
  stat,
  isLoading = false,
}: ActionTileProps) {
  const renderStat = (isLoading: boolean) => {
    if (isLoading) {
      return <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />;
    }

    return (
      <p className="font-poppins text-white font-semibold text-3xl">{stat}</p>
    );
  };

  return (
    <div
      className={`p-4 rounded-xl bg-main flex flex-col gap-4 relative transition-all duration-300 ${
        isComingSoon
          ? "opacity-60 cursor-not-allowed"
          : "hover:scale-[1.02] cursor-pointer"
      }`}
      onClick={!isComingSoon ? onClick : undefined}
    >
      {/* Content */}
      <div className="flex items-center gap-2">
        <div className="bg-secondary flex justify-center items-center w-12 h-12 rounded-xl">
          {icon}
        </div>
        {stat && renderStat(isLoading)}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-poppins text-xs text-tertiary">{title}</p>
        <p className="font-poppins text-[8px] mb-2 text-white">{description}</p>
      </div>

      {/* Overlay when Coming Soon */}
      {isComingSoon && (
        <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center">
          <p className="font-poppins text-xs text-tertiary bg-main/80 px-3 py-1 rounded-lg">
            Coming Soon
          </p>
        </div>
      )}
    </div>
  );
}
