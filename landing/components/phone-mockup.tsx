"use client";

import { motion, useReducedMotion } from "framer-motion";

import { AnimatedNumber } from "@/components/animated-number";
import { leaderboardRows } from "@/lib/site";

const floatingTransition = {
  duration: 5.5,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

export function PhoneMockup() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="phone-shell"
      animate={
        reduceMotion
          ? undefined
          : {
              y: [-6, 8],
              rotate: [-1.2, 1.2],
            }
      }
      transition={reduceMotion ? undefined : floatingTransition}
    >
      <div className="phone-glow" />
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-header">
            <div>
              <p className="eyebrow">Tonight&apos;s commitment</p>
              <h3>Quit vaping</h3>
            </div>
            <span className="glass-pill">Early cohort</span>
          </div>

          <div className="stat-grid">
            <div className="stat-card">
              <span>Streak</span>
              <strong>
                <AnimatedNumber to={42} suffix="d" />
              </strong>
            </div>
            <div className="stat-card danger">
              <span>Money at risk</span>
              <strong>
                <AnimatedNumber to={143} prefix="$" />
              </strong>
            </div>
          </div>

          <div className="mini-panel">
            <div className="panel-header">
              <span>Mode</span>
              <span>Pressure</span>
            </div>
            <div className="chip-row">
              <span className="mode-chip active">Private</span>
              <span className="mode-chip">Friends Only</span>
              <span className="mode-chip">Global</span>
            </div>
          </div>

          <div className="mini-panel">
            <div className="panel-header">
              <span>Duration</span>
              <span>Commitment</span>
            </div>
            <div className="duration-toggle">
              <span className="toggle-option active">30 Days</span>
              <span className="toggle-option">1 Year</span>
            </div>
          </div>

          <div className="mini-panel">
            <div className="panel-header">
              <span>Friends leaderboard</span>
              <span>Tonight</span>
            </div>
            <div className="leaderboard">
              {leaderboardRows.map((row, index) => (
                <div className="leaderboard-row" key={row.name}>
                  <span className="leaderboard-rank">0{index + 1}</span>
                  <div>
                    <strong>{row.name}</strong>
                    <p>{row.habit}</p>
                  </div>
                  <span className="leaderboard-streak">{row.streak}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
