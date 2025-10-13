// src/components/Songs.jsx
import React from "react";

/**
 * Paste real Spotify links for the 3 tracks that failed (IDs differ by region).
 * How:
 *  1) Open Spotify → find the song → Share → Copy Song Link.
 *  2) Paste into the 'spotifyUrl' fields below (the ones set to "").
 * We auto-convert https://open.spotify.com/track/<id> to the embed URL.
 */

function toEmbedSrc(spotifyUrlOrId) {
  if (!spotifyUrlOrId) return "";
  // Accept raw track ID or full URL
  let id = spotifyUrlOrId.trim();
  const m = id.match(/open\.spotify\.com\/track\/([A-Za-z0-9]+)/i);
  if (m) id = m[1];
  // Basic validation
  if (!/^[A-Za-z0-9]{10,}$/.test(id)) return "";
  return `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
}

export default function Songs() {
  const cards = [
    // ✅ These 4 were already working for you
    {
      title: "O Rangrez — Bhaag Milkha Bhaag",
      artist: "Shankar–Ehsaan–Loy, Shreya Ghoshal, Javed Bashir",
      spotifyUrl: "5JCDVLwteSXuwVqjCa7SwH",
    },
    {
      title: "Tum Tak — Raanjhanaa",
      artist: "A.R. Rahman, Javed Ali, Kirti Sagathia, Pooja AV",
      spotifyUrl: "2WOgcZxk0oPGjAOTnBJz2B",
    },
    {
      title: "Tum Hi Ho — Aashiqui 2",
      artist: "Mithoon, Arijit Singh",
      spotifyUrl: "56zZ48jdyY2oDXHVnwg5Di",
    },


    // ❗ Paste the real links for these 3 (IDs vary by release/region)
    {
      title: "Ye Tune Kya Kiya — Once Upon A Time In Mumbai Dobara",
      artist: "Pritam, Javed Bashir",
      spotifyUrl: "https://open.spotify.com/track/2cPUB8EOT6AfJ8oxhyoNXL?si=91b2f11ac9e34d7d", // ← paste full song link here (e.g., https://open.spotify.com/track/XXXXXXXXXXXX)
    },
    {
      title: "For A Reason — Karan Aujla",
      artist: "Karan Aujla, Ikky",
      spotifyUrl: "https://open.spotify.com/track/0cYohCh24y1aMjJmcS9RBl?si=9a27d94034bc468a", // ← paste full song link here
    },
    {
      title: "Pal Pal Dil Ke Paas — Title Track",
      artist: "Arijit Singh, Parampara Thakur",
      spotifyUrl: "https://open.spotify.com/track/71j40GUuIgwpEGmoupat2O?si=e9db0dcdfd0542de", // ← paste full song link here
    },
  ];

  const visibleCards = cards
    .map((c) => ({ ...c, embedSrc: toEmbedSrc(c.spotifyUrl) }))
    .filter((c) => !!c.embedSrc); // hide cards until a valid link/ID is provided

  return (
    <section
      id="songs"
      style={{
        padding: "36px 16px 56px",
        display: "grid",
        placeItems: "center",
        background: "#FFF5F9",
        color: "#4B1535",
        fontFamily:
          "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      <div style={{ width: "min(1100px, 92vw)" }}>
        <h2 style={{ fontWeight: 900, margin: "0 0 18px", letterSpacing: 0.2 }}>
          Songs for Ananya
        </h2>
        <p style={{ margin: "0 0 20px", opacity: 0.9 }}>
          Handpicked tracks for you, tap play and enjoy 💗
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {visibleCards.map((c, i) => (
            <div
              key={`${c.title}-${i}`}
              style={{
                background: "#ffffff",
                border: "1px solid rgba(75,21,53,0.08)",
                borderRadius: 16,
                padding: 14,
                boxShadow: "0 10px 24px rgba(75,21,53,.10)",
                display: "grid",
                gap: 10,
              }}
            >
              <div>
                <div style={{ fontWeight: 800, marginBottom: 4 }}>{c.title}</div>
                <div style={{ fontSize: 13, opacity: 0.85 }}>{c.artist}</div>
              </div>

              <div
                style={{
                  overflow: "hidden",
                  borderRadius: 12,
                  border: "1px solid rgba(75,21,53,0.06)",
                }}
              >
                <iframe
                  title={c.title}
                  style={{ border: 0, width: "100%", height: 152 }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  src={c.embedSrc}
                  referrerPolicy="origin"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Helper hint only if some cards are hidden */}
        {visibleCards.length < cards.length && (
          <div
            style={{
              marginTop: 12,
              fontSize: 13,
              opacity: 0.8,
            }}
          >
            Tip: For any missing song, open Spotify → song → Share → <b>Copy
            song link</b> → paste it into <code>spotifyUrl</code> in
            <code> Songs.jsx</code>. We’ll auto-embed it.
          </div>
        )}
      </div>
    </section>
  );
}
 