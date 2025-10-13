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
    "Oct 2024","Nov 2024","Dec 2024","Jan 2025",
    "Feb 2025","Mar 2025","Apr 2025","May 2025",
    "Jun + Jul 2025","Aug 2025","Sep 2025","Oct 2025",
  ];

  const letters = [
    `October 2024 💌
    Our first month of being us, even though the start was a bit wonky but still we made it through and made so many memories and there couldn't have been a better start to our story, I still cherish that month and think of it as the best time of my life, truly the best and since then my life has completely revolved around you and you have made it worth living..`,
    `November 2024 🌙
    Ah November, The month where SO MUCH HAPPENED, from Bangr to our cute meetups between my SAT work, I miss it so much, everything was so perfect, we have been so so good together, every month of ours seems to be better than before but somehow it all is equally so important, to me and I'm sure to you as well, I love you so much baby.`,
    `December 2024 ❄️
    December, our first challenge with vacations coming, but it was still full of love and happiness, I loved our walks raatko in the cold, you making fun of me, "aapko kitni thand lagti hai!!", you are the cutest person I've ever seen, I won't mention the bad parts because I'm sure we're way past those now, and all we have now are small(er) kalesh's and a whole lot of love`,
    `January 2025 ☀️
    The start of our 2025 was a bit wack-y with my screw-ups and not giving enough attention, however we've handled all of that amazingly, I can't appreciate you enough for giving me chances repeatedly after how bad I was to you, the more I think about that (and you), the more I fall in love with you, and I'm in awe of what did I do to deserve you`,
    `February 2025 ❤️
    Februrary was so fun!! I can remember it like yesterday, URJA, and our 4 month anniversary, and our first uhm uhm. It was so good, we finally got to dress up and go out as a couple, and then came back to have so much fun, I look back at it so fondly, you've been a flawless partner always, and I can't appreciate it enough, I love you cutie.`,
    `March 2025 🌸
    Our March was pretty lowkey with a lot of time spent at home by me(post MST) and no major stuff happening, but still we made time for each other everyday and all of those moments helped us reach where we are right now, and I'll always cherish every single one of those moments, always.`,
    `April 2025 🌼
    I was hesitant if I should write about this month or not, because this was truly the most challenging time for us, being at crossroads of whether to keep going or not, but somehow you believed in me and us, and it paid off, at least that's what I like to believe, I'm grateful to you for it, and for a million other things, you're the most special person in my life, since the day we got together to this day, no one has and no one will ever come close. `,
    `May 2025 🌤️
    Another tough month, at least the start, but our tough stuff quickly started to fade and we were able to get back to our usual lovey dovey selves and it was so good, especially "Raid-2", where we didn't even watch a bit of the movie and it seemed like a new start to our already 6-7 month old relationship, but another challenge was yet to come, the long 2 month vacay.`,
    `June + July 2025 🌈
    The tough vacations began, although the start was so amazing, with our date when you visited me, the movie and us eating at that nice place with mid food, that date was one of our best, I miss it, but then the hard part began, 50 days apart with 0 possible meet-ups and I believe it was one of, if not the hardest phases of our relationships, but it was all worth it because we persevered, I finally saw that side of you where you help me grow professionaly, and you have done it every day ever since, and since that I've realized that even if I feel completely alone, I'll always have a cutie bachi rooting for me, my cutie bachi<3.`,
    `August 2025 ☔
    And we were finally back!! I still remember how we were SO HAPPY to see each other jab you arrived, that hug was majestic, and so memorable too, I really really missed you over those vacations and all I wanted was to meet you, and keep meeting you everyday, and I'm glad we've been able to do that. There were hard times ofcourse, ZS and Bain but that's okay, that's life, I know you'll always support me like you have and I just saw you as my rock who will always motivate me and push me to do better, and work harder, like you always have. Plus you were able to make my birthday the best birthday I ever had, you are so special. I admire you so much<3`,
    `September 2025 🍂
    Another tough phase, with me being dejected over facing rejections and a lack of opportunities and our difficulties, yet still we had so many good moments and I've always had this voice from within me telling me to keep putting effort in this relationship without giving up, and I'm really thankful to that voice because yeah it truly has been the best decision of mine, choosing you, and choosing you every single day.`,
    `October 2025 🎂💖
    The month which is leading us to this huge milestone of ONE YEAR, it has been so amazing, somehow all of the difficulties have started to fade, and I look forward to meeting you everyday without fail, we've been able to keep the kalesh's away and let our love prosper, which has been so so good, I knew that this is that kind of relationship which just keeps getting better, and it has. I love you and I will keep loving you always.`,
  ];
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
                Special Letter for us Now and for our Future ✨
              </h3>
              <p style={{ margin: 0, opacity: 0.8 }}>
                A FULL YEAR, we have finally reached this milestone baby, we've made it sooo far and in such good health. I won't lie to you, when our relationship began I absolutely did not think that we would make it so far, I thought 2 months, 3 at max, but look at us gooo. It has been such a roller-coaster ride, because for real, our start was beautiful, from hanging out everyday, from going to the library, to the saree wala din, to our ice cream walks, and then the Gopal's date (our first), then our Megh's date, where we had our first kiss, so so many moments to look back upon from just that time, it's unbelievable. Then came our first trip, BANGR, and it was truly something else, I believe that's when we became a REAL couple. From there on we everyone just knew and associated our names together, ki oh Jayant ke sath toh Ananya hogi hi, which is amazing. Then SAT came which was also v cute, with us spending our time doing uhm uhms all the time, and everything just kept growing and growing. I won't write much about the timeline since I've already written that upar ke section mein, I just want this letter to be an appreciation for you as my partner, because the term "girlfriend" is just not enough, you've been so much more to me, you've helped me when I've been down, you've pushed me higher when I've been up, you've done everything possible just so I could be the best version of myself, and that's something that no one could do. All your actions, all of them have always had me in the back of your head, I know, because it shows, with the way you do things. like ghar se chips lana and naankhatai lana because I like them, then just sending me food out of nowhere, and with the immense amount of efforts you put at every single occasions, from Valentine's to 6 months to my birthday, you have given me so much love and so much appreciation to cherish, I couldn't have dreamt of it even in my dreams, but you truly are my dream girl. I love everything about you, and so much, the way your eyes shine, with hope, innocence and love. The way you work so hard to achieve what you've set in mind. The way you dance like there's no one watching (even when people are, they are just impressed because WOW). The way you dress up, you look so beautiful every day. There's just so much to love I can't put it in words. You've given me uncountable chances, have been disappointed several times by me, and I'm truly truly sorry about that, I've worked hard on my weaknesses and have tried my best to be the perfect boyfriend for you, and I know I might be far from it, but honest to God, I've been trying my best. I love you Ananya, and this is my gift to you, the main gift, I hope you would like it, and would not have expected it, I really wanted to surprise you, with something that you wouldn't see coming and this really seemed the best way. I hope you like the plushie too, I know you love soft toys and I hope you like the flowers, they're dried so they won't go bad either. There's another gift for tomorrow, but it's a small one. Anyway, thank you Ananya, for believing in me everyday, for showing up everyday, loving me unconditionally and showing me what it means to be the perfect partner. I love you, and I always will.
-Jayant 
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
      "Gossip Session 💆‍♀️",
      "Movie Date 🎬",
      "Surprise Gift 🎁",
      "Long Walk 🚶",
      "Lunch Date 🍳",
      "Hug Coupon 🫂",
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