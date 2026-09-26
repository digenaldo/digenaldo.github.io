import type { Metadata } from "next";
import Image from "next/image";
import { PageMast } from "@/components/PageMast";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Digenaldo Neto, Cybersecurity Engineer e Software Engineer. Escreve, pesquisa e ensina a partir da prática.",
  alternates: { canonical: "/sobre/" },
};

export default function SobrePage() {
  return (
    <div className="shell">
      <PageMast
        command="finger digenaldo"
        title="Sobre"
        lede="Engenheiro de segurança e de software. João Pessoa, Brasil."
      />

      <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,20rem)_1fr]">
        <figure className="mx-auto w-full max-w-xs self-start border border-line bg-panel md:sticky md:top-24 md:max-w-none">
          <Image
            src="/images/digenaldo-neto.png"
            alt="Digenaldo Neto, de braços cruzados, camiseta preta e óculos, sorrindo."
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
            Sou o Digenaldo. Trabalho com cybersecurity e engenharia de
            software. Na prática, isso significa passar bastante tempo entre
            código, arquitetura e as falhas que só aparecem quando o sistema
            está no ar.
          </p>
          <p>
            Formei-me em Sistemas de Informação na UFPB e fiz mestrado em
            Tecnologia da Informação no IFPB. A pesquisa de mestrado foi sobre
            detecção de ataques DDoS na camada de aplicação, com machine
            learning e Big Data. Essa pergunta ainda me interessa: como
            perceber um sistema sob ataque sem transformar tudo em alarme.
          </p>
          <p>
            Nos últimos anos concentrei o trabalho em engenharia de segurança
            aplicada a software e infraestrutura: aplicações, ambientes
            distribuídos, cloud e, cada vez mais, os problemas novos que a
            inteligência artificial introduz.
          </p>
          <p>
            Também ensino. Parte do que estudo vira aula ou material, não
            porque eu tenha um produto educacional, mas porque escrever e
            explicar é uma forma de entender o problema até o fim.
          </p>
          <p>
            Este site é o lugar onde deixo isso público. Artigos em inglês
            permanecem em inglês. O chrome da página está em português porque
            é o idioma em que vivo.
          </p>

          <section className="mt-10 border border-line bg-panel p-6">
            <h2 className="font-mono text-lg font-bold text-signal">## Tecnologias</h2>
            <p className="mt-3 text-base">
              Python, Go, Java, JavaScript. Segurança de aplicações, sistemas
              distribuídos, observabilidade, aprendizado de máquina aplicado a
              tráfego e, recentemente, segurança de LLMs e agentes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
