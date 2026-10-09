import Link from "next/link";
import type { ReactNode } from "react";
import { Hero } from "@/components/Hero";
import { PostList } from "@/components/PostList";
import { ProjectList } from "@/components/ProjectList";
import { Terminal } from "@/components/Terminal";
import { pick } from "@/lib/i18n";
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
              {pick("Apresentação", "Intro")}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-2">
              <p>
                {pick(
                  "Sou engenheiro de segurança e de software. Pesquiso, escrevo e ensino a partir de problemas que encontrei no trabalho.",
                  "I'm a security and software engineer. I research, write, and teach from problems I ran into at work.",
                )}
              </p>
              <p>
                {pick("No Instagram ", "On Instagram ")}
                <a
                  className="text-signal underline underline-offset-4"
                  href={site.social.instagram}
                  rel="noopener noreferrer"
                >
                  @digenaldo.neto
                </a>{" "}
                {pick(
                  "falo de hacking e de IA, principalmente AI security. Aqui ficam os artigos completos e os projetos.",
                  "I talk about hacking and AI, mostly AI security. The full articles and projects live here.",
                )}
              </p>
            </div>
          </div>
          <Terminal title="digenaldo@sec: ~" blocks={terminalBlocks} />
        </section>

        <section aria-labelledby="artigos" className="py-12 md:py-16">
          <SectionHead
            id="artigos"
            index="01"
            title={pick("Últimos artigos", "Latest articles")}
            action={
              <Link className="link-cmd" href="/artigos/">
                ls ~/artigos →
              </Link>
            }
          />
          <PostList posts={posts} />
        </section>

        <section aria-labelledby="interesses" className="py-12 md:py-16">
          <SectionHead
            id="interesses"
            index="02"
            title={pick("O que tenho estudado", "What I've been studying")}
          />
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
            title={pick("Projetos & experimentos", "Projects & experiments")}
            action={
              <Link className="link-cmd" href="/projetos/">
                ls ~/projetos →
              </Link>
            }
          />
          <ProjectList limit={4} />
        </section>

        <section
          aria-label={pick("Pesquisa e ensino", "Research and teaching")}
          className="grid gap-px border border-line bg-line md:grid-cols-2"
        >
          <div className="bg-bg p-8">
            <p className="kicker text-signal">research</p>
            <h2 className="mt-2 font-mono text-2xl font-bold text-ink">
              {pick("Pesquisa", "Research")}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              {pick(
                "No mestrado, investiguei detecção de ataques DDoS na camada de aplicação com machine learning e Big Data. Continuo nessa linha, agora também no cruzamento com inteligência artificial.",
                "In my master's, I studied DDoS detection at the application layer with machine learning and Big Data. I keep working on it, now also where it meets artificial intelligence.",
              )}
            </p>
            <Link className="link-cmd mt-6" href="/pesquisa/">
              cat notas-de-pesquisa →
            </Link>
          </div>
          <div className="bg-bg p-8">
            <p className="kicker text-signal">teaching</p>
            <h2 className="mt-2 font-mono text-2xl font-bold text-ink">
              {pick("Ensino", "Teaching")}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              {pick(
                "Parte do que estudo vira aula ou material. Tudo aqui é público e não pede cadastro.",
                "Some of what I study turns into classes or material. Everything here is public and needs no sign-up.",
              )}
            </p>
            <a className="link-cmd mt-6" href={courses[0].href}>
              {courses[0].title} →
            </a>
          </div>
        </section>

        <section aria-labelledby="contato" className="py-16 md:py-24">
          <SectionHead id="contato" index="04" title={pick("Contato", "Contact")} />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="max-w-xl text-lg leading-relaxed text-ink-2">
                {pick(
                  "Para falar sobre AI security, pentest ou aulas, mande um e-mail. Conteúdo sobre hacking e IA sai no Instagram @digenaldo.neto.",
                  "To talk about AI security, pentest, or classes, send an email. Hacking and AI content goes out on Instagram @digenaldo.neto.",
                )}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-8 inline-block border border-signal bg-signal px-4 py-2.5 font-mono text-sm font-medium text-bg transition-colors hover:bg-transparent hover:text-signal"
              >
                {pick("./enviar-email", "./send-email")}
              </a>
              <p className="mt-6 font-mono text-xs text-muted">{site.location}</p>
            </div>

            <div className="border border-line bg-panel font-mono text-sm">
              <p className="border-b border-line px-4 py-2.5 text-xs text-muted">
                <span className="text-signal">$</span> cat ~/contato
              </p>
              <dl className="divide-y divide-line">
                {[
                  { key: "email", label: site.email, href: `mailto:${site.email}` },
                  { key: "instagram", label: "@digenaldo.neto", href: site.social.instagram },
                  { key: "linkedin", label: "in/digenaldo", href: site.social.linkedin },
                  { key: "github", label: "digenaldo", href: site.social.github },
                  { key: "youtube", label: "@digenaldoneto", href: site.social.youtube },
                ].map((row) => (
                  <div key={row.key} className="grid grid-cols-[6.5rem_1fr] gap-3 px-4 py-3 sm:grid-cols-[8rem_1fr]">
                    <dt className="text-muted">{row.key}</dt>
                    <dd className="min-w-0">
                      <a
                        href={row.href}
                        rel={row.key === "email" ? undefined : "noopener noreferrer"}
                        className="break-all text-ink transition-colors hover:text-signal"
                      >
                        {row.label}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
