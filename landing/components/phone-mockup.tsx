"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { AnimatedNumber } from "@/components/animated-number";

const floatingTransition = {
  duration: 5.5,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

const EASTERN_TZ = "America/New_York";

function formatEasternStatusTime(date: Date): string {
  const s = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return s.replace(/\s?[AP]M$/i, "").trim();
}


const todaysUsage = [
  { app: "TikTok", minutes: 37 },
  { app: "Instagram", minutes: 3 },
  { app: "X", minutes: 2 },
  { app: "YouTube", minutes: 0 },
];

const appDomains: Record<string, string> = {
  Instagram: "instagram.com",
  TikTok: "tiktok.com",
  Snapchat: "snapchat.com",
  X: "x.com",
  YouTube: "youtube.com",
};

type CircleMember = {
  name: string;
  photo: string;
  cleanStreak: number;
  unlocksWeek: number;
  burned: string;
  status: "clean" | "unlocked";
  isUser?: boolean;
};

const circleFeed: CircleMember[] = [
  { name: "Ryan Smith",     photo: "https://i.pravatar.cc/150?img=52", cleanStreak: 31, unlocksWeek: 0, burned: "$0", status: "clean" },
  { name: "Alexa Peterson", photo: "https://i.pravatar.cc/150?img=16", cleanStreak: 18, unlocksWeek: 2, burned: "$2", status: "clean" },
  { name: "You",            photo: "https://i.pravatar.cc/150?img=13", cleanStreak: 12, unlocksWeek: 0, burned: "$0", status: "clean", isUser: true },
  { name: "Jamal Williams", photo: "https://i.pravatar.cc/150?img=8",  cleanStreak: 7,  unlocksWeek: 1, burned: "$1", status: "clean" },
  { name: "Jordan Martinez",photo: "https://i.pravatar.cc/150?img=33", cleanStreak: 0,  unlocksWeek: 6, burned: "$6", status: "unlocked" },
];


const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10a2 2 0 01.709-1.528l7-5.999a2 2 0 012.582 0l7 5.999A2 2 0 0121 10v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <path d="M15 21v-8a1 1 0 00-1-1h-4a1 1 0 00-1 1v8" />
  </svg>
);


const GroupIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
    <path d="M16 3.13a4 4 0 010 7.75" />
    <path d="M21 21v-2a4 4 0 00-3-3.85" />
  </svg>
);

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const LockBigIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
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
  <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
    <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.5" />
    <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
    <path d="M23 4v4a2 2 0 000-4z" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

