"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const current = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.mark} href="/">
          <span className={styles.red}>DN</span>
          <span className={styles.name}>{site.name}</span>
        </Link>
        <nav className={styles.nav} aria-label="Principal">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? current === "/"
                : current.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.active : undefined}
                aria-current={active ? "page" : undefined}
              >
                <span className={styles.idx}>{item.n}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
