import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import styles from "../page.module.css";
import local from "./page.module.css";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Digenaldo Neto, professor, Security Engineer e Software Engineer.",
  alternates: { canonical: "/sobre/" },
};

export default function SobrePage() {
  return (
    <div className={styles.sheet}>
      <PageMast
        index="05 / Sobre"
        title="Sobre"
        lede="Professor, Security Engineer e Software Engineer, com mais de dez anos de experiência em desenvolvimento, arquitetura e sistemas distribuídos. Hoje, meu trabalho se concentra em engenharia de segurança aplicada a software e infraestrutura."
      />

      <div className={local.layout}>
        <figure className={local.portrait}>
          <img
            src="/images/digenaldo-neto.png"
            alt="Digenaldo Neto, de braços cruzados, camiseta preta e óculos, sorrindo."
            width={1086}
            height={1448}
          />
        </figure>

        <div className={local.body}>
          <Reveal>
            <div className={local.stack}>
              <section>
                <h2>Trajetória</h2>
                <p>
                  Sou formado em Sistemas de Informação pela UFPB e mestre em
                  Tecnologia da Informação pelo IFPB. No mestrado, pesquisei
                  detecção de ataques DDoS na camada de aplicação utilizando
                  machine learning e Big Data.
                </p>
              </section>
              <section>
                <h2>Trabalho</h2>
                <p>
                  Atuo na construção e proteção de sistemas escaláveis, com foco
                  em segurança de aplicações, arquitetura distribuída, cloud e
                  resiliência.
                </p>
              </section>
              <section>
                <h2>Este site</h2>
                <p>
                  Este site reúne artigos, experimentos e materiais sobre
                  segurança, engenharia de software, inteligência artificial e
                  ensino, sempre com foco em aplicação prática.
                </p>
              </section>
              <section>
                <h2>Contato</h2>
                <p className={local.links}>
                  <a href={site.social.linkedin}>LinkedIn</a>
                  <a href={site.social.github}>GitHub</a>
                </p>
              </section>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
