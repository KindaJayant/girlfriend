import React, { useEffect, useMemo, useState } from "react";
import { chatData } from "../data/chatData";

function Card({ children, style }) {
  return (
    <div
      style={{
        background: "#fff0f6",
        padding: "1.2rem",
        borderRadius: 12,
        boxShadow: "0 6px 14px rgba(75,21,53,0.10)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <Card style={{ textAlign: "center" }}>
      <div style={{ fontSize: 13, opacity: 0.75, color: "#4B1535" }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: "#4B1535", marginTop: 4 }}>
        {value}
      </div>
      {subtitle ? (
        <div style={{ fontSize: 12, opacity: 0.65, marginTop: 2, color: "#4B1535" }}>
          {subtitle}
        </div>
      ) : null}
    </Card>
  );
}

/** Time Together counter */
function TimeTogether({ startLocal = "2024-10-14T00:00:00" }) {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const start = new Date(startLocal);

  // Clamp future-start to zeros (before anniversary)
  if (now < start) {
    return (
      <div style={{ margin: "0 auto 20px", maxWidth: 980 }}>
        <h2 style={{ textAlign: "center", color: "#4B1535", fontWeight: 800 }}>
          Time Together
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {["Years","Months","Days","Hours","Minutes","Seconds"].map((l)=>(
            <div key={l} style={{ background:"rgba(255,255,255,0.9)", borderRadius:14, padding:"1rem .8rem", minWidth:92, textAlign:"center", boxShadow:"0 6px 16px rgba(75,21,53,0.08)" }}>
              <div style={{ fontSize:28, fontWeight:800, color:"#B75E89" }}>00</div>
              <div style={{ fontSize:12, opacity:.7 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Calendar-accurate Y/M/D ---
  let y = now.getFullYear() - start.getFullYear();
  let m = now.getMonth() - start.getMonth();
  let d = now.getDate() - start.getDate();

  // Borrow days from previous month if needed
  if (d < 0) {
    const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    d += prevMonthLastDay;
    m -= 1;
  }
  // Borrow months from previous year if needed
  if (m < 0) {
    m += 12;
    y -= 1;
  }

  // Anchor to start + y/m/d to get exact remaining h/m/s (DST-safe)
  const anchor = new Date(start);
  anchor.setFullYear(anchor.getFullYear() + y);
  anchor.setMonth(anchor.getMonth() + m);
  anchor.setDate(anchor.getDate() + d);

  let remMs = Math.max(0, now - anchor);
  const hours = Math.floor(remMs / 3600000); remMs -= hours * 3600000;
  const minutes = Math.floor(remMs / 60000); remMs -= minutes * 60000;
  const seconds = Math.floor(remMs / 1000);

  const Box = ({ label, value }) => (
    <div
      style={{
        background: "rgba(255,255,255,0.9)",
        borderRadius: 14,
        padding: "1rem .8rem",
        minWidth: 92,
        textAlign: "center",
        boxShadow: "0 6px 16px rgba(75,21,53,0.08)",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800, color: "#B75E89" }}>
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ margin: "0 auto 20px", maxWidth: 980 }}>
      <h2 style={{ textAlign: "center", color: "#4B1535", fontWeight: 800 }}>
        Time Together
      </h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Box label="Years" value={y} />
        <Box label="Months" value={m} />
        <Box label="Days" value={d} />
        <Box label="Hours" value={hours} />
        <Box label="Minutes" value={minutes} />
        <Box label="Seconds" value={seconds} />
      </div>
    </div>
  );
}


/** Activity chart with hour labels and gradients */
function ActivityByHour({ data }) {
  const max = Math.max(...data);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div style={{ margin: "28px auto 0", maxWidth: 980 }}>
      <h3 style={{ margin: "0 0 10px", color: "#4B1535" }}>Activity by Hour</h3>
      <Card style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
            height: 160,
            justifyContent: "space-between",
          }}
        >
          {hours.map((h, i) => (
            <div
              key={i}
              title={`${h}:00 — ${data[i]} messages`}
              style={{
                height: `${(data[i] / max) * 140}px`,
                width: 16,
                borderRadius: 6,
                background: `linear-gradient(180deg, #B43A7E, #E87CA5)`,
                transition: "height 0.4s ease",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            opacity: 0.7,
            marginTop: 8,
          }}
        >
          <span>Night</span>
          <span>Morning</span>
          <span>Afternoon</span>
          <span>Evening</span>
        </div>
      </Card>
    </div>
  );
}

export default function Memories() {
  const {
    totalMessages,
    messagesPerDay,
    topSender,
    topSenderCount,
    mostActiveHour,
    hourlyActivity,
    topWords,
    totalCalls,
    totalVoiceNotes,
    longestStreak,
    firstMessage,
    firstDate,
    lastMessage,
    lastDate,
  } = chatData;

  return (
    <section id="memories" style={{ padding: "48px 16px", color: "#4B1535" }}>
      <style>{`
        @media (max-width: 860px){
          .stats-grid{ grid-template-columns: repeat(2, minmax(220px, 1fr)); }
        }
        @media (max-width: 560px){
          .stats-grid{ grid-template-columns: 1fr; }
        }
      `}</style>

      <TimeTogether />

      <Card
        style={{
          margin: "14px auto 20px",
          maxWidth: 980,
          display: "grid",
          gap: 8,
        }}
      >
        <div>
          <b>First Message:</b> “{firstMessage}” — {firstDate}
        </div>
        <div>
          <b>Latest Message:</b> “{lastMessage}” — {lastDate}
        </div>
      </Card>

      <div
        className="stats-grid"
        style={{
          margin: "0 auto",
          maxWidth: 980,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <StatCard
          title="Total Messages"
          value={totalMessages.toLocaleString()}
          subtitle={`${messagesPerDay}/day`}
        />
        <StatCard
          title="Top Sender"
          value={topSender}
          subtitle={`${topSenderCount} messages`}
        />
        <StatCard title="Most Active Hour" value={mostActiveHour} subtitle="hourly peak" />
        <StatCard title="Total Calls" value={totalCalls} subtitle="voice + video" />
        <StatCard title="Voice Notes" value={totalVoiceNotes} subtitle="sent & received" />
        <StatCard title="Longest Streak" value={`${longestStreak} days`} subtitle="no missed day" />
      </div>

      <ActivityByHour data={hourlyActivity} />

      <div style={{ margin: "28px auto 0", maxWidth: 980 }}>
        <h3 style={{ margin: "0 0 10px" }}>Top Words</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12,
          }}
        >
          {topWords.map((w, i) => (
            <Card key={i} style={{ textAlign: "center", padding: "0.8rem" }}>
              <strong>{w.word}</strong>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{w.count} uses</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
