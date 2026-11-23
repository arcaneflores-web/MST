import type { VisualSchematicType } from '../types/construction';

export function BrandMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Inspired by the architectural tower & pillar monogram on the MST Construction OPC signage */}
      <rect x="3" y="14" width="6" height="22" rx="1" fill="#1D4ED8" />
      <rect x="11.5" y="7" width="6" height="29" rx="1" fill="#1E3A8A" />
      <rect x="20" y="11" width="6" height="25" rx="1" fill="#1D4ED8" />
      <path d="M28.5 19H35.5V36H28.5V19Z" fill="#0F172A" />
      <circle cx="32" cy="11.5" r="3.5" fill="#DC2626" />
      <rect x="2" y="35" width="36" height="2.5" rx="1" fill="#DC2626" />
    </svg>
  );
}

export function HeroBlueprintCanvas() {
  return (
    <div className="relative h-full min-h-[380px] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-6 text-slate-100 flex flex-col justify-between">
      {/* Fine engineering CAD grid */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="cad-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="#64748B"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-grid)" />
      </svg>

      {/* Top technical title block */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 text-[11px] sm:text-xs text-slate-400">
        <span className="font-mono tracking-tight text-slate-200 whitespace-nowrap">
          DWG NO. MST-STR-2026-A1
        </span>
        <span className="font-mono tabular-nums whitespace-nowrap">
          SCALE 1:100 · ZONE 4 SEISMIC
        </span>
      </div>

      {/* Central structural elevation drawing */}
      <div className="relative z-10 my-6 flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 480 274"
          className="w-full h-auto max-h-[268px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Structural steel and reinforced concrete elevation blueprint"
        >
          {/* Datum & ground line */}
          <line x1="20" y1="216" x2="460" y2="216" stroke="#475569" strokeWidth="1.5" />
          <line
            x1="20"
            y1="224"
            x2="460"
            y2="224"
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Foundation pads */}
          {[70, 175, 285, 390].map((x) => (
            <g key={x}>
              <rect
                x={x - 16}
                y="216"
                width="32"
                height="14"
                stroke="#38BDF8"
                strokeWidth="1.2"
                fill="#0F172A"
              />
              <line x1={x} y1="48" x2={x} y2="216" stroke="#60A5FA" strokeWidth="2" />
            </g>
          ))}

          {/* Floor slabs */}
          <rect x="54" y="162" width="352" height="7" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.2" />
          <rect x="54" y="106" width="352" height="7" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.2" />

          {/* Cantilevered roof truss */}
          <polygon
            points="40,48 230,20 420,48"
            stroke="#DC2626"
            strokeWidth="1.8"
            fill="rgba(220,38,38,0.08)"
          />
          <line x1="115" y1="37" x2="115" y2="48" stroke="#F87171" strokeWidth="1" />
          <line x1="175" y1="28" x2="175" y2="48" stroke="#F87171" strokeWidth="1" />
          <line x1="230" y1="20" x2="230" y2="48" stroke="#F87171" strokeWidth="1.2" />
          <line x1="285" y1="28" x2="285" y2="48" stroke="#F87171" strokeWidth="1" />
          <line x1="345" y1="37" x2="345" y2="48" stroke="#F87171" strokeWidth="1" />

          {/* Diagonal structural bracing */}
          <line x1="70" y1="169" x2="175" y2="216" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="175" y1="169" x2="70" y2="216" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="285" y1="113" x2="390" y2="162" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />

          {/* Curtain wall bays */}
          <rect x="82" y="118" width="80" height="40" stroke="#94A3B8" strokeWidth="1" />
          <line x1="122" y1="118" x2="122" y2="158" stroke="#64748B" strokeWidth="0.8" />
          <rect x="188" y="118" width="84" height="40" stroke="#94A3B8" strokeWidth="1" />
          <line x1="230" y1="118" x2="230" y2="158" stroke="#64748B" strokeWidth="0.8" />
          <rect x="298" y="56" width="80" height="46" stroke="#94A3B8" strokeWidth="1" />

          {/* Dimension callouts cleanly separated below ground line */}
          <line x1="70" y1="244" x2="390" y2="244" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="70" cy="244" r="2.5" fill="#60A5FA" />
          <circle cx="175" cy="244" r="2.5" fill="#60A5FA" />
          <circle cx="285" cy="244" r="2.5" fill="#60A5FA" />
          <circle cx="390" cy="244" r="2.5" fill="#60A5FA" />
          <text
            x="230"
            y="264"
            textAnchor="middle"
            fill="#CBD5E1"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
          >
            SPAN 24.00M · 3-STOREY MOMENT FRAME
          </text>
        </svg>
      </div>

      {/* Bottom engineering specification strip */}
      <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-slate-800 pt-4 text-xs">
        <div>
          <p className="text-slate-400">Concrete Grade</p>
          <p className="mt-0.5 font-mono font-medium text-white tabular-nums">
            4,000 PSI / ASTM
          </p>
        </div>
        <div>
          <p className="text-slate-400">Reinforcement</p>
          <p className="mt-0.5 font-mono font-medium text-white tabular-nums">
            Grade 60 Deformed
          </p>
        </div>
        <div>
          <p className="text-slate-400">Headquarters</p>
          <p className="mt-0.5 font-medium text-white">San Fernando, PH</p>
        </div>
      </div>
    </div>
  );
}

export function ProjectSchematic({
  type,
  code,
}: {
  type: VisualSchematicType;
  code: string;
}) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-200">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`grid-${code}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#64748B" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${code})`} />
      </svg>

      <div className="relative z-10 flex h-full w-full items-center justify-center p-5">
        {type === 'commercial-hub' && (
          <svg viewBox="0 0 320 170" className="h-full w-full" fill="none" aria-hidden="true">
            <line x1="20" y1="150" x2="300" y2="150" stroke="#475569" strokeWidth="1.5" />
            <rect x="48" y="34" width="224" height="116" stroke="#60A5FA" strokeWidth="1.8" fill="rgba(30,58,138,0.22)" />
            <line x1="48" y1="72" x2="272" y2="72" stroke="#93C5FD" strokeWidth="1.4" />
            <line x1="48" y1="111" x2="272" y2="111" stroke="#93C5FD" strokeWidth="1.4" />
            {[74, 118, 162, 206, 250].map((x) => (
              <line key={x} x1={x} y1="34" x2={x} y2="150" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.65" />
            ))}
            <rect x="38" y="26" width="244" height="8" fill="#DC2626" />
            <rect x="135" y="118" width="50" height="32" stroke="#E2E8F0" strokeWidth="1.2" fill="rgba(15,23,42,0.7)" />
          </svg>
        )}

        {type === 'steel-warehouse' && (
          <svg viewBox="0 0 320 170" className="h-full w-full" fill="none" aria-hidden="true">
            <line x1="20" y1="148" x2="300" y2="148" stroke="#475569" strokeWidth="1.5" />
            <polygon points="36,68 160,26 284,68 284,148 36,148" stroke="#60A5FA" strokeWidth="1.8" fill="rgba(30,58,138,0.2)" />
            <line x1="36" y1="68" x2="284" y2="68" stroke="#DC2626" strokeWidth="1.6" />
            {[78, 120, 160, 200, 242].map((x) => (
              <line key={x} x1={x} y1="40" x2={x} y2="148" stroke="#38BDF8" strokeWidth="0.9" strokeOpacity="0.6" />
            ))}
            <rect x="64" y="102" width="44" height="46" stroke="#CBD5E1" strokeWidth="1.2" />
            <rect x="138" y="102" width="44" height="46" stroke="#CBD5E1" strokeWidth="1.2" />
            <rect x="212" y="102" width="44" height="46" stroke="#CBD5E1" strokeWidth="1.2" />
          </svg>
        )}

        {type === 'road-drainage' && (
          <svg viewBox="0 0 320 170" className="h-full w-full" fill="none" aria-hidden="true">
            {/* Cross-section of PCCP road & twin box culvert */}
            <rect x="28" y="64" width="264" height="16" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.4" />
            <rect x="28" y="80" width="264" height="14" fill="#334155" stroke="#64748B" strokeWidth="1" />
            <rect x="108" y="104" width="48" height="36" stroke="#38BDF8" strokeWidth="1.8" fill="rgba(15,23,42,0.8)" />
            <rect x="164" y="104" width="48" height="36" stroke="#38BDF8" strokeWidth="1.8" fill="rgba(15,23,42,0.8)" />
            <line x1="158" y1="36" x2="158" y2="64" stroke="#DC2626" strokeWidth="1.8" />
            <circle cx="158" cy="34" r="4" fill="#DC2626" />
            <line x1="20" y1="146" x2="300" y2="146" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 4" />
          </svg>
        )}

        {type === 'medical-clinic' && (
          <svg viewBox="0 0 320 170" className="h-full w-full" fill="none" aria-hidden="true">
            <line x1="20" y1="148" x2="300" y2="148" stroke="#475569" strokeWidth="1.5" />
            <rect x="52" y="48" width="216" height="100" stroke="#60A5FA" strokeWidth="1.8" fill="rgba(30,58,138,0.22)" />
            <line x1="52" y1="98" x2="268" y2="98" stroke="#93C5FD" strokeWidth="1.2" />
            <rect x="132" y="26" width="56" height="22" stroke="#DC2626" strokeWidth="1.4" fill="rgba(220,38,38,0.12)" />
            <path d="M160 31V43M154 37H166" stroke="#F87171" strokeWidth="2" />
            {[74, 114, 206, 246].map((x) => (
              <rect key={x} x={x - 12} y="60" width="24" height="26" stroke="#94A3B8" strokeWidth="1" />
            ))}
            <rect x="134" y="108" width="52" height="40" stroke="#E2E8F0" strokeWidth="1.2" />
          </svg>
        )}

        {type === 'modern-residence' && (
          <svg viewBox="0 0 320 170" className="h-full w-full" fill="none" aria-hidden="true">
            <line x1="20" y1="148" x2="300" y2="148" stroke="#475569" strokeWidth="1.5" />
            <rect x="44" y="88" width="144" height="60" stroke="#60A5FA" strokeWidth="1.6" fill="rgba(30,58,138,0.2)" />
            <rect x="92" y="42" width="176" height="46" stroke="#38BDF8" strokeWidth="1.8" fill="rgba(15,23,42,0.55)" />
            <line x1="74" y1="42" x2="284" y2="42" stroke="#DC2626" strokeWidth="2.5" />
            <rect x="196" y="96" width="60" height="52" stroke="#94A3B8" strokeWidth="1.2" />
            <rect x="112" y="54" width="68" height="24" stroke="#CBD5E1" strokeWidth="1" />
          </svg>
        )}

        {type === 'office-fitout' && (
          <svg viewBox="0 0 320 170" className="h-full w-full" fill="none" aria-hidden="true">
            {/* Architectural floor plan schematic */}
            <rect x="44" y="28" width="232" height="114" stroke="#60A5FA" strokeWidth="1.8" fill="rgba(30,58,138,0.18)" />
            <line x1="124" y1="28" x2="124" y2="104" stroke="#93C5FD" strokeWidth="1.2" />
            <line x1="204" y1="28" x2="204" y2="142" stroke="#93C5FD" strokeWidth="1.2" />
            <line x1="44" y1="104" x2="172" y2="104" stroke="#93C5FD" strokeWidth="1.2" />
            <rect x="216" y="40" width="48" height="44" stroke="#DC2626" strokeWidth="1.5" />
            <rect x="60" y="46" width="48" height="40" stroke="#64748B" strokeWidth="1" strokeDasharray="3 2" />
            <rect x="142" y="46" width="44" height="40" stroke="#64748B" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        )}
      </div>

      {/* Monospace blueprint code in corner */}
      <span className="absolute bottom-3 left-4 font-mono text-[11px] text-slate-300 tracking-wide">
        {code}
      </span>
    </div>
  );
}
