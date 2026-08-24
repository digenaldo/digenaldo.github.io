import type { ReactNode } from "react";
import styles from "./PageMast.module.css";

type Props = {
  index: string;
  title: string;
  lede?: ReactNode;
};

export function PageMast({ index, title, lede }: Props) {
  return (
    <header className={styles.mast}>
      <p className={styles.kicker}>{index}</p>
      <div className={lede ? styles.row : styles.rowSolo}>
        <h1 className={styles.title}>{title}</h1>
        {lede ? <p className={styles.lede}>{lede}</p> : null}
      </div>
    </header>
  );
}
