"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { CompositionId } from "@/remotion/registry";
import { useReducedMotion } from "./useReducedMotion";

const loadPlayer = () => import("./PlayerCore");
const PlayerCore = dynamic(loadPlayer, { ssr: false });

type Props = {
  id: CompositionId;
  inputProps?: Record<string, unknown>;
  className?: string;
  // Shown on the server and while the player loads; should match frame 0.
  placeholder?: ReactNode;
  // Shown instead of the player when the user prefers reduced motion.
  fallback?: ReactNode;
  fallbackClassName?: string;
  loop?: boolean;
  progress?: number;
};

export function Motion({
  id,
  inputProps,
  className,
  placeholder,
  fallback,
  fallbackClassName,
  loop,
  progress,
}: Props) {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (reduced === false) loadPlayer();
  }, [reduced]);

  useEffect(() => {
    const el = box.current;
    if (!el || reduced !== false || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, seen]);

  useEffect(() => {
    const el = box.current;
    if (!el || reduced !== false) return;
    const observer = new ResizeObserver(([entry]) => {
      const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);
      const next = {
        width: even(entry.contentRect.width),
        height: even(entry.contentRect.height),
      };
      setSize((prev) =>
        prev && prev.width === next.width && prev.height === next.height ? prev : next,
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  if (reduced) {
    return fallback ? (
      <div aria-hidden="true" className={fallbackClassName ?? className}>
        {fallback}
      </div>
    ) : null;
  }

  return (
    <div ref={box} aria-hidden="true" inert className={className}>
      {!ready ? placeholder : null}
      {size && seen && reduced === false ? (
        <PlayerCore
          id={id}
          inputProps={inputProps}
          width={size.width}
          height={size.height}
          loop={loop}
          progress={progress}
          onReady={onReady}
        />
      ) : null}
    </div>
  );
}
