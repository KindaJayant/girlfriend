import React from "react";

const CARD = {
  bg: "#fff",
  radius: 16,
  shadow: "0 10px 24px rgba(75,21,53,0.10)",
};

export default function ThingsILove({
  title = "Things I Love About You",
  subtitle = "Here is a small portion of them",
  items = [
    { icon: "🌞", text: "Your smile lights up the room and instantly makes my day better." },
    { icon: "🫶", text: "You have been so supportive of me in the toughest of times." },
    { icon: "🤪", text: "You are the cutest girl/billi/meri bachi I've ever seen" },
    { icon: "📝", text: "You notice the little details about me that most people miss." },
    { icon: "🌱", text: "You’re brave enough to be yourself, and it inspires me to do the same." },
    { icon: "💗", text: "The things you love, you love them unapologetically." },
  ],
}) {
  return (
    <section id="reasons" style={{ padding: "48px 16px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", color: "#4B1535", fontWeight: 800, margin: 0 }}>
          {title}
        </h2>
        <p style={{ textAlign: "center", color: "#4B1535", opacity: 0.8, marginTop: 6 }}>
          {subtitle}
        </p>

        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                background: CARD.bg,
                borderRadius: CARD.radius,
                boxShadow: CARD.shadow,
                padding: "14px 16px",
                display: "grid",
                gridTemplateColumns: "32px 1fr",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 20 }}>{it.icon}</div>
              <div style={{ color: "#4B1535" }}>{it.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
