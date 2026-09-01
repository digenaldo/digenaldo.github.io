import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import { courses } from "@/lib/site";
import styles from "../page.module.css";
import local from "./page.module.css";

export const metadata: Metadata = {
  title: "Ensino",
  description:
    "Aulas e materiais de Digenaldo Neto sobre inteligência artificial, segurança e engenharia.",
  alternates: { canonical: "/ensino/" },
};

export default function EnsinoPage() {
  return (
    <div className={`container ${styles.page}`}>
      <PageMast
        kicker="Teaching / notes"
        title="Ensino"
        lede="Também transformo parte do que estudo e desenvolvo em aulas e materiais. O objetivo é clareza, não um catálogo de cursos."
      />

      {courses.map((course) => (
        <a key={course.href} className={local.course} href={course.href}>
          <span className={local.idx}>01</span>
          <span>
            <strong>{course.title}</strong>
            <em>{course.description}</em>
          </span>
        </a>
      ))}
    </div>
  );
}
