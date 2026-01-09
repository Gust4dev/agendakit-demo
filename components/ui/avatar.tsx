"use client";

import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

export function Avatar({
  initials,
  color = "bg-primary",
  size = "md",
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white",
        sizeClasses[size],
        color,
        className
      )}
    >
      {initials}
    </div>
  );
}
