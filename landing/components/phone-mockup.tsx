"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { AnimatedNumber } from "@/components/animated-number";
import { TrackedLink } from "@/components/tracked-link";

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

function getEasternYmdString(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: EASTERN_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function addCalendarDaysToYmd(ymd: string, deltaDays: number): { y: number; m: number; d: number } {
  const [y, mo, da] = ymd.split("-").map(Number);
  const t = new Date(Date.UTC(y, mo - 1, da + deltaDays));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

const LEDGER_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

function formatLedgerStamp(
  parts: { y: number; m: number; d: number },
  hour12: number,
  minute: number,
  pm: boolean,
): string {
  const mm = minute.toString().padStart(2, "0");
  const suf = pm ? "pm" : "am";
  return `${LEDGER_MONTHS[parts.m - 1]} ${parts.d}, ${hour12}:${mm} ${suf}`;
}

type HomeLedgerRow = { key: string; time: string; habit: string; amount: string };

function buildHomeLedger(now: Date): HomeLedgerRow[] {
  const ymd = getEasternYmdString(now);
  const d28 = addCalendarDaysToYmd(ymd, -28);
  const d29 = addCalendarDaysToYmd(ymd, -29);
  const d35 = addCalendarDaysToYmd(ymd, -35);
  const d36 = addCalendarDaysToYmd(ymd, -36);
  return [
    {
      key: "ledger-28",
      time: formatLedgerStamp(d28, 9, 14, true),
      habit: "Drinking",
      amount: "−$1",
    },
    {
      key: "ledger-29",
      time: formatLedgerStamp(d29, 11, 2, false),
      habit: "Drinking",
      amount: "−$1",
    },
    {
      key: "ledger-35",
      time: formatLedgerStamp(d35, 7, 33, true),
      habit: "Drinking",
      amount: "−$1",
    },
    {
      key: "ledger-36",
      time: formatLedgerStamp(d36, 2, 47, true),
      habit: "Drinking",
      amount: "−$1",
    },
  ];
}

const groupFeed = [
  { name: "Alex Peterson", status: "streak" as const, habit: "Vaping", streakDays: 18, lost: "$5" },
  { name: "Jordan Martinez", status: "relapsed" as const, habit: "Drinking", lost: "$2" },
  { name: "Ryan Smith", status: "streak" as const, habit: "Porn", streakDays: 31, lost: "$25" },
  { name: "Jamal Williams", status: "streak" as const, habit: "Doomscrolling", streakDays: 7, lost: "$0" },
];

const allLeaderboardRows = [
  { name: "Marcus Chen", habit: "Vaping", lost: "$143" },
  { name: "Jamie Park", habit: "Drinking", lost: "$87" },
  { name: "Dana Lewis", habit: "Scrolling", lost: "$54" },
  { name: "Rafael Torres", habit: "Porn", lost: "$31" },
  { name: "Avery Kim", habit: "Weed", lost: "$18" },
  { name: "Cameron Ngo", habit: "Vaping", lost: "$12" },
  { name: "Taylor Reyes", habit: "Drinking", lost: "$7" },
  { name: "Sanjay Patel", habit: "Scrolling", lost: "$6" },
  { name: "Leslie Grant", habit: "Porn", lost: "$5" },
  { name: "Blake Walsh", habit: "Weed", lost: "$4" },
  { name: "Fatima Osei", habit: "Vaping", lost: "$3" },
  { name: "Hannah Muller", habit: "Drinking", lost: "$2" },
];


const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10a2 2 0 01.709-1.528l7-5.999a2 2 0 012.582 0l7 5.999A2 2 0 0121 10v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <path d="M15 21v-8a1 1 0 00-1-1h-4a1 1 0 00-1 1v8" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4h12v6a6 6 0 01-12 0V4z" />
    <path d="M6 7H4a2 2 0 010-4h2" />
    <path d="M18 7h2a2 2 0 000-4h-2" />
    <path d="M12 16v4" />
    <path d="M8 20h8" />
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
  <svg
    className="activity-streak-flame"
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M6.5 13c2.2 0 4-1.6 4-3.5 0-1.8-1.3-3.1-1.8-3.5.2.9-.9 2-.9 2S7 7 7 5.5C7 4 8 2.5 8 2.5 6.2 3.2 2.5 5.5 2.5 9.5c0 2 1.8 3.5 4 3.5z" />
  </svg>
);

const GravestoneIcon = () => (
  <svg
    className="activity-gravestone"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path strokeWidth="1.5" d="M3.65 14.95h9.7" />
    <path
      strokeWidth="1.5"
      d="M5.2 14.55V8.35Q8.5 4.25 11.8 8.35v6.2H5.2z"
    />
    <path
      strokeWidth="1.15"
      d="M6.35 9.45h4.3M5.9 10.52h5.2M6.35 11.58h4.3"
    />
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
  const [homeLedger, setHomeLedger] = useState<HomeLedgerRow[]>(() => buildHomeLedger(new Date()));

  const syncEasternClockAndLedger = useCallback(() => {
    const now = new Date();
    setStatusTime(formatEasternStatusTime(now));
    setHomeLedger(buildHomeLedger(now));
  }, []);

  useLayoutEffect(() => {
    syncEasternClockAndLedger();
  }, [syncEasternClockAndLedger]);

  useEffect(() => {
    const id = setInterval(syncEasternClockAndLedger, 60_000);
    return () => clearInterval(id);
  }, [syncEasternClockAndLedger]);


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
                  {/* Top: header + stats + progress */}
                  <div className="home-top">
                    <div className="phone-header">
                      <div>
                        <h3>Stop Drinking</h3>
                        <p className="commitment-meta">30 days</p>
                      </div>
                      <div className="phone-page-nav">
                        <button type="button" aria-label="Settings"><SettingsIcon /></button>
                      </div>
                    </div>

                    <div className="stat-earth-moon">
                      <div className="stat-arc-container">
                        <svg className="stat-arc-svg" viewBox="0 0 100 100" aria-hidden>
                          <circle cx="50" cy="50" r="38" fill="none"
                            stroke="rgba(255,255,255,0.09)" strokeWidth="4.5"
                            strokeLinecap="round"
                            strokeDasharray="208.91 238.76"
                            transform="rotate(112.5 50 50)"
                          />
                          <circle cx="50" cy="50" r="38" fill="none"
                            stroke="rgba(255,255,255,0.55)" strokeWidth="4.5"
                            strokeLinecap="round"
                            strokeDasharray="195.52 238.76"
                            transform="rotate(112.5 50 50)"
                          />
                        </svg>
                        <div className="stat-arc-content">
                          <strong className="stat-positive"><AnimatedNumber to={28} suffix="d" /></strong>
                          <span>Streak</span>
                        </div>
                      </div>
                      <div className="stat-moon">
                        <strong className="stat-danger"><AnimatedNumber to={4} prefix="$" /></strong>
                        <span>Dedicated</span>
                      </div>
                    </div>
                  </div>

                  {/* Spacer pushes relapses toward the button */}
                  <div className="home-spacer" />

                  {/* Bottom: relapses sit just above ADMIT */}
                  <div className="ledger-panel">
                    <p className="ledger-title">Relapses</p>
                    {homeLedger.map((entry, i) => (
                      <div className="ledger-row" key={entry.key}>
                        <span className="ledger-time">
                          {["28 days ago", "31 days ago", "40 days ago", "45 days ago"][i] ?? entry.time}
                        </span>
                        <span className="ledger-amount">{entry.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === 1 && (
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
                  <div className="phone-header">
                    <div>
                      <h3>The Usual Suspects</h3>
                      <div className="group-avatars">
                        {["AP", "JM", "RS", "JW"].map((initials) => (
                          <span className="group-avatar" key={initials}>{initials}</span>
                        ))}
                        <span className="group-member-count">4 members</span>
                      </div>
                    </div>
                    <div className="phone-page-nav">
                      <button type="button" aria-label="Settings"><SettingsIcon /></button>
                    </div>
                  </div>

                  <div className="activity-feed">
                    {groupFeed.map((item) => (
                      <div className="activity-item" key={item.name}>
                        <div className="activity-lead">
                          <span className="activity-flame-slot" aria-hidden>
                            {item.status === "streak" ? <FlameIcon /> : <GravestoneIcon />}
                          </span>
                          {item.status === "streak" ? (
                            <span className="activity-streak-days">{item.streakDays}d</span>
                          ) : (
                            <span className="activity-streak-days activity-streak-days-zero">0d</span>
                          )}
                        </div>
                        <div className="activity-body">
                          <strong>{item.name}</strong>
                          <p>
                            <span className="activity-habit">{item.habit}</span>
                          </p>
                        </div>
                        <span className="leaderboard-amount">{item.lost}</span>
                      </div>
                    ))}
                  </div>

                  <div className="group-input-row">
                    <span className="group-input-mock">Call someone out…</span>
                    <button className="group-send-btn" type="button" aria-label="Send"><ArrowUpIcon /></button>
                  </div>
                </motion.div>
              )}

              {tab === 2 && (
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
                  <div className="phone-header">
                    <h3>Leaderboard</h3>
                    <div className="phone-page-nav">
                      <button type="button" aria-label="Settings"><SettingsIcon /></button>
                    </div>
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
            </AnimatePresence>
          </div>

          {/* Mega pill — always visible, center slot fixed-width to prevent jumping */}
          <div className="phone-bottom-pill">
            <button
              type="button"
              className={`pill-icon-btn${tab === 1 ? " active" : ""}`}
              onClick={() => goTo(1)}
              aria-label="Your Circle"
            >
              <GroupIcon />
            </button>

            <div className="pill-center-slot">
              <AnimatePresence mode="wait" initial={false}>
                {tab === 0 ? (
                  <motion.div
                    key="admit"
                    className="pill-admit-wrap"
                    initial={{ opacity: 0, scale: 0.9, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -2 }}
                    transition={{
                      duration: 0.48,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                  >
                    <TrackedLink
                      className="pill-admit"
                      eventName="hero_admit_click"
                      href="/start"
                    >
                      <span className="pill-admit-word">ADMIT</span>
                    </TrackedLink>
                  </motion.div>
                ) : (
                  <motion.button
                    key="home"
                    type="button"
                    className="pill-icon-btn pill-home-btn"
                    onClick={() => goTo(0)}
                    aria-label="Home"
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.82 }}
                    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] as const }}
                  >
                    <HomeIcon />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              className={`pill-icon-btn${tab === 2 ? " active" : ""}`}
              onClick={() => goTo(2)}
              aria-label="Leaderboard"
            >
              <TrophyIcon />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
