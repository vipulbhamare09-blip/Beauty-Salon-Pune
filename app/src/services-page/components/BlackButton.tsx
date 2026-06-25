interface BlackButtonProps {
  children: React.ReactNode;
  variant?: "black" | "white" | "white-outline";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export default function BlackButton({
  children,
  variant = "black",
  onClick,
  className = "",
  type = "button",
}: BlackButtonProps) {
  const baseClasses =
    "inline-block px-8 py-3.5 font-body text-xs font-medium uppercase tracking-[2px] transition-all duration-350 ease-in-out cursor-pointer select-none active:scale-[0.98]";

  const variantClasses = {
    black: "bg-black text-white hover:bg-dark-text",
    white: "bg-white text-black hover:bg-gray-100",
    "white-outline":
      "bg-white text-black border border-black hover:bg-black hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
