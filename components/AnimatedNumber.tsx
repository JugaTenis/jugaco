"use client";

import { useEffect, useRef, useState } from "react";
import { formatCount } from "@/lib/stats";

const DURATION_MS = 2000;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/** Counts up from 0 to `value` once the element scrolls into view. */
export default function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION_MS, 1);
        setShown(Math.round(easeOutQuart(t) * value));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${formatCount(value)}${suffix}`}>
      {formatCount(shown)}{suffix}
    </span>
  );
}
