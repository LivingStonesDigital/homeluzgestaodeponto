"use client";

import { HTMLAttributes } from "react";

interface IconifyIconProps extends HTMLAttributes<HTMLElement> {
  icon: string;
  className?: string;
}

export function IconifyIcon({ icon, className = "", ...props }: IconifyIconProps) {
  return (
    <iconify-icon
      icon={icon}
      className={className}
      {...props}
    />
  );
}
