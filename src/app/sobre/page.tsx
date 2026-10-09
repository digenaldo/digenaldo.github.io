import type { Metadata } from "next";
import Image from "next/image";
import { PageMast } from "@/components/PageMast";
import { pick } from "@/lib/i18n";

export const metadata: Metadata = {
  title: pick("Sobre", "About"),
  description: pick(
    "Digenaldo Neto, Cybersecurity Engineer e Software Engineer. Escreve, pesquisa e ensina a partir da prática.",
    "Digenaldo Neto, Cybersecurity Engineer and Software Engineer. Writes, researches, and teaches from practice.",
  ),
  alternates: { canonical: "/sobre/" },
};

export default function SobrePage() {
  return (
    <div className="shell">
      <PageMast
        command="finger digenaldo"
        title={pick("Sobre", "About")}
        lede={pick(
          "Engenheiro de segurança e de software. João Pessoa, Brasil.",
          "Security and software engineer. João Pessoa, Brazil.",
        )}
      />

      <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,20rem)_1fr]">
        <figure className="mx-auto w-full max-w-xs self-start border border-line bg-panel md:sticky md:top-24 md:max-w-none">
          <Image
            src="/images/digenaldo-neto.png"
            alt={pick(
              "Digenaldo Neto, de braços cruzados, camiseta preta e óculos, sorrindo.",
              "Digenaldo Neto, arms crossed, wearing a black t-shirt and glasses, smiling.",
            )}
            width={1086}
            height={1448}
            unoptimized
            className="block h-auto w-full"
          />
          <figcaption className="border-t border-line px-3 py-2 font-mono text-xs text-muted">
            ~/digenaldo-neto.png
          </figcaption>
        </figure>

        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-ink-2">
          <p>
            {pick(
              "Sou o Digenaldo. Trabalho com cybersecurity e engenharia de software, quase sempre entre código e arquitetura.",
              "I'm Digenaldo. I work with cybersecurity and software engineering, almost always between code and architecture.",
            )}
          </p>
          <p>
            {pick(
              "Formei-me em Sistemas de Informação na UFPB e fiz mestrado em Tecnologia da Informação no IFPB. A pesquisa de mestrado foi sobre detecção de ataques DDoS na camada de aplicação, com machine learning e Big Data. Essa pergunta ainda me interessa: como perceber um sistema sob ataque sem transformar tudo em alarme.",
              "I earned a bachelor's in Information Systems at UFPB and a master's in Information Technology at IFPB. My master's research was on DDoS detection at the application layer, with machine learning and Big Data. The question still interests me: how to notice a system under attack without turning everything into an alarm.",
            )}
          </p>
          <p>
            {pick(
              "Nos últimos anos concentrei o trabalho em engenharia de segurança aplicada a software e infraestrutura: aplicações, ambientes distribuídos, cloud e, cada vez mais, AI security, os problemas novos que modelos e agentes trazem.",
              "In the last few years I've focused on security engineering for software and infrastructure: applications, distributed environments, cloud, and, more and more, AI security, the new problems that models and agents bring.",
            )}
          </p>
          <p>
            {pick(
              "Também ensino. Explicar um assunto é como eu termino de entendê-lo, então parte do que estudo vira aula ou material.",
              "I also teach. Explaining a topic is how I finish understanding it, so some of what I study turns into classes or material.",
            )}
          </p>
          <p>
            {pick(
              "No Instagram @digenaldo.neto falo de hacking e de IA. Aqui deixo os textos longos: os artigos em inglês ficam no original, e o resto do site está em português.",
              "On Instagram @digenaldo.neto I talk about hacking and AI. Here I keep the longer writing: the articles are in English, and you can read the rest of the site in English or Portuguese.",
            )}
          </p>

          <section className="mt-10 border border-line bg-panel p-6">
            <h2 className="font-mono text-lg font-bold text-signal">
              ## {pick("Tecnologias", "Technologies")}
            </h2>
            <p className="mt-3 text-base">
              {pick(
                "Python, Go, Java, JavaScript. Segurança de aplicações, sistemas distribuídos, observabilidade, aprendizado de máquina aplicado a tráfego e, recentemente, segurança de LLMs e agentes.",
                "Python, Go, Java, JavaScript. Application security, distributed systems, observability, machine learning applied to traffic, and, recently, the security of LLMs and agents.",
              )}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
