interface FeatureListProps {
  items: string[];
  className?: string;
}

export default function FeatureList({ items, className = "" }: FeatureListProps) {
  return (
    <ul className={`space-y-1 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
          <span className="font-body text-[15px] font-normal text-dark-text">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
