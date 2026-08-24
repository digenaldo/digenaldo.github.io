"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import styles from "./template.module.css";

export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(node, {
        opacity: 0,
        y: 16,
        duration: 0.45,
        ease: "power2.out",
      });
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={styles.enter}>
      {children}
    </div>
  );
}
