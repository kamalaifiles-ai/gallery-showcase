import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "glass" | "filter" | "icon";
};

const variants = {
  primary: "bg-primary text-primary-foreground border-transparent hover:bg-primary/90",
  glass: "border-gallery-line/10 bg-glass text-foreground hover:border-primary/40 hover:text-primary",
  filter: "border-transparent bg-transparent text-muted-foreground hover:bg-glass hover:text-foreground",
  icon: "border-gallery-line/10 bg-glass text-foreground hover:text-primary",
};

export function Button({ className = "", variant = "glass", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}