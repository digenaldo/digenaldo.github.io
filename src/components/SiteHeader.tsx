import Link from "next/link";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.home} href="/" aria-label="Início">
        Home
      </Link>
      <span className={styles.fiber} aria-hidden="true">
        <span className={styles.packet} />
      </span>
    </header>
  );
}
