export default function MomentoLogo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 680 340"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MomentoLive Logo"
    >
      {/* Spotlight beams */}
      <defs>
        <linearGradient id="spotLight" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#d4e8b8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#d4e8b8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a8d68a" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#7ab85a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4a8c2a" stopOpacity="0" />
        </radialGradient>
        <clipPath id="mainClip">
          <rect x="0" y="0" width="680" height="340" />
        </clipPath>
      </defs>

      {/* Spotlight 1 */}
      <polygon points="120,0 80,0 20,200 180,200" fill="url(#spotLight)" clipPath="url(#mainClip)" />
      <line x1="120" y1="0" x2="20" y2="200" stroke="#a8d68a" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="80" y1="0" x2="180" y2="200" stroke="#a8d68a" strokeOpacity="0.2" strokeWidth="1" />

      {/* Spotlight 2 */}
      <polygon points="360,0 320,0 260,220 420,220" fill="url(#spotLight)" clipPath="url(#mainClip)" />
      <line x1="360" y1="0" x2="260" y2="220" stroke="#a8d68a" strokeOpacity="0.15" strokeWidth="1" />
      <line x1="320" y1="0" x2="420" y2="220" stroke="#a8d68a" strokeOpacity="0.15" strokeWidth="1" />

      {/* Spotlight 3 */}
      <polygon points="590,0 550,0 490,200 640,200" fill="url(#spotLight)" clipPath="url(#mainClip)" />
      <line x1="590" y1="0" x2="490" y2="200" stroke="#a8d68a" strokeOpacity="0.12" strokeWidth="1" />
      <line x1="550" y1="0" x2="640" y2="200" stroke="#a8d68a" strokeOpacity="0.12" strokeWidth="1" />

      {/* Studio light 1 */}
      <rect x="60" y="0" width="100" height="10" rx="3" fill="#c8e8a0" fillOpacity="0.6" />
      <rect x="75" y="10" width="12" height="18" rx="2" fill="#b0d880" fillOpacity="0.5" />
      <circle cx="100" cy="28" r="14" fill="#7ab85a" fillOpacity="0.2" stroke="#c8e8a0" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="100" cy="28" r="8" fill="#a8d68a" fillOpacity="0.4" stroke="#c8e8a0" strokeOpacity="0.6" strokeWidth="0.8" />
      <circle cx="100" cy="28" r="3.5" fill="#e0f5c0" fillOpacity="0.9" />

      {/* Studio light 2 */}
      <rect x="300" y="0" width="100" height="10" rx="3" fill="#c8e8a0" fillOpacity="0.6" />
      <rect x="315" y="10" width="12" height="18" rx="2" fill="#b0d880" fillOpacity="0.5" />
      <circle cx="340" cy="28" r="14" fill="#7ab85a" fillOpacity="0.2" stroke="#c8e8a0" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="340" cy="28" r="8" fill="#a8d68a" fillOpacity="0.4" stroke="#c8e8a0" strokeOpacity="0.6" strokeWidth="0.8" />
      <circle cx="340" cy="28" r="3.5" fill="#e0f5c0" fillOpacity="0.9" />

      {/* Studio light 3 */}
      <rect x="530" y="0" width="100" height="10" rx="3" fill="#c8e8a0" fillOpacity="0.5" />
      <rect x="555" y="10" width="12" height="18" rx="2" fill="#b0d880" fillOpacity="0.4" />
      <circle cx="580" cy="28" r="14" fill="#7ab85a" fillOpacity="0.18" stroke="#c8e8a0" strokeOpacity="0.45" strokeWidth="1.2" />
      <circle cx="580" cy="28" r="8" fill="#a8d68a" fillOpacity="0.35" stroke="#c8e8a0" strokeOpacity="0.5" strokeWidth="0.8" />
      <circle cx="580" cy="28" r="3.5" fill="#e0f5c0" fillOpacity="0.8" />

      {/* Camera Lens */}
      <g transform="translate(148, 168)">
        <circle cx="0" cy="0" r="52" fill="#a8d68a" fillOpacity="0.1" stroke="#c8e8a0" strokeOpacity="0.4" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="42" fill="none" stroke="#a8d68a" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="0" cy="0" r="32" fill="#7ab85a" fillOpacity="0.15" stroke="#a8d68a" strokeOpacity="0.35" strokeWidth="1.2" />
        <g fill="#c8e8a0" fillOpacity="0.55">
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(0)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(51.4)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(102.8)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(154.2)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(205.6)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(257)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(308.4)" />
        </g>
        <circle cx="0" cy="0" r="16" fill="url(#lensGlow)" stroke="#a8d68a" strokeOpacity="0.5" strokeWidth="0.8" />
        <ellipse cx="-5" cy="-5" rx="5" ry="3" fill="#ffffff" fillOpacity="0.2" transform="rotate(-30)" />
        <circle cx="5" cy="-8" r="2" fill="#ffffff" fillOpacity="0.15" />
      </g>

      {/* Film Strip */}
      <rect x="42" y="145" width="22" height="50" rx="2" fill="#a8d68a" fillOpacity="0.15" stroke="#c8e8a0" strokeOpacity="0.3" strokeWidth="0.8" />
      {[148, 157, 166, 175, 184].map((y) => (
        <>
          <rect key={`l${y}`} x="45" y={y} width="6" height="5" rx="1" fill="#c8e8a0" fillOpacity="0.5" />
          <rect key={`r${y}`} x="55" y={y} width="6" height="5" rx="1" fill="#c8e8a0" fillOpacity="0.5" />
        </>
      ))}

      {/* Clapperboard */}
      <g transform="translate(580, 152)">
        <rect x="-42" y="10" width="84" height="58" rx="4" fill="#a8d68a" fillOpacity="0.1" stroke="#c8e8a0" strokeOpacity="0.35" strokeWidth="1.2" />
        <rect x="-42" y="-6" width="84" height="20" rx="3" fill="#7ab85a" fillOpacity="0.25" stroke="#c8e8a0" strokeOpacity="0.4" strokeWidth="1" />
        <line x1="-26" y1="-6" x2="-34" y2="14" stroke="#c8e8a0" strokeOpacity="0.6" strokeWidth="5" />
        <line x1="-8"  y1="-6" x2="-16" y2="14" stroke="#c8e8a0" strokeOpacity="0.6" strokeWidth="5" />
        <line x1="10"  y1="-6" x2="2"   y2="14" stroke="#c8e8a0" strokeOpacity="0.6" strokeWidth="5" />
        <line x1="28"  y1="-6" x2="20"  y2="14" stroke="#c8e8a0" strokeOpacity="0.6" strokeWidth="5" />
        <circle cx="-40" cy="2" r="3.5" fill="#a8d68a" fillOpacity="0.6" />
        <text x="0" y="36" fontFamily="Georgia, serif" fontSize="16" fontWeight="700"
          fill="#e0f5c0" fillOpacity="0.9" textAnchor="middle" letterSpacing="3">ACTION</text>
        <rect x="-28" y="44" width="56" height="2.5" rx="1" fill="#a8d68a" fillOpacity="0.25" />
        <rect x="-28" y="50" width="40" height="2.5" rx="1" fill="#a8d68a" fillOpacity="0.2" />
        <rect x="-28" y="56" width="48" height="2.5" rx="1" fill="#a8d68a" fillOpacity="0.2" />
      </g>

      {/* MOMENTO text */}
      <text
        x="210" y="200"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="58" fontWeight="700"
        fill="#e0f5c0" fillOpacity="0.95"
        letterSpacing="2"
      >
        MOMENTO
      </text>

      {/* dot */}
      <circle cx="209" cy="222" r="5" fill="#a8d68a" fillOpacity="0.8" />

      {/* LIVE */}
      <text
        x="222" y="240"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28" fontWeight="400"
        fill="#a8d68a" fillOpacity="0.85"
        letterSpacing="8"
      >
        L I V E
      </text>

      {/* rule lines */}
      <line x1="210" y1="256" x2="535" y2="256" stroke="#c8e8a0" strokeOpacity="0.25" strokeWidth="0.6" />
      <line x1="210" y1="259" x2="535" y2="259" stroke="#a8d68a" strokeOpacity="0.12" strokeWidth="0.4" />

      {/* flare dots */}
      <circle cx="230" cy="130" r="2" fill="#a8d68a" fillOpacity="0.35" />
      <circle cx="245" cy="120" r="1.2" fill="#c8e8a0" fillOpacity="0.3" />
      <circle cx="215" cy="125" r="1" fill="#a8d68a" fillOpacity="0.4" />
      <circle cx="470" cy="140" r="1.8" fill="#a8d68a" fillOpacity="0.3" />
      <circle cx="490" cy="128" r="1" fill="#c8e8a0" fillOpacity="0.35" />
    </svg>
  );
}
