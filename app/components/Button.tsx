import { Button as ShadcnButton } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  loading?: boolean;
  label?: string;
  asChild?: boolean;
  variant?: "outline" | "solid";
}

export function Button({
  loading,
  label,
  children,
  variant = "solid",
  ...props
}: ButtonProps) {
  return (
    <ShadcnButton
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        "w-full font-poppins text-lg p-7",
        variant === "solid"
          ? "bg-main text-white"
          : "border-2 border-main bg-transparent text-main"
      )}
    >
      {loading ? (
        <BeatLoader color="#fff" size={8} aria-label="Loading Spinner" />
      ) : (
        label ?? children
      )}
    </ShadcnButton>
  );
}