export function PhoneMockup() {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const [statusTime, setStatusTime] = useState("9:41");

  const syncEasternClock = useCallback(() => {
    setStatusTime(formatEasternStatusTime(new Date()));
  }, []);

  useLayoutEffect(() => {
    syncEasternClock();
  }, [syncEasternClock]);

  useEffect(() => {
    const id = setInterval(syncEasternClock, 60_000);
    return () => clearInterval(id);
  }, [syncEasternClock]);


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
            <span className="phone-status-time" aria-live="polite" aria-atomic="true">
              {statusTime}
            </span>
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
                  className="phone-page phone-page-home"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                >
                  <div className="home-top">
                    <div className="phone-header">
                      <h3 className="header-arc-glass">ARC</h3>
                      <button
                        type="button"
                        className="header-settings-glass"
                        onClick={() => goTo(3)}
                        aria-label="Settings"
                      >
                        <SettingsIcon />
                      </button>
                    </div>

                    <div className="home-hero-block">
                      <div className="home-arc-wrap">
                        <div className="home-arc-teal-glow" />
                        <div className="home-nebula-bg" />
                        <div className="stat-arc-container">
                          <svg className="stat-arc-svg" viewBox="0 0 100 100" overflow="visible" aria-hidden>
                            <defs>
                              <linearGradient id="arcGrad" x1="17.5" y1="82.5" x2="95.9" y2="46.4" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#F26030" />
                                <stop offset="100%" stopColor="#1AD4D4" />
                              </linearGradient>
                            </defs>
                            {/* Thin gray guide rings inside the arc (all radii below the arc path) */}
                            {[36.82, 34.33].map((r) => (
                              <circle
                                key={`arc-ring-${r}`}
                                cx="50"
                                cy="50"
                                r={r}
                                fill="none"
                                stroke="rgba(175, 184, 204, 0.52)"
                                strokeWidth="0.65"
                              />
                            ))}
                            <circle cx="50" cy="50" r="46" fill="none"
                              stroke="rgba(255,255,255,0.08)" strokeWidth="5"
                              strokeLinecap="round"
                              strokeDasharray="252.90 289.03"
                              transform="rotate(135 50 50)"
                            />
                            <circle cx="50" cy="50" r="46" fill="none"
                              stroke="url(#arcGrad)" strokeWidth="5"
                              strokeLinecap="round"
                              strokeDasharray="172 289.03"
                              transform="rotate(135 50 50)"
                            />
                            {/* minimalist rocket at arc tip — stubby capsule, 2× scale */}
                            <g transform="translate(95.9, 46.4) rotate(175.5) scale(2)">
                              <ellipse rx="1.4" ry="2.5" fill="white" />
                              <ellipse cy="2.9" rx="0.5" ry="0.85" fill="#1AD4D4" opacity="0.90" />
                            </g>
                          </svg>
                          <div className="stat-arc-content">
                            <strong>18m</strong>
                            <span>Left today</span>
                          </div>
                        </div>
                      </div>

                      <div className="home-below-arc">
                        <div className="home-stat-side">
                          <strong>12d</strong>
                          <span>Clean streak</span>
                        </div>
                        <div className="home-stat-side home-stat-center">
                          <strong>58m</strong>
                          <span>Daily avg</span>
                          <div className="home-trend">
                            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
                              <path d="M5 1.5v7M2.5 6l2.5 2.5L7.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>4h 12m</span>
                          </div>
                        </div>
                        <div className="home-stat-side home-stat-right">
                          <strong>$0</strong>
                          <span>Dedicated</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ledger-panel">
                    <p className="ledger-title">Today&apos;s usage</p>
                    {todaysUsage.map((row) => (
                      <div className="ledger-row" key={row.app}>
                        <span className="ledger-time ledger-app-name">
                          <img className="app-icon" src={`https://www.google.com/s2/favicons?domain=${appDomains[row.app]}&sz=256`} alt="" />
                          {row.app}
                        </span>
                        <span className="ledger-amount ledger-minutes">{row.minutes}m</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === 1 && (
                <motion.div
                  key="circle"
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
                      <h3>The Usual Suspects</h3>
                      <p className="commitment-meta">This month</p>
                    </div>
                    <button type="button" className="header-settings-glass" aria-label="Add friend">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" y1="8" x2="19" y2="14" />
                        <line x1="22" y1="11" x2="16" y2="11" />
                      </svg>
                    </button>
                  </div>

                  <div className="activity-feed circle-feed">
                    {circleFeed.map((item, i) => (
                      <div className="activity-item" key={item.name}>
                        <span className="activity-rank">{i + 1}</span>
                        <img className="activity-photo" src={item.photo} alt={item.name} width={36} height={36} />
                        <div className="activity-body">
                          <strong>{item.name}</strong>
                          <p>
                            {item.burned !== "$0" ? (
                              <span className="circle-burned">{item.burned}</span>
                            ) : (
                              <span className="circle-clean">Clean</span>
                            )}
                          </p>
                        </div>
                        <span className="circle-streak-val">
                          {item.status === "unlocked" ? "Today" : item.cleanStreak > 0 ? `${item.cleanStreak}d` : "—"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="circle-input-wrap">
                    <div className="ledger-row circle-input-row">
                      <span className="group-input-mock">Call someone out…</span>
                      <button className="group-send-btn" type="button" aria-label="Send">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="circle-comment">
                      <img className="circle-comment-avatar" src="https://i.pravatar.cc/150?img=8" alt="Jamal Williams" width={28} height={28} />
                      <div className="circle-comment-body">
                        <div className="circle-comment-meta">
                          <strong>Jamal</strong>
                          <span className="circle-comment-time">· 1d ago</span>
                        </div>
                        <span>get a grip Jordan</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {tab === 2 && (
                <motion.div
                  key="lock"
                  className="phone-page phone-page-lock"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                >
                  <div className="lock-screen">
                    <div className="lock-icon-wrap">
                      <LockBigIcon />
                    </div>
                    <h2 className="lock-title">Time&apos;s Up</h2>
                    <p className="lock-body">You&apos;ve used today&apos;s social allowance.</p>

                    <div className="lock-cta-group">
                      <button type="button" className="lock-cta-primary">
                        Unlock 10m for $1
                      </button>
                      <button type="button" className="lock-cta-secondary">
                        Stay Locked
                      </button>
                    </div>

                    <p className="lock-note">This breaks today&apos;s clean streak.</p>
                  </div>
                </motion.div>
              )}

              {tab === 3 && (
                <motion.div
                  key="settings"
                  className="phone-page phone-page-settings"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                >
                  <div className="phone-header">
                    <h3>Settings</h3>
                  </div>

                  <div className="settings-section">
                    <p className="settings-label">Monitored Apps</p>
                    {["Instagram", "TikTok", "Snapchat", "X", "YouTube"].map((app) => (
                      <div className="settings-row" key={app}>
                        <span className="settings-row-name settings-app-name">
                          <img className="app-icon" src={`https://www.google.com/s2/favicons?domain=${appDomains[app]}&sz=256`} alt="" />
                          {app}
                        </span>
                        <span className="settings-row-value settings-toggle-on" />
                      </div>
                    ))}
                  </div>

                  <div className="settings-section">
                    <p className="settings-label">Daily Limit</p>
                    <div className="settings-row">
                      <span className="settings-row-name">Allowance</span>
                      <span className="settings-row-value settings-row-value-white">60 min</span>
                    </div>
                    <div className="settings-row">
                      <span className="settings-row-name">Unlock duration</span>
                      <span className="settings-row-value">3 min</span>
                    </div>
                    <div className="settings-row">
                      <span className="settings-row-name">Unlock price</span>
                      <span className="settings-row-value">$1.00</span>
                    </div>
                  </div>

                  <div className="settings-section">
                    <p className="settings-label">Notifications</p>
                    <div className="settings-row">
                      <span className="settings-row-name">10 min before</span>
                      <span className="settings-row-value settings-toggle-on" />
                    </div>
                    <div className="settings-row">
                      <span className="settings-row-name">At limit</span>
                      <span className="settings-row-value settings-toggle-on" />
                    </div>
                    <div className="settings-row">
                      <span className="settings-row-name">Daily recap</span>
                      <span className="settings-row-value settings-toggle-on" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="phone-bottom-pill">
            <button type="button" className={`pill-icon-btn${tab === 0 ? " active" : ""}`} onClick={() => goTo(0)} aria-label="Home">
              <HomeIcon />
            </button>
            <button type="button" className={`pill-icon-btn${tab === 1 ? " active" : ""}`} onClick={() => goTo(1)} aria-label="Circle">
              <GroupIcon />
            </button>
            <button type="button" className={`pill-icon-btn${tab === 2 ? " active" : ""}`} onClick={() => goTo(2)} aria-label="Lock">
              <LockIcon />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
