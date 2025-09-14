import {
  Button as ShadcnButton,
  type buttonVariants,
} from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { SyncLoader } from "react-spinners";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  label?: string;
  asChild?: boolean;
}

export function Button({ loading, label, children, ...props }: ButtonProps) {
  return (
    <ShadcnButton
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        "w-full font-poppins text-lg p-7 bg-main text-white",
        "font-poppins text-lg"
      )}
    >
      {loading ? (
        <SyncLoader color="#fff" size={8} aria-label="Loading Spinner" />
      ) : (
        label ?? children
      )}
    </ShadcnButton>
  );
}
