

/**
 * Circular Progress Chart (SVG)
 * Used to ensure perfect rendering in html2canvas (no generic div borders)
 */
export function CircularProgress({ value, label, size = 120, strokeWidth = 8 }: { value: number, label: string, size?: number, strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB" // salon-gray/20
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1A1A1A" // salon-black
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        {/* Center Text */}
        <text 
          x="50%" 
          y="50%" 
          dy=".3em" 
          textAnchor="middle" 
          className="font-playfair font-medium" 
          fontSize={size * 0.25} 
          fill="#1A1A1A"
          transform={`rotate(90 ${size/2} ${size/2})`} // Counter-rotate text
        >
          {value}%
        </text>
      </svg>
      <span className="mt-4 text-xs uppercase tracking-widest text-gray-500 font-medium">{label}</span>
    </div>
  );
}

/**
 * Bar Chart (SVG)
 */
export function BarChart({ data }: { data: { label: string, value: number }[] }) {
  const height = 160;
  const width = 300;
  const barHeight = 20;
  const gap = 15;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      {data.map((item, i) => {
        const y = i * (barHeight + gap);
        const barWidth = (item.value / 100) * (width - 100); // Leave space for labels
        
        return (
          <g key={item.label}>
            {/* Label */}
            <text x="0" y={y + 14} fontSize="11" fill="#4B5563" className="uppercase tracking-widest font-medium">
              {item.label}
            </text>
            
            {/* Background Track */}
            <rect x="100" y={y} width={width - 100} height={barHeight} fill="#F3F4F6" rx="4" />
            
            {/* Value Bar */}
            <rect x="100" y={y} width={barWidth} height={barHeight} fill="#1A1A1A" rx="4" />
            
            {/* Value Text */}
            <text x={100 + barWidth - 6} y={y + 14} fontSize="10" fill="#FFFFFF" textAnchor="end" className="font-medium">
              {item.value}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Simple Radar/Pentagon Chart (SVG)
 */
export function RadarChart({ data }: { data: { label: string, value: number }[] }) {
  const size = 200;
  const center = size / 2;
  const radius = (size / 2) - 30; // Leave room for labels
  
  // Need exactly 5 points for a pentagon
  const points = data.slice(0, 5);
  
  const getCoordinatesForAngle = (angle: number, value: number) => {
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const getPolygonPoints = (values: number[]) => {
    return values.map((val, i) => {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2; // Start at top
      const { x, y } = getCoordinatesForAngle(angle, val);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background Grid (3 levels) */}
      {[100, 66, 33].map(level => (
        <polygon 
          key={level}
          points={getPolygonPoints([level, level, level, level, level])}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      ))}
      
      {/* Connecting Lines from center */}
      {points.map((_, i) => {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const { x, y } = getCoordinatesForAngle(angle, 100);
        return <line key={`line-${i}`} x1={center} y1={center} x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1" />;
      })}

      {/* Data Polygon */}
      <polygon 
        points={getPolygonPoints(points.map(p => p.value))}
        fill="rgba(26, 26, 26, 0.1)"
        stroke="#1A1A1A"
        strokeWidth="2"
      />

      {/* Data Points */}
      {points.map((p, i) => {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const { x, y } = getCoordinatesForAngle(angle, p.value);
        return <circle key={`pt-${i}`} cx={x} cy={y} r="3" fill="#1A1A1A" />;
      })}

      {/* Labels */}
      {points.map((p, i) => {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const { x, y } = getCoordinatesForAngle(angle, 120); // Push labels out further
        return (
          <text 
            key={`lbl-${i}`} 
            x={x} 
            y={y} 
            fontSize="9" 
            fill="#4B5563" 
            textAnchor="middle" 
            dominantBaseline="middle"
            className="uppercase tracking-widest font-medium"
          >
            {p.label}
          </text>
        );
      })}
    </svg>
  );
}
