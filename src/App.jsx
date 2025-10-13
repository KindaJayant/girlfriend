import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Envelope from "./components/Envelope";
import HeartsReveal from "./components/HeartsReveal";
import LettersGrid from "./components/LettersGrid";
import Memories from "./components/Memories";
import PrizeWheel from "./components/PrizeWheel";
import Songs from "./components/Songs";
import ThingsILove from "./components/ThingsILove";

export default function App() {
  const [opened, setOpened] = useState(false);

  const letterLabels = [
    "Oct 2024",
    "Nov 2024",
    "Dec 2024",
    "Jan 2025",
    "Feb 2025",
    "Mar 2025",
    "Apr 2025",
    "May 2025",
    "Jun + Jul 2025",
    "Aug 2025",
    "Sep 2025",
    "Oct 2025",
  ];

  const letters = new Array(12).fill("");

  return (
    <div style={{ minHeight: "100vh", background: "#F3C8DD" }}>
      {/* show navbar only after envelope opens */}
      {opened && <Navbar />}
      {!opened ? (
        <Envelope onOpen={() => setOpened(true)} />
      ) : (
        <>
          <HeartsReveal />

          {/* ===== Letters Section ===== */}
          <section
            id="letters"
            style={{
              scrollMarginTop: 90,
              padding: "64px 16px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <LettersGrid
              title="12 Letters"
              subtitle="A little note for each month — starting from Oct 2024."
              labels={letterLabels}
              letters={letters}
            />
            <div
              style={{
                marginTop: 18,
                width: "min(92vw, 1100px)",
                borderRadius: 18,
                padding: 20,
                color: "#4B1535",
                background: "rgba(255,255,255,.60)",
                border: "1px solid rgba(255,255,255,.85)",
                boxShadow: "0 14px 36px rgba(75,21,53,.14)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>
                Special Letter — Now &amp; Future ✨
              </h3>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Reserved space for your extra message about us right now and
                the future we’re building. I’ll hook this into a modal exactly
                like the monthly letters when you share the text.
              </p>
            </div>
          </section>

          {/* ===== Memories Section ===== */}
          <section
            id="memories"
            style={{
              scrollMarginTop: 90,
              padding: "64px 16px 96px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Memories />
          </section>

          {/* ===== Prize Wheel ===== */}
<section id="wheel" style={{ padding: "64px 16px", display: "grid", placeItems: "center" }}>
  <PrizeWheel
    size={520} // tweak size to taste
    prizes={[
      "Massage Session 💆‍♀️",
      "Movie Night 🎬",
      "Surprise Gift 🎁",
      "Dinner Date 🍽️",
      "Breakfast in Bed 🍳",
      "Day Out 🌤️",
      "Love Letter 💌",
      "Kiss Coupon 💋",
    ]}
    onWin={(p) => console.log("Winner:", p)}
  />
</section>

          {/* ===== Songs Section ===== */}
          <section
            id="songs"
            style={{
              padding: "64px 16px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Songs />
          </section>

          {/* ===== Things I Love Section ===== */}
          <section
            id="love"
            style={{
              padding: "64px 16px 128px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <ThingsILove />
          </section>
        </>
      )}
    </div>
  );
}
