import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import { ProjectList } from "@/components/ProjectList";
import { pick } from "@/lib/i18n";

export const metadata: Metadata = {
  title: pick("Projetos", "Projects"),
  description: pick(
    "Projetos, laboratórios e experimentos de Digenaldo Neto em cybersecurity, software e pesquisa.",
    "Projects, labs, and experiments by Digenaldo Neto in cybersecurity, software, and research.",
  ),
  alternates: { canonical: "/projetos/" },
};

export default function ProjetosPage() {
  return (
    <div className="shell">
      <PageMast
        command="ls ~/lab"
        title={pick("Projetos & experimentos", "Projects & experiments")}
        lede={pick(
          "Ferramentas, laboratórios e provas de conceito que construí para estudar problemas de perto. São projetos pessoais, sem fins comerciais.",
          "Tools, labs, and proofs of concept I built to study problems up close. These are personal projects, with no commercial goal.",
        )}
      />
      <div className="pt-10">
        <ProjectList />
      </div>
    </div>
  );
}
