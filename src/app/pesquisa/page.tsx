import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";

export const metadata: Metadata = {
  title: "Pesquisa",
  description:
    "Pesquisa aplicada em segurança e sistemas distribuídos, da detecção de DDoS à segurança de modelos de linguagem.",
  alternates: { canonical: "/pesquisa/" },
};

const panel = "bg-bg p-6 md:p-8";
const heading = "font-mono text-lg font-bold text-signal";

export default function PesquisaPage() {
  return (
    <div className="shell">
      <PageMast
        command="cat ~/research/README"
        title="Pesquisa"
        lede="A pesquisa entra na minha trajetória como engenharia com pergunta: o que o sistema faz quando é pressionado, e como perceber isso a tempo."
      />

      <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-3">
        <section className={panel}>
          <h2 className={heading}>## Temas</h2>
          <ul className="mt-4 space-y-3 text-ink-2">
            {[
              "Detecção de DDoS na camada de aplicação",
              "Aprendizado de máquina aplicado a tráfego malicioso",
              "Segurança de modelos de linguagem e agentes",
              "Arquitetura de sistemas distribuídos",
            ].map((topic) => (
              <li key={topic} className="flex gap-2">
                <span aria-hidden="true" className="font-mono text-signal">
                  -
                </span>
                {topic}
              </li>
            ))}
          </ul>
        </section>

        <section className={panel}>
          <h2 className={heading}>## Formação</h2>
          <p className="mt-4 leading-relaxed text-ink-2">
            Bacharel em Sistemas de Informação pela UFPB. Mestre em Tecnologia
            da Informação pelo IFPB, com pesquisa em detecção de ataques DDoS na
            camada de aplicação usando machine learning e Big Data.
          </p>
        </section>

        <section className={panel}>
          <h2 className={heading}>## Experimentos</h2>
          <p className="mt-4 leading-relaxed text-ink-2">
            Parte desse trabalho está em repositórios abertos, como o simulador
            de detecção de DDoS e o sistema de tráfego malicioso. Não listo
            papers que não publiquei.
          </p>
          <ul className="mt-6 space-y-2 font-mono text-sm">
            <li>
              <a
                href="https://github.com/digenaldo/ddos-detection-simulator"
                rel="noopener noreferrer"
                className="text-ink transition-colors hover:text-signal"
              >
                ↗ ddos-detection-simulator
              </a>
            </li>
            <li>
              <a
                href="https://github.com/digenaldo/malicious-traffic-detection-ml"
                rel="noopener noreferrer"
                className="text-ink transition-colors hover:text-signal"
              >
                ↗ malicious-traffic-detection-ml
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
