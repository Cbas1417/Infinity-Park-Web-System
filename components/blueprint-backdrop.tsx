
export default function BlueprintBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#F2B705" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <linearGradient id="bp-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16181A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#16181A" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      <rect width="1440" height="800" fill="#16181A" />
      <rect width="1440" height="800" fill="url(#bp-grid)" />

      {/* Structural beams motif */}
      <g stroke="#F2B705" strokeOpacity="0.18" strokeWidth="2" fill="none">
        <path d="M-100 650 L1540 350" />
        <path d="M-100 720 L1540 420" />
        <path d="M200 -50 L500 850" />
        <path d="M1000 -50 L1300 850" />
      </g>

      {/* Dimension marks */}
      <g stroke="#F2B705" strokeOpacity="0.3" strokeWidth="1.5">
        <line x1="80" y1="60" x2="80" y2="120" />
        <line x1="60" y1="60" x2="100" y2="60" />
        <line x1="60" y1="120" x2="100" y2="120" />
        <line x1="1360" y1="680" x2="1360" y2="740" />
        <line x1="1340" y1="680" x2="1380" y2="680" />
        <line x1="1340" y1="740" x2="1380" y2="740" />
      </g>

      <rect width="1440" height="800" fill="url(#bp-fade)" />
    </svg>
  );
}
