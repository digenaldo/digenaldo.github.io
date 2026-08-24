import Link from "next/link";
import { PageMast } from "@/components/PageMast";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <PageMast
        index="404"
        title="Página não encontrada"
        lede={
          <>
            O endereço não existe. Volte ao <Link href="/">início</Link> ou aos{" "}
            <Link href="/artigos/">artigos</Link>.
          </>
        }
      />
    </div>
  );
}
