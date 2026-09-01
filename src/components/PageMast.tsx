import type { ReactNode } from "react";
import styles from "./PageMast.module.css";

type Props = {
  kicker?: string;
  title: string;
  lede?: ReactNode;
};

export function PageMast({ kicker, title, lede }: Props) {
  return (
    <header className={styles.mast}>
      {kicker ? <p className="meta-accent">{kicker}</p> : null}
      <div className={lede ? styles.row : undefined}>
        <h1 className={styles.title}>{title}</h1>
        {lede ? <p className={styles.lede}>{lede}</p> : null}
      </div>
    </header>
  );
}
