"use client";

import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type IconifyIconIntrinsicProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  icon: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "iconify-icon": IconifyIconIntrinsicProps;
    }
  }
}

interface IconifyIconProps extends HTMLAttributes<HTMLElement> {
  icon: string;
  className?: string;
}

export function IconifyIcon({ icon, className = "", ...props }: IconifyIconProps) {
  return React.createElement("iconify-icon" as any, {
    icon,
    className,
    ...props,
  });
}
