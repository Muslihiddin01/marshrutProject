"use client";

import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}) {
  const baseStyles =
    "rounded-lg font-medium transition-colors duration-200 ";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-400",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
