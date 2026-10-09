import Image from "next/image";
import Link from "next/link";
import { Motion } from "@/components/motion/Motion";
import { pick } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="nome"
      className="scanlines relative overflow-hidden border-b border-line"
    >
      <Motion
        id="hex-rain"
        loop
        className="pointer-events-none absolute inset-0 opacity-25 [mask-image:linear-gradient(to_left,black_10%,transparent_80%)] md:opacity-40"
      />
      <div className="shell relative grid gap-12 py-14 md:grid-cols-[1.35fr_1fr] md:items-center md:py-24">
        <div>
          <p className="inline-flex items-center gap-2 border border-line bg-panel px-3 py-1 font-mono text-xs text-ink-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
            currently exploring: <span className="text-signal">{site.exploring}</span>
          </p>
          <h1
            id="nome"
            className="mt-6 font-mono text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {site.name}
          </h1>
          <p className="mt-3 font-mono text-sm text-signal sm:text-base">
            {"> "}
            {site.role}
          </p>
          <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-2">
            <p>
              {pick(
                "Trabalho com segurança de aplicações, arquitetura de software, sistemas distribuídos e inteligência artificial.",
                "I work with application security, software architecture, distributed systems, and artificial intelligence.",
              )}
            </p>
            <p>
              {pick(
                "Escrevo sobre AI security, hacking e as falhas de engenharia que só aparecem com o sistema no ar.",
                "I write about AI security, hacking, and the engineering failures that only show up once the system is live.",
              )}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-sm">
            <Link
              href="/artigos/"
              className="border border-signal bg-signal px-4 py-2.5 font-medium text-bg transition-colors hover:bg-transparent hover:text-signal"
            >
              {pick("./ler-artigos", "./read-articles")}
            </Link>
            <Link
              href="/projetos/"
              className="border border-line-2 px-4 py-2.5 text-ink transition-colors hover:border-signal hover:text-signal"
            >
              {pick("./projetos", "./projects")}
            </Link>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-sm border border-line bg-panel md:max-w-none">
          <Image
            src="/images/digenaldo-neto.png"
            alt={pick(
              "Digenaldo Neto, de braços cruzados, camiseta preta e óculos, sorrindo.",
              "Digenaldo Neto, arms crossed, wearing a black t-shirt and glasses, smiling.",
            )}
            width={1086}
            height={1448}
            priority
            unoptimized
            className="block h-auto w-full"
          />
          <Motion id="portrait-scan" className="absolute inset-0" />
        </figure>
      </div>
    </section>
  );
}
