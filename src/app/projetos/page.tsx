import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import { ProjectList } from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos, laboratórios e experimentos de Digenaldo Neto em cybersecurity, software e pesquisa.",
  alternates: { canonical: "/projetos/" },
};

export default function ProjetosPage() {
  return (
    <div className="shell">
      <PageMast
        command="ls ~/lab"
        title="Projetos & experimentos"
        lede="Ferramentas, laboratórios e provas de conceito. Nada aqui é um produto comercial. São coisas que construí para estudar um problema de perto."
      />
      <div className="pt-10">
        <ProjectList />
      </div>
    </div>
  );
}
