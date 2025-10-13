import React, { useEffect, useMemo, useState } from "react";
import SimplePhotoCarousel from "./SimplePhotoCarousel";

/* tiny svg heart for the floating background */
function HeartSVG({ color = "#D14B63" }) {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden>
      <path
        d="M12 21s-6.716-4.293-9.428-7.005A6.5 6.5 0 1 1 12 5.172a6.5 6.5 0 1 1 9.428 8.823C18.716 16.707 12 21 12 21z"
        fill={color}
      />
    </svg>
  );
}

export default function HeartsReveal({
  headline = "Happy 1 Year to Us!!",
}) {
  // images from Vite public folder -> /public/ananya/*
  const pics = [
    "/ananya/IMG-20251011-WA0017.jpg",
    "/ananya/IMG-20251011-WA0012.jpg",
    "/ananya/IMG-20251011-WA0013.jpg",
    "/ananya/IMG-20251011-WA0014.jpg",
    "/ananya/IMG-20251011-WA0015.jpg",
    "/ananya/IMG-20251011-WA0016.jpg",
    "/ananya/IMG-20251011-WA0018.jpg",
    "/ananya/IMG-20251011-WA0019.jpg",
    "/ananya/IMG-20251011-WA0020.jpg",
    "/ananya/IMG-20251011-WA0021.jpg",
    "/ananya/IMG-20251011-WA0022.jpg",
    "/ananya/IMG-20251011-WA0023.jpg",
    "/ananya/IMG-20251011-WA0024.jpg",
    "/ananya/IMG-20251011-WA0025.jpg",
    "/ananya/IMG-20251011-WA0026.jpg",
    "/ananya/IMG-20251011-WA0027.jpg",
    "/ananya/IMG-20251011-WA0028.jpg",
    "/ananya/IMG-20251011-WA0029.jpg",
  ];

  const [vw, setVw] = useState(0);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // floating hearts
  const hearts = useMemo(() => {
    const shades = ["#D14B63", "#C04676", "#B43A7E", "#E0628B"];
    const count = 28;
    return Array.from({ length: count }).map((_, i) => {
      const size = 18 + Math.floor(Math.random() * 27); // 18..44
      const left = Math.random() * 100;                  // vw
      const duration = 8 + Math.random() * 7;            // 8..15s
      const delay = Math.random() * 3;
      const drift = (Math.random() - 0.5) * 60;
      const rotate = (Math.random() - 0.5) * 60;
      const color = shades[i % shades.length];
      return { id: i, size, left, duration, delay, drift, rotate, color };
    });
  }, []);

  return (
    <section
      id="photos"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 16px 56px",
        scrollMarginTop: 120, // account for fixed navbar on anchor jump
      }}
    >
      {/* animations + helpers */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes heart-fall-y {
          0%   { transform: translateY(-12vh); opacity: 0; }
          10%  { opacity: 0.9; }
          100% { transform: translateY(112vh); opacity: 0; }
        }
        @keyframes heart-drift-x {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(var(--drift, 0px)); }
          100% { transform: translateX(0); }
        }
        @keyframes reveal-pop {
          0%   { opacity: 0; transform: translateY(8px) scale(0.985); }
          60%  { opacity: 1; transform: translateY(0) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes reveal-fade {
          0%   { opacity: 0; transform: scale(0.985); }
          100% { opacity: 1; transform: scale(1); }
        }
        .reveal-headline { animation: reveal-pop 620ms ease-out both; }
        .reveal-body { animation: reveal-fade 720ms ease-out 80ms both; }
      `}</style>

      {/* floating hearts bg */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {hearts.map((h) => (
          <div
            key={h.id}
            style={{
              position: "absolute",
              top: "-10vh",
              left: `${h.left}vw`,
              width: h.size,
              height: h.size,
              opacity: 0.9,
              filter: "drop-shadow(0 2px 2px rgba(75,21,53,0.18))",
              transform: `rotate(${h.rotate}deg)`,
              animation: `heart-fall-y ${h.duration}s linear ${h.delay}s infinite`,
            }}
          >
            <div
              style={{
                animation: `heart-drift-x ${Math.max(6, h.duration - 2)}s ease-in-out ${h.delay}s infinite`,
                "--drift": `${h.drift}px`,
              }}
            >
              <HeartSVG color={h.color} />
            </div>
          </div>
        ))}
      </div>

      {/* foreground content */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "grid", placeItems: "center" }}>
        <h1
          className="reveal-headline"
          style={{
            margin: "6px 0 14px",
            fontSize: vw > 900 ? 64 : vw > 640 ? 56 : 40,
            lineHeight: 1.1,
            color: "#4B1535",
            fontFamily: "'Great Vibes', cursive",
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          {headline}
        </h1>

        {/* polished carousel */}
        <div className="reveal-body" style={{ marginTop: 8, width: "100%" }}>
          <SimplePhotoCarousel
            images={pics}
            maxWidth={600}   // nice desktop size; auto shrinks on mobile
            borderRadius={14}
            fadeMs={420}
          />
        </div>
      </div>
    </section>
  );
}
