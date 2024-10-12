import React, { ReactNode } from "react";

interface TextProps {
  variant?: "title" | "subtitle" | "description" | "small-description";
  className?: string;
  children: ReactNode;
}

const Text: React.FC<TextProps> = ({
  variant = "description",
  className = "",
  children,
}) => {
  switch (variant) {
    case "title":
      return (
        <div className={`text-4xl font-bold ${className}`}>{children}</div>
      );
    case "subtitle":
      return (
        <div className={`text-3xl font-semibold ${className}`}>{children}</div>
      );
    case "description":
      return <div className={`text-xl ${className}`}>{children}</div>;
    case "small-description":
      return <div className={`text-base ${className}`}>{children}</div>;
    default:
      return <div className={className}>{children}</div>;
  }
};

export default Text;
