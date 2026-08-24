import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import styles from "../page.module.css";
import local from "./page.module.css";

export const metadata: Metadata = {
  title: "Ensino",
  description:
    "Cursos e materiais de Digenaldo Neto para transformar conceitos técnicos em prática.",
  alternates: { canonical: "/ensino/" },
};

export default function EnsinoPage() {
  return (
    <div className={styles.page}>
      <PageMast
        index="03 / Ensino"
        title="Ensino"
        lede="Conteúdo técnico feito para transformar conceitos complexos em conhecimento aplicável."
      />

      <a className={local.course} href="/cursos/ia-na-pratica.html">
        <span className={local.idx}>01</span>
        <span>
          <strong>Inteligência Artificial na Prática</strong>
          <em>Curso público em slides · fundamentos, prompts, limites e prática.</em>
        </span>
      </a>
    </div>
  );
}
