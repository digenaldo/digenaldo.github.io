import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import { ProjectList } from "@/components/ProjectList";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos, laboratórios e experimentos de Digenaldo Neto em cybersecurity, software e pesquisa.",
  alternates: { canonical: "/projetos/" },
};

export default function ProjetosPage() {
  return (
    <div className={`container ${styles.page}`}>
      <PageMast
        kicker="Lab / experiments"
        title="Projetos & experimentos"
        lede="Ferramentas, laboratórios e provas de conceito. Nada aqui é um produto comercial. São coisas que construí para estudar um problema de perto."
      />
      <ProjectList />
    </div>
  );
}
