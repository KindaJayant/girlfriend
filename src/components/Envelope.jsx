// Flat, centered, scalable envelope (pure SVG). Click to open.
export default function Envelope({ onOpen }) {
  // Size: scales but stays big; bump 560 to 640/720 if you want larger
  const wrap = { width: "min(90vw, 560px)" };

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={onOpen}
        aria-label="Open"
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <div style={wrap}>
          <svg
            viewBox="0 0 560 420"
            width="100%"
            height="auto"
            role="img"
            aria-label="Love envelope"
          >
            {/* Envelope body */}
            <rect
              x="20"
              y="50"
              rx="20"
              ry="20"
              width="520"
              height="320"
              fill="#D183A9"
            />

            {/* Diagonal seams */}
            <path
              d="M60 330 L280 200 L500 330"
              fill="none"
              stroke="#B75E89"
              strokeWidth="4"
            />
            <path
              d="M60 90 Q90 120 120 140"
              fill="none"
              stroke="#B75E89"
              strokeWidth="4"
            />
            <path
              d="M500 90 Q470 120 440 140"
              fill="none"
              stroke="#B75E89"
              strokeWidth="4"
            />
            <path
              d="M60 350 Q90 330 120 320"
              fill="none"
              stroke="#B75E89"
              strokeWidth="4"
            />

            {/* Top flap (flat triangle) */}
            <path d="M40 70 L520 70 L280 230 Z" fill="#C46C95" />

            {/* Heart seal — perfectly centered at (280,210) */}
            <g transform="translate(280,210)">
              <path
                d="
                  M 0 24
                  C -22 10, -44 -4, -44 -24
                  C -44 -44, -20 -52, 0 -34
                  C 20 -52, 44 -44, 44 -24
                  C 44 -4, 22 10, 0 24
                  Z
                "
                fill="#D14B63" /* use #E53935 for brighter red */
              />
            </g>
          </svg>
        </div>
      </button>

      {/* Caption under the envelope */}
      <div
        style={{
          marginTop: "16px",
          color: "#3A345B", // jacarta
          fontWeight: 600,
          fontSize: "18px",
          letterSpacing: "0.3px",
        }}
      >
        Click for a Surprise!!
      </div>
    </div>
  );
}
