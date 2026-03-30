"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { AnimatedNumber } from "@/components/animated-number";

const floatingTransition = {
  duration: 5.5,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

const groupFeed = [
  { name: "Alex P.", status: "streak", detail: "18d clean", habit: "Vaping" },
  { name: "Jordan M.", status: "relapsed", detail: "−$5 today", habit: "Drinking" },
  { name: "Sam K.", status: "streak", detail: "31d clean", habit: "Porn" },
  { name: "Riley T.", status: "streak", detail: "7d clean", habit: "Doomscrolling" },
];

const allLeaderboardRows = [
  { name: "M. Chen", habit: "Vaping", lost: "$143" },
  { name: "J. Park", habit: "Drinking", lost: "$87" },
  { name: "D. Lewis", habit: "Scrolling", lost: "$54" },
  { name: "R. Torres", habit: "Porn", lost: "$31" },
  { name: "A. Kim", habit: "Weed", lost: "$18" },
  { name: "C. Ngo", habit: "Vaping", lost: "$12" },
  { name: "T. Reyes", habit: "Drinking", lost: "$7" },
  { name: "S. Patel", habit: "Scrolling", lost: "$6" },
  { name: "L. Grant", habit: "Porn", lost: "$5" },
  { name: "B. Walsh", habit: "Weed", lost: "$4" },
  { name: "F. Osei", habit: "Vaping", lost: "$3" },
  { name: "H. Muller", habit: "Drinking", lost: "$2" },
];

const ledger = [
  { time: "Today, 9:14 pm", habit: "Drinking", amount: "−$1" },
  { time: "Yesterday, 11:02 am", habit: "Drinking", amount: "−$1" },
  { time: "Mar 20, 7:33 pm", habit: "Drinking", amount: "−$1" },
  { time: "Mar 19, 2:47 pm", habit: "Drinking", amount: "−$1" },
  { time: "Mar 17, 10:18 pm", habit: "Drinking", amount: "−$1" },
];

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 01-2-2V5h4" />
    <path d="M18 9h2a2 2 0 002-2V5h-4" />
    <path d="M12 17v4" />
    <path d="M8 21h8" />
    <path d="M6 5h12v7a6 6 0 01-12 0V5z" />
  </svg>
);

const GroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
    <path d="M16 3.13a4 4 0 010 7.75" />
    <path d="M21 21v-2a4 4 0 00-3-3.85" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

export function PhoneMockup() {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setTab((t) => (t + 1) % 3);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const goTo = (next: number) => {
    setDirection(next > tab ? 1 : -1);
    setTab(next);
  };

  const variants = {
    enter: (d: number) => ({ x: d * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -40, opacity: 0 }),
  };

  return (
    <motion.div
      className="phone-shell"
      animate={reduceMotion ? undefined : { y: [-6, 8], rotate: [-1.2, 1.2] }}
      transition={reduceMotion ? undefined : floatingTransition}
    >
      <div className="phone-glow" />
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-content">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              {tab === 0 && (
                <motion.div
                  key="home"
                  className="phone-page"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                  <div className="phone-header">
                    <div>
                      <p className="eyebrow">Current Commitment</p>
                      <h3>Stop Drinking</h3>
                      <p className="commitment-meta">Private &middot; 30 days</p>
                    </div>
                    <button className="settings-btn" type="button" aria-label="Settings">
                      <SettingsIcon />
                    </button>
                  </div>

                  <div className="stat-grid">
                    <div className="stat-card">
                      <span>Streak</span>
                      <strong><AnimatedNumber to={42} suffix="d" /></strong>
                    </div>
                    <div className="stat-card danger">
                      <span>Dedication</span>
                      <strong><AnimatedNumber to={143} prefix="$" /></strong>
                    </div>
                  </div>

                  <div className="admit-wrapper">
                    <button className="admit-button" type="button">
                      <span className="admit-label-top">TAP TO</span>
                      <span className="admit-word">ADMIT</span>
                    </button>
                  </div>

                  <div className="ledger-panel">
                    <p className="ledger-title">History</p>
                    {ledger.map((entry) => (
                      <div className="ledger-row" key={entry.time}>
                        <div className="ledger-left">
                          <span className="ledger-habit">{entry.habit}</span>
                          <span className="ledger-time">{entry.time}</span>
                        </div>
                        <span className="ledger-amount">{entry.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === 1 && (
                <motion.div
                  key="leaderboard"
                  className="phone-page"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                  <div className="panel-header lb-header">
                    <span className="lb-title">Global Leaderboard</span>
                    <span className="lb-sub">This month</span>
                  </div>
                  <div className="leaderboard leaderboard-full">
                    {allLeaderboardRows.map((row, index) => (
                      <div className="leaderboard-row" key={row.name}>
                        <span className="leaderboard-rank">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <strong>{row.name}</strong>
                          <p>{row.habit}</p>
                        </div>
                        <span className="leaderboard-streak">{row.lost}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === 2 && (
                <motion.div
                  key="groups"
                  className="phone-page"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                  <div>
                    <p className="eyebrow">Your Circle</p>
                    <p className="commitment-meta">4 members</p>
                  </div>

                  <div className="activity-feed">
                    {groupFeed.map((item) => (
                      <div className="activity-item" key={item.name}>
                        <div className={`activity-dot ${item.status}`} />
                        <div className="activity-body">
                          <strong>{item.name}</strong>
                          <p>{item.habit} · {item.detail}</p>
                        </div>
                        <span className={`activity-badge ${item.status}`}>
                          {item.status === "streak" ? "🔥" : "−$5"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="group-input-row">
                    <span className="group-input-mock">Call someone out…</span>
                    <button className="group-send-btn" type="button" aria-label="Send">↑</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="phone-tab-bar">
            {[HomeIcon, TrophyIcon, GroupIcon].map((Icon, i) => (
              <button
                key={i}
                className={`phone-tab ${tab === i ? "active" : ""}`}
                onClick={() => goTo(i)}
                type="button"
                aria-label={["Home", "Leaderboard", "Groups"][i]}
              >
                <Icon />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </motion.div>
  );
}
