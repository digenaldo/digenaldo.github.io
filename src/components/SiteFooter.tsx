import { site } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p className={styles.meta}>Pesquisa. Engenharia. Ensino.</p>
        </div>
        <p className={styles.links}>
          <a href={site.social.github}>GitHub</a>
          <a href={site.social.linkedin}>LinkedIn</a>
          <a href={site.social.instagram}>Instagram</a>
        </p>
      </div>
    </footer>
  );
}
