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
  { name: "Jordan M.", status: "relapsed", detail: "−$1 today", habit: "Drinking" },
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
];

const tabDurations = [7500, 4000, 5000];

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

const ArrowUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const FlameIcon = () => (
  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#6ee7b7" }}>
    <path d="M6.5 13c2.2 0 4-1.6 4-3.5 0-1.8-1.3-3.1-1.8-3.5.2.9-.9 2-.9 2S7 7 7 5.5C7 4 8 2.5 8 2.5 6.2 3.2 2.5 5.5 2.5 9.5c0 2 1.8 3.5 4 3.5z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const SignalIcon = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
    <rect x="0" y="7" width="3" height="5" rx="0.5" opacity="1" />
    <rect x="4.5" y="5" width="3" height="7" rx="0.5" opacity="1" />
    <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" opacity="1" />
    <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="1" />
  </svg>
);

const WifiIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
    <path d="M8 9.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
    <path d="M8 6.2c1.18 0 2.25.47 3.03 1.23l1.18-1.18A6.07 6.07 0 008 4.5c-1.68 0-3.2.68-4.3 1.77l1.18 1.18A4.4 4.4 0 018 6.2z" opacity="0.85" />
    <path d="M8 2.8c2.17 0 4.13.88 5.55 2.3l1.18-1.18A8.7 8.7 0 008 1C5.6 1 3.42 1.97 1.82 3.56l1.18 1.18A7.06 7.06 0 018 2.8z" opacity="0.5" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
    <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.5" />
    <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
    <path d="M23 4v4a2 2 0 000-4z" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

export function PhoneMockup() {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const id = setTimeout(() => {
      setDirection(1);
      setTab((t) => (t + 1) % 3);
    }, tabDurations[tab]);
    return () => clearTimeout(id);
  }, [tab]);

  const goTo = (next: number) => {
    setDirection(next > tab ? 1 : -1);
    setTab(next);
  };

  const variants = {
    enter: (d: number) => ({ x: d * 36, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -28, opacity: 0 }),
  };

  const transition = {
    x: { type: "spring" as const, stiffness: 340, damping: 30, mass: 0.85 },
    opacity: { duration: 0.16, ease: "easeOut" as const },
  };

  return (
    <motion.div
      className="phone-shell"
      animate={reduceMotion ? undefined : { y: [-6, 8], rotate: [-1.2, 1.2] }}
      transition={reduceMotion ? undefined : floatingTransition}
    >
      <div className="phone-glow" />
      <div className="phone-frame">
        <div className="phone-side-button phone-side-button-power" />
        <div className="phone-side-button phone-side-button-vol-up" />
        <div className="phone-side-button phone-side-button-vol-down" />
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-status-bar">
            <span className="phone-status-time">9:41</span>
            <div className="phone-status-icons">
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>
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
                  transition={transition}
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
                      <strong className="stat-positive"><AnimatedNumber to={42} suffix="d" /></strong>
                    </div>
                    <div className="stat-card danger">
                      <span>Invested</span>
                      <strong className="stat-danger"><AnimatedNumber to={4} prefix="$" /></strong>
                    </div>
                  </div>

                  <div className="admit-wrapper">
                    <div className="admit-glow" />
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
                  transition={transition}
                >
                  <div className="panel-header lb-header">
                    <span className="lb-title">Global Leaderboard</span>
                    <span className="lb-sub">This month</span>
                  </div>
                  <div className="leaderboard leaderboard-full">
                    {allLeaderboardRows.map((row, index) => (
                      <div className="leaderboard-row" key={row.name}>
                        <span className="leaderboard-rank">{index + 1}</span>
                        <div className="leaderboard-identity">
                          <strong>{row.name}</strong>
                          <p>{row.habit}</p>
                        </div>
                        <span className="leaderboard-amount">{row.lost}</span>
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
                  transition={transition}
                >
                  <div>
                    <p className="eyebrow">Your Circle</p>
                    <p className="groups-title">The Usual Suspects</p>
                    <div className="group-avatars">
                      {["AP", "JM", "SK", "RT"].map((initials) => (
                        <span className="group-avatar" key={initials}>{initials}</span>
                      ))}
                      <span className="group-member-count">4 members</span>
                    </div>
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
                          {item.status === "streak" ? <FlameIcon /> : "−$1"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="group-input-row">
                    <span className="group-input-mock">Call someone out…</span>
                    <button className="group-send-btn" type="button" aria-label="Send"><ArrowUpIcon /></button>
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
