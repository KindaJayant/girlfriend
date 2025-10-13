import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        .glass {
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 10px 30px rgba(75,21,53,0.12);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .nav-link {
          padding: 10px 14px;
          border-radius: 999px;
          color: #4B1535;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: .2px;
        }
        .nav-link:hover { background: rgba(183,94,137,0.12); }

        /* visibility rules */
        .desktop { display: none; }
        .mobile { display: none; }
        @media (min-width: 781px) { .desktop { display: flex; } }
        @media (max-width: 780px) { .mobile { display: block; } }
      `}</style>

      <nav
        className="glass"
        style={{
          position: "fixed",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(92vw, 1100px)",
          height: 60,
          borderRadius: 16,
          padding: "0 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
          transition: "box-shadow .2s ease, transform .2s ease",
          ...(scrolled ? { boxShadow: "0 12px 30px rgba(75,21,53,0.16)" } : {}),
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontWeight: 800,
              color: "#4B1535",
              fontSize: 18,
              letterSpacing: .5,
            }}
          >
          </span>
        </div>

        {/* Desktop links only */}
        <div className="desktop" style={{ gap: 8 }}>
          <a href="#photos" className="nav-link">Photos</a>
          <a href="#letters" className="nav-link">12 Letters</a>
          <a href="#memories" className="nav-link">Memories</a>
        </div>

        {/* Mobile burger only (hidden on desktop by CSS) */}
        <button
          className="mobile"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-controls="mobile-menu"
          style={{
            width: 38, height: 38, borderRadius: 12,
            border: "1px solid rgba(255,255,255,.7)",
            background: "rgba(255,255,255,.55)",
            color: "#4B1535", fontSize: 20, fontWeight: 800
          }}
        >
          {open ? "×" : "≡"}
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div
          id="mobile-menu"
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 40,
            background: "rgba(0,0,0,.15)",
          }}
        >
          <div
            className="glass"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: 80,
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(92vw, 520px)",
              borderRadius: 16,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <a href="#photos" onClick={close} className="nav-link">Photos</a>
            <a href="#letters" onClick={close} className="nav-link">12 Letters</a>
            <a href="#memories" onClick={close} className="nav-link">Memories</a>
          </div>
        </div>
      )}
    </>
  );
}
