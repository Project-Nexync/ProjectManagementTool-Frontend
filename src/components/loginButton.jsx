import React from "react";

const variants = {
  primary:
    "bg-gradient-to-t from-white/20 to-transparent border border-white text-white hover:bg-gradient-to-t hover:from-[#1C89EF]/20 hover:to-transparent hover:border-[#447EB8] hover:text-[#82C2FF]",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-6 py-1 text-base",
  lg: "px-6 py-1 text-lg",
};

export function Button({
  title,
  subtitle,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center text-center
        rounded-lg font-medium transition-colors duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      <span className="text-lg font-semibold">{title}</span>
      {subtitle && (
        <span className="text-xs opacity-80">{subtitle}</span>
      )}
    </button>
  );
}
