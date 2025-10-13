import React, { useMemo, useState } from "react";

type LettersGridProps = {
  /** Section heading */
  title?: string;
  /** Small subtitle under heading */
  subtitle?: string;
  /** 12 labels for the tiles (e.g., months). If omitted, uses Jan–Dec. */
  labels?: string[];
  /** 12 letter texts. If omitted, placeholder text is shown. */
  letters?: string[];
  /** Optional callback when a letter is opened */
  onOpenLetter?: (index: number) => void;
};

const LettersGrid: React.FC<LettersGridProps> = ({
  title = "12 Letters",
  subtitle = "A little note for every month ♡",
  labels,
  letters,
  onOpenLetter,
}) => {
  // Default labels
  const defaultLabels = useMemo<string[]>(
    () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    []
  );

  const tileLabels: string[] =
    labels && labels.length === 12 ? labels : defaultLabels;

  // Build data with fallback text
  const data = useMemo(
    () =>
      tileLabels.map((label: string, idx: number) => ({
        label,
        text:
          (letters && letters[idx]) ||
          `My letter for ${label}. Replace this with your heartfelt note.`,
      })),
    [letters, tileLabels]
  );

  // Modal state: -1 = closed; otherwise index 0..11
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const close = (): void => setOpenIndex(-1);
  const next = (): void =>
    setOpenIndex((i) => ((i + 1) % 12 + 12) % 12);
  const prev = (): void =>
    setOpenIndex((i) => ((i - 1) % 12 + 12) % 12);

  const open = (idx: number): void => {
    setOpenIndex(idx);
    if (onOpenLetter) onOpenLetter(idx);
  };

  return (
    <div style={{ width: "min(92vw, 1100px)", color: "#4B1535" }}>
      <style>{`
        .letters-wrap h2 { margin: 0 0 6px; font-size: 30px; }
        .letters-sub { margin: 0 0 18px; opacity: .8; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }

        .glass {
          background: rgba(255,255,255,.60);
          border: 1px solid rgba(255,255,255,.85);
          box-shadow: 0 14px 36px rgba(75,21,53,.14);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .tile {
          position: relative;
          border-radius: 16px;
          padding: 18px 16px;
          text-align: left;
          cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .tile:hover { transform: translateY(-2px); box-shadow: 0 18px 42px rgba(75,21,53,.18); }

        .month { display: inline-flex; align-items: center; gap: 8px; font-weight: 800; letter-spacing: .4px; }
        .badge {
          width: 26px; height: 26px; border-radius: 999px;
          background: #D183A9; color: #fff; font-size: 14px;
          display: inline-grid; place-items: center;
          box-shadow: 0 4px 10px rgba(183,94,137,.35);
        }
        .hint { margin-top: 8px; font-size: 13px; opacity: .75; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* Modal */
        .sheet-backdrop { position: fixed; inset: 0; z-index: 60; background: rgba(0,0,0,.25); display: grid; place-items: center; padding: 16px; }
        .sheet {
          width: min(92vw, 760px); max-height: 82vh; overflow: auto;
          border-radius: 18px; color: #4B1535; padding: 22px 18px;
          background: rgba(255,255,255,.75); border: 1px solid rgba(255,255,255,.9);
          box-shadow: 0 20px 50px rgba(75,21,53,.22); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          animation: pop .22s ease-out both;
        }
        @keyframes pop { from { opacity:0; transform: translateY(6px) scale(.98); } to { opacity:1; transform:none; } }
        .sheet h3 { margin: 0 0 6px; font-size: 24px; }
        .sheet .sub { margin: 0 0 14px; opacity: .75; font-size: 13px; }
        .sheet .body { line-height: 1.6; font-size: 16px; white-space: pre-wrap; }
        .topbar { display:flex; align-items:center; justify-content: space-between; gap:10px; position: sticky; top: -6px; background: transparent; padding-bottom: 4px; }
        .icon-btn {
          border: 1px solid rgba(255,255,255,.9);
          background: rgba(255,255,255,.9);
          color: #4B1535;
          border-radius: 12px;
          width: 36px; height: 36px; display: grid; place-items: center;
          cursor: pointer;
        }
        .footer-nav { display:flex; align-items:center; justify-content: space-between; gap:8px; margin-top: 16px; }
      `}</style>

      <div className="letters-wrap">
        <h2>{title}</h2>
        <p className="letters-sub">{subtitle}</p>

        <div className="grid">
          {data.map((item: { label: string; text: string }, idx: number) => (
            <button
              key={item.label}
              className="tile glass"
              onClick={() => open(idx)}
              aria-label={`Open ${item.label} letter`}
            >
              <div className="month">
                <span className="badge">{String(idx + 1).padStart(2, "0")}</span>
                {item.label}
              </div>
              <div className="hint">{item.text}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openIndex !== -1 && (
        <div className="sheet-backdrop" onClick={close}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="topbar">
              <div style={{ fontWeight: 800 }}>{data[openIndex].label} Letter</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="icon-btn" onClick={prev} aria-label="Previous">‹</button>
                <button className="icon-btn" onClick={next} aria-label="Next">›</button>
                <button className="icon-btn" onClick={close} aria-label="Close">×</button>
              </div>
            </div>

            <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 28, marginTop: 6 }}>
              To my love 💌
            </h3>
            <p className="sub">Tile {openIndex + 1} • {data[openIndex].label}</p>
            <div className="body">{data[openIndex].text}</div>

            <div className="footer-nav">
              <button className="icon-btn" onClick={prev} aria-label="Previous">‹</button>
              <button className="icon-btn" onClick={next} aria-label="Next">›</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LettersGrid;
