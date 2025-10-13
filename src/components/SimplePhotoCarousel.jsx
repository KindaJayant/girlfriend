import React, { useEffect, useRef, useState } from "react";

/**
 * SimplePhotoCarousel (fade + swipe, screen-fit, clean dots)
 */
export default function SimplePhotoCarousel({
  images = [],
  maxWidth = 600,
  maxHeightVh = 70,
  borderRadius = 16,
  fadeMs = 420,
}) {
  const [i, setI] = useState(0);
  const len = images.length || 1;

  const wrapRef = useRef(null);
  const stackRef = useRef(null);

  const prev = () => setI((n) => (n - 1 + len) % len);
  const next = () => setI((n) => (n + 1) % len);
  const goto = (k) => setI(k);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line

  // swipe / drag
  const startX = useRef(0);
  const deltaX = useRef(0);
  const dragging = useRef(false);

  const onPointerDown = (e) => {
    dragging.current = true;
    deltaX.current = 0;
    startX.current = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch {}
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const x = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    deltaX.current = x - startX.current;
  };
  const onPointerUp = () => {
    if (!dragging.current || !wrapRef.current) { dragging.current = false; return; }
    const width = wrapRef.current.getBoundingClientRect().width || 1;
    const threshold = Math.min(120, Math.max(40, width * 0.12));
    if (deltaX.current > threshold) prev();
    else if (deltaX.current < -threshold) next();
    dragging.current = false;
    deltaX.current = 0;
  };

  const vhLimit = Math.max(40, Math.min(100, maxHeightVh));

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: `min(92vw, ${maxWidth}px)`,
        maxHeight: `${vhLimit}vh`,
        margin: "0 auto",
        userSelect: "none",
        touchAction: "pan-y",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* sizing image in flow gives wrapper height for current photo */}
      {len > 0 && (
        <img
          src={images[i]}
          alt=""
          draggable={false}
          style={{
            width: "100%",
            height: "auto",
            visibility: "hidden",
            display: "block",
            maxHeight: `${vhLimit}vh`,
          }}
        />
      )}

      {/* slides stack */}
      <div
        ref={stackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius,
          boxShadow: "0 18px 40px rgba(75,21,53,0.18)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.28))",
          border: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        {images.map((src, idx) => {
          const active = idx === i;
          return (
            <img
              key={src + idx}
              src={src}
              alt=""
              draggable={false}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",        // full photo visible
                maxHeight: `${vhLimit}vh`,
                display: "block",
                WebkitUserDrag: "none",
                opacity: active ? 1 : 0,
                transform: active ? "scale(1)" : "scale(1.01)",
                filter: active ? "none" : "blur(0.2px)",
                transition: `opacity ${fadeMs}ms ease, transform ${fadeMs}ms ease`,
                pointerEvents: active ? "auto" : "none",
              }}
            />
          );
        })}

        {/* subtle inner vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.10) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* arrows */}
      {len > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            style={arrowGlass({ left: 10 })}
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            style={arrowGlass({ right: 10 })}
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* clean dots */}
      {len > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 12,
          }}
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goto(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                background: idx === i ? "#4B1535" : "#B75E89",
                opacity: idx === i ? 1 : 0.55,
                transform: idx === i ? "scale(1.2)" : "scale(1)",
                transition: "transform .15s ease, opacity .15s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* Inline chevrons */
function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function arrowGlass(pos) {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: 999,
    display: "grid",
    placeItems: "center",
    color: "#4B1535",
    border: "1px solid rgba(255,255,255,.75)",
    background: "rgba(255,255,255,.7)",
    boxShadow: "0 10px 20px rgba(75,21,53,0.18)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    cursor: "pointer",
    ...pos,
  };
}
