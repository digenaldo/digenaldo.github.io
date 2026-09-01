import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import styles from "../page.module.css";
import local from "./page.module.css";

export const metadata: Metadata = {
  title: "Pesquisa",
  description:
    "Pesquisa aplicada em segurança e sistemas distribuídos, da detecção de DDoS à segurança de modelos de linguagem.",
  alternates: { canonical: "/pesquisa/" },
};

export default function PesquisaPage() {
  return (
    <div className={`container ${styles.page}`}>
      <PageMast
        kicker="Research / notes"
        title="Pesquisa"
        lede="A pesquisa entra na minha trajetória como engenharia com pergunta: o que o sistema faz quando é pressionado, e como perceber isso a tempo."
      />

      <div className={local.layout}>
        <section>
          <h2>Temas</h2>
          <ul className={local.topics}>
            <li>Detecção de DDoS na camada de aplicação</li>
            <li>Aprendizado de máquina aplicado a tráfego malicioso</li>
            <li>Segurança de modelos de linguagem e agentes</li>
            <li>Arquitetura de sistemas distribuídos</li>
          </ul>
        </section>

        <section>
          <h2>Formação</h2>
          <p>
            Bacharel em Sistemas de Informação pela UFPB. Mestre em Tecnologia
            da Informação pelo IFPB, com pesquisa em detecção de ataques DDoS na
            camada de aplicação usando machine learning e Big Data.
          </p>
        </section>

        <section>
          <h2>Experimentos</h2>
          <p>
            Parte desse trabalho está em repositórios abertos, como o simulador
            de detecção de DDoS e o sistema de tráfego malicioso. Não listo
            papers que não publiquei.
          </p>
          <p className={local.links}>
            <a
              href="https://github.com/digenaldo/ddos-detection-simulator"
              rel="noopener noreferrer"
            >
              DDoS Detection Simulator
            </a>
            <a
              href="https://github.com/digenaldo/malicious-traffic-detection-ml"
              rel="noopener noreferrer"
            >
              Malicious Traffic Detection
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
