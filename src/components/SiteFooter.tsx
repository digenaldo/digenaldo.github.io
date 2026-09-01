import { site } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.name}>{site.name}</p>
          <p className="meta-label">Cybersecurity Engineer</p>
        </div>
        <p className={styles.links}>
          <a href={site.social.github} rel="noopener noreferrer">
            GitHub
          </a>
          <a href={site.social.linkedin} rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={site.social.instagram} rel="noopener noreferrer">
            Instagram
          </a>
        </p>
        <p className={styles.meta}>
          {site.location}
          <span aria-hidden="true"> · </span>
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
