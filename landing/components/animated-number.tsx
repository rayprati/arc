"use client";

import { animate, useMotionValue, useTransform, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export function AnimatedNumber({
  from = 0,
  to,
  prefix = "",
  suffix = "",
}: {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(reduceMotion ? to : from);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    if (reduceMotion) return;

    const controls = animate(count, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [count, reduceMotion, to]);

  return (
    <span>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
