import Image from "next/image";
import { cn } from "@/app/lib/cn";

// Falls back to an initial when the user has no avatar yet (e.g. before
// onboarding), instead of rendering an <Image> with an empty src.
const Avatar = ({
  src,
  name,
  size,
  className,
}: {
  src?: string | null;
  name?: string | null;
  size: number;
  className?: string;
}) => {
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        unoptimized
        className={cn("rounded-full object-cover", className)}
      />
    );
  }

  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        "flex items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white/70",
        className,
      )}
    >
      {name?.trim()?.[0]?.toUpperCase() ?? "?"}
    </span>
  );
};

export default Avatar;
