"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EmailCaptureForm } from "@/components/email-capture-form";
import { PageEvent } from "@/components/page-event";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function StartPageUI({ paymentLink }: { paymentLink?: string }) {
  const reduceMotion = useReducedMotion();

  const wordmark = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease } };

  const card = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.97, y: 18 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { delay: 0.18, duration: 0.65, ease },
      };

  const micro = reduceMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.42, duration: 0.55 } };

  return (
    <main className="simple-page-shell">
      <PageEvent eventName="page_view_start" />
      <div className="start-ambient-glow" />

      <motion.div className="start-wordmark-wrapper" {...wordmark}>
        <TrackedLink className="wordmark centered-wordmark" href="/">
          {siteConfig.name}
        </TrackedLink>
      </motion.div>

      <motion.section className="capture-card" {...card}>
        <span className="section-label">Founding Member #401</span>
        <h1>Enter your email</h1>
        <EmailCaptureForm paymentLink={paymentLink} />
      </motion.section>

      <motion.p className="micro-links" {...micro}>
        No Spam. Prefer more detail first?{" "}
        <TrackedLink href="/learn">Learn more</TrackedLink>
      </motion.p>
    </main>
  );
}
