interface GoldLineProps {
  centered?: boolean;
  className?: string;
}

export default function GoldLine({ centered = false, className = "" }: GoldLineProps) {
  return (
    <div
      className={`w-[50px] h-[1px] bg-gold ${centered ? "mx-auto" : ""} ${className}`}
    />
  );
}
