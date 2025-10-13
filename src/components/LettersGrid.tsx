import React, { useEffect, useMemo, useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  labels: string[];     // month labels
  letters: string[];    // same length as labels
  className?: string;
};

export default function LettersGrid({
  title = "12 Letters",
  subtitle = "A little note for each month — starting from Oct 2024.",
  labels,
  letters,
  className = "",
}: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // safety: if someone passes fewer letters than labels
  const safeLetters = useMemo(
    () => labels.map((_, i) => letters[i] ?? ""),
    [labels, letters]
  );

  // allow Esc to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={className} style={{ width: "min(92vw, 1100px)" }}>
      <h2 style={{ margin: "0 0 6px", fontWeight: 800, color: "#4B1535" }}>
        {title}
      </h2>
      <p style={{ margin: "0 0 16px", opacity: 0.8, color: "#4B1535" }}>
        {subtitle}
      </p>

      {/* GRID: always shows 12 cards; no letter content here */}
      <div className="letters-grid">
        {labels.map((label, i) => (
          <button
            key={label + i}
            onClick={() => setOpenIdx(i)}
            className="letter-card"
            aria-label={`Open letter for ${label}`}
          >
            <span className="month-badge">{String(i + 1).padStart(2, "0")}</span>
            <span className="month-label">{label}</span>
            <span className="chev" aria-hidden>▶</span>
          </button>
        ))}
      </div>

      {/* MODAL: only shows when you click a card */}
      {openIdx !== null && (
        <div
          className="letter-backdrop"
          onClick={() => setOpenIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="letter-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              color: "#4B1535",
              background: "rgba(255,255,255,.85)",
              border: "1px solid rgba(255,255,255,.9)",
              boxShadow: "0 18px 50px rgba(75,21,53,.22)",
              borderRadius: 16,
              padding: 18,
              maxWidth: "min(92vw, 680px)",
              width: "min(92vw, 680px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="month-badge">{String(openIdx + 1).padStart(2, "0")}</span>
              <h3 style={{ margin: 0, fontWeight: 800 }}>{labels[openIdx]}</h3>
              <button
                onClick={() => setOpenIdx(null)}
                className="close-x"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6 }}>
              {/* preserve your line breaks */}
              <p style={{ whiteSpace: "pre-line", margin: 0 }}>
                {safeLetters[openIdx] || "No letter added yet."}
              </p>
            </div>

            {/* prev/next */}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button
                className="pill"
                onClick={() => setOpenIdx((prev) => (prev! + 11) % 12)}
              >
                ← Prev
              </button>
              <button
                className="pill"
                onClick={() => setOpenIdx((prev) => (prev! + 1) % 12)}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* styles local to this component */}
      <style>{`
        .letters-grid{
          display:grid;
          gap:12px;
          grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
        }
        @media (max-width:480px){
          .letters-grid{ grid-template-columns: 1fr; }
        }
        .letter-card{
          display:flex; align-items:center; gap:10px;
          padding:12px 14px;
          border-radius:14px;
          background: linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,.6));
          border:1px solid rgba(255,255,255,.85);
          box-shadow: 0 10px 28px rgba(75,21,53,.14);
          color:#4B1535;
          text-align:left;
          cursor:pointer;
          width:100%;
        }
        .letter-card:focus{ outline:2px solid #4B1535; outline-offset:2px; }
        .month-badge{
          flex:0 0 auto;
          display:inline-grid; place-items:center;
          width:32px; height:32px; border-radius:10px;
          font-weight:800; font-size:12px;
          color:#4B1535;
          background:#F3C8DD;
          border:1px solid rgba(255,255,255,.9);
        }
        .month-label{ font-weight:700; }
        .chev{ margin-left:auto; opacity:.55; }

        .letter-backdrop{
          position:fixed; inset:0; z-index:100;
          background: linear-gradient(180deg, rgba(75,21,53,.22), rgba(75,21,53,.35));
          display:grid; place-items:center;
          padding:16px;
          backdrop-filter: blur(4px);
        }
        .close-x{
          margin-left:auto;
          border:none; background:transparent; color:#4B1535;
          font-size:18px; line-height:1; cursor:pointer;
          opacity:.8;
        }
        .pill{
          padding:8px 12px; border-radius:999px;
          border:1px solid rgba(255,255,255,.9);
          background:#F3C8DD; color:#4B1535; font-weight:700; cursor:pointer;
        }
      `}</style>
    </div>
  );
}
