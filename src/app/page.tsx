import Link from "next/link";
import type { ReactNode } from "react";
import { Hero } from "@/components/Hero";
import { PostList } from "@/components/PostList";
import { ProjectList } from "@/components/ProjectList";
import { Terminal } from "@/components/Terminal";
import { getPosts } from "@/lib/posts";
import { courses, interests, site, terminalBlocks } from "@/lib/site";

function SectionHead({
  id,
  index,
  title,
  action,
}: {
  id: string;
  index: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="kicker">
          <span className="text-signal">{index}</span> {"//"} {id}
        </p>
        <h2 id={id} className="mt-2 font-mono text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

export default function HomePage() {
  const posts = getPosts().slice(0, 4);

  return (
    <>
      <Hero />

      <div className="shell">
        <section aria-labelledby="sessao" className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <div>
            <p className="kicker">
              <span className="text-signal">00</span> {"//"} field notes
            </p>
            <h2 id="sessao" className="mt-2 font-mono text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Apresentação
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-2">
              <p>
                Sou engenheiro de segurança e de software. Meu trabalho fica na
                interseção entre cybersecurity, aplicações, sistemas
                distribuídos e inteligência artificial.
              </p>
              <p>
                Também pesquiso, escrevo e ensino a partir dos problemas que
                encontro pelo caminho, sobretudo quando a teoria encontra um
                sistema em produção.
              </p>
            </div>
          </div>
          <Terminal title="digenaldo@sec: ~" blocks={terminalBlocks} />
        </section>

        <section aria-labelledby="artigos" className="py-12 md:py-16">
          <SectionHead
            id="artigos"
            index="01"
            title="Últimos artigos"
            action={
              <Link className="link-cmd" href="/artigos/">
                ls ~/artigos →
              </Link>
            }
          />
          <PostList posts={posts} />
        </section>

        <section aria-labelledby="interesses" className="py-12 md:py-16">
          <SectionHead id="interesses" index="02" title="O que tenho estudado" />
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {interests.map((item, i) => (
              <li key={item.name} className="bg-bg p-6 transition-colors hover:bg-panel">
                <p className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-mono text-base font-bold text-signal">{item.name}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="projetos" className="py-12 md:py-16">
          <SectionHead
            id="projetos"
            index="03"
            title="Projetos & experimentos"
            action={
              <Link className="link-cmd" href="/projetos/">
                ls ~/projetos →
              </Link>
            }
          />
          <ProjectList limit={4} />
        </section>

        <section
          aria-label="Pesquisa e ensino"
          className="grid gap-px border border-line bg-line md:grid-cols-2"
        >
          <div className="bg-bg p-8">
            <p className="kicker text-signal">research</p>
            <h2 className="mt-2 font-mono text-2xl font-bold text-ink">Pesquisa</h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              No mestrado, investiguei detecção de ataques DDoS na camada de
              aplicação com machine learning e Big Data. Continuo nessa linha,
              agora também no cruzamento com inteligência artificial.
            </p>
            <Link className="link-cmd mt-6" href="/pesquisa/">
              cat notas-de-pesquisa →
            </Link>
          </div>
          <div className="bg-bg p-8">
            <p className="kicker text-signal">teaching</p>
            <h2 className="mt-2 font-mono text-2xl font-bold text-ink">Ensino</h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Também transformo parte do que estudo e desenvolvo em aulas e
              materiais. O que está publicado aqui é público, sem cadastro.
            </p>
            <a className="link-cmd mt-6" href={courses[0].href}>
              {courses[0].title} →
            </a>
          </div>
        </section>

        <section aria-labelledby="contato" className="py-16 md:py-24">
          <SectionHead id="contato" index="04" title="Contato" />
          <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
            {site.location}. Você me encontra no{" "}
            <a className="text-signal underline underline-offset-4" href={site.social.linkedin} rel="noopener noreferrer">
              LinkedIn
            </a>{" "}
            ou no{" "}
            <a className="text-signal underline underline-offset-4" href={site.social.instagram} rel="noopener noreferrer">
              Instagram @digenaldo.neto
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
