import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import { site } from "@/lib/site";
import styles from "../page.module.css";
import local from "./page.module.css";

export const metadata: Metadata = {
  title: "Pesquisa",
  description:
    "Pesquisa aplicada em segurança e sistemas distribuídos, conectando investigação acadêmica a problemas reais de engenharia.",
  alternates: { canonical: "/pesquisa/" },
};

export default function PesquisaPage() {
  return (
    <div className={styles.sheet}>
      <PageMast
        index="04 / Pesquisa"
        title="Pesquisa"
        lede="Pesquisa aplicada em segurança e sistemas distribuídos, conectando investigação acadêmica a problemas reais de engenharia."
      />

      <div className={local.grid}>
        <section className={local.research}>
          <h2>Pesquisa</h2>
          <p>
            Minha pesquisa de mestrado investigou a detecção de ataques DDoS na
            camada de aplicação utilizando machine learning e Big Data.
          </p>
        </section>

        <section className={local.education}>
          <h2>Formação</h2>
          <p>
            Bacharel em Sistemas de Informação pela UFPB e mestre em Tecnologia
            da Informação pelo IFPB.
          </p>
        </section>

        <section className={local.profiles}>
          <h2>Perfis</h2>
          <p className={local.links}>
            <a href={site.social.github}>GitHub</a>
            <a href={site.social.linkedin}>LinkedIn</a>
          </p>
        </section>
      </div>
    </div>
  );
}
