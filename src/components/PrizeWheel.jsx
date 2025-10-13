// src/components/PrizeWheel.jsx
import React, { useMemo, useRef, useState } from "react";

/**
 * Deterministic prize wheel: winner always matches pointer landing.
 * Key idea: rotate to an ABSOLUTE final angle so that
 *   finalNormalized = (360 - (i + 0.5) * sliceAngle) % 360
 * which puts the center of slice i at the top pointer.
 */
export default function PrizeWheel({
  prizes: rawPrizes = [
    "Kiss Coupon",
    "Love Letter",
    "Movie Night",
    "Massage Session",
    "Surprise Gift",
    "Breakfast in Bed",
    "Day Out",
    "Dinner Date",
  ],
  size = 520,
  onWin,
}) {
  // sanitize → no empty slices
  const prizes = useMemo(
    () => rawPrizes.map(String).map((s) => s.trim()).filter(Boolean),
    [rawPrizes]
  );
  const n = Math.max(prizes.length, 1);
  const slice = 360 / n;

  const [rotation, setRotation] = useState(0); // this is the actual applied deg
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState("");

  const wheelRef = useRef(null);
  const chosenIndexRef = useRef(null);

  const R = size / 2;
  const toRad = (d) => (d * Math.PI) / 180;

  const colors = ["#5b3aa8","#8B6C9C","#D76496","#7BD0D0","#C79EA0","#F4CD4E","#66D086","#7A6A83"];

  // Build slices starting at -90° so the "top" aligns with the pointer.
  const textR = R * 0.58;
  const arc = (a0, a1) => {
    const large = a1 - a0 > 180 ? 1 : 0;
    const sx = R + R * Math.cos(toRad(a0));
    const sy = R + R * Math.sin(toRad(a0));
    const ex = R + R * Math.cos(toRad(a1));
    const ey = R + R * Math.sin(toRad(a1));
    return `M ${R} ${R} L ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${ex} ${ey} Z`;
  };

  const slices = useMemo(() => {
    return Array.from({ length: n }).map((_, i) => {
      const start = -90 + i * slice;
      const end = start + slice;
      const mid = start + slice / 2;

      const lx = R + textR * Math.cos(toRad(mid));
      const ly = R + textR * Math.sin(toRad(mid));

      // keep labels upright-ish
      let txtRot = mid + 90;
      const norm = ((mid % 360) + 360) % 360;
      if (norm > 90 && norm < 270) txtRot += 180;

      return {
        i,
        label: prizes[i],
        color: colors[i % colors.length],
        path: arc(start, end),
        dividerX: R + R * Math.cos(toRad(end)),
        dividerY: R + R * Math.sin(toRad(end)),
        lx,
        ly,
        txtRot,
      };
    });
  }, [n, slice, prizes]);

  // normalize to 0–359
  const norm360 = (deg) => ((deg % 360) + 360) % 360;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner("");

    // choose a slice
    const idx = Math.floor(Math.random() * n);
    chosenIndexRef.current = idx;

    // We want the slice center at top after spin.
    // Absolute target "normalized" angle for that is:
    //   A = (360 - (idx + 0.5)*slice) % 360
    const targetNorm = norm360(360 - (idx + 0.5) * slice);

    // Build an ABSOLUTE final rotation value with extra full turns for drama.
    const fullTurns = 6; // feel free to tweak
    const currentAbs = rotation;                 // current absolute rotation
    const base = currentAbs - norm360(currentAbs); // drop current partial turn
    const finalAbs = base + fullTurns * 360 + targetNorm;

    // animate to finalAbs
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4200ms cubic-bezier(.2,.8,.1,1)";
    }
    requestAnimationFrame(() => setRotation(finalAbs));
  };

  const onEnd = () => {
    if (!spinning) return;

    const idx = chosenIndexRef.current ?? 0;
    const label = prizes[idx] || "";
    setWinner(label);
    onWin && onWin(label);

    // snap rotation to normalized angle to avoid huge numbers
    if (wheelRef.current) wheelRef.current.style.transition = "none";
    setRotation((prev) => {
      const bounded = norm360(prev);
      // force reflow so the next transition is applied
      // eslint-disable-next-line no-unused-expressions
      wheelRef.current && wheelRef.current.offsetHeight;
      if (wheelRef.current) wheelRef.current.style.transition = "";
      return bounded;
    });

    setSpinning(false);
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        gap: 14,
        color: "#4B1535",
        fontFamily:
          "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      <h2 style={{ margin: 0, fontWeight: 900 }}>Spin to win!</h2>

      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          filter: "drop-shadow(0 18px 36px rgba(75,21,53,0.2))",
        }}
      >
        {/* top pointer */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -Math.max(10, size * 0.025),
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: `${Math.max(10, size * 0.025)}px solid transparent`,
            borderRight: `${Math.max(10, size * 0.025)}px solid transparent`,
            borderBottom: `${Math.max(16, size * 0.04)}px solid #1b1b1b`,
            zIndex: 10,
          }}
        />

        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          style={{ borderRadius: "50%", display: "block" }}
        >
          <circle cx={R} cy={R} r={R * 0.985} fill="#fff" />
          <g
            ref={wheelRef}
            onTransitionEnd={onEnd}
            style={{
              transformOrigin: `${R}px ${R}px`,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {slices.map((s) => (
              <g key={s.i}>
                <path d={s.path} fill={s.color} />
                <line
                  x1={R}
                  y1={R}
                  x2={s.dividerX}
                  y2={s.dividerY}
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth={Math.max(1, size * 0.006)}
                />
                <g transform={`translate(${s.lx},${s.ly}) rotate(${s.txtRot})`}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fill: "#fff",
                      fontWeight: 900,
                      fontSize: Math.max(12, size * 0.035),
                      paintOrder: "stroke",
                      stroke: "rgba(0,0,0,0.25)",
                      strokeWidth: 1.2,
                    }}
                  >
                    {s.label}
                  </text>
                </g>
              </g>
            ))}
            <circle cx={R} cy={R} r={R * 0.12} fill="#fff" />
            <circle cx={R} cy={R} r={R * 0.07} fill="#F3C8DD" />
          </g>
        </svg>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        style={{
          padding: "14px 26px",
          borderRadius: 999,
          border: "none",
          cursor: spinning ? "not-allowed" : "pointer",
          background: spinning ? "#C46C95" : "#B75E89",
          color: "#fff",
          fontWeight: 900,
          boxShadow: "0 10px 24px rgba(75,21,53,.18)",
        }}
      >
        {spinning ? "Spinning..." : "Push here"}
      </button>

      {winner && (
        <div style={{ fontWeight: 900, marginTop: 6 }}>
          You won: <span style={{ fontWeight: 900 }}>{winner}</span>
        </div>
      )}
    </div>
  );
}
