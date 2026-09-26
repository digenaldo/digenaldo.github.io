"use client";

import { useEffect, useState } from "react";
import { Motion } from "@/components/motion/Motion";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = document.documentElement;
        const max = root.scrollHeight - root.clientHeight;
        setProgress(max > 0 ? Math.min(1, root.scrollTop / max) : 0);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const pct = Math.round(progress * 100);

  return (
    <div
      role="progressbar"
      aria-label="Progresso de leitura"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-10"
    >
      <Motion
        id="scroll-meter"
        progress={progress}
        className="h-10 w-full"
        fallback={
          <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-signal" style={{ transform: `scaleX(${progress})` }} />
        }
      />
    </div>
  );
}
