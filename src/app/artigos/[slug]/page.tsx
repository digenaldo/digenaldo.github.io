import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/MarkdownBody";
import { Motion } from "@/components/motion/Motion";
import { ReadingProgress } from "@/components/ReadingProgress";
import { formatFieldDate, getPost, getPosts, getTopic, slugify } from "@/lib/posts";
import { shellUser, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/artigos/${post.slug}/`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);
  const command = `less ./artigo.md --lang=${post.language}`;
  const prompt = (text: string) => (
    <p className="flex h-7 items-center overflow-hidden whitespace-pre font-mono text-xs sm:text-[13px]">
      <span className="text-signal">{shellUser}</span>
      <span className="text-muted">:~$ </span>
      <span className="truncate text-ink">{text}</span>
    </p>
  );

  return (
    <>
      <ReadingProgress />
      <article lang="en" className="shell pb-16">
        <header className="mx-auto max-w-3xl border-b border-line pb-10 pt-12 md:pt-16">
          <Motion
            id="command-line"
            inputProps={{ user: shellUser, command }}
            className="h-7 w-full overflow-hidden"
            placeholder={prompt("")}
            fallback={prompt(command)}
          />
          <p lang="pt-BR" className="mt-8 font-mono text-xs text-muted">
            <span className="text-signal">[{getTopic(post)}]</span>{" "}
            <time dateTime={post.date}>{formatFieldDate(post.date)}</time>
            {" · "}
            {post.readingTime} min
          </p>
          <h1 className="mt-4 font-mono text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink-2">{post.description}</p>
          <p className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <span>{site.name}</span>
            {post.tags.slice(0, 5).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slugify(tag)}/`}
                className="border border-line px-2 py-0.5 transition-colors hover:border-signal hover:text-signal"
              >
                #{tag}
              </Link>
            ))}
          </p>
        </header>

        <div className="mx-auto max-w-3xl pt-10">
          <MarkdownBody content={post.body} />
        </div>

        {related.length > 0 ? (
          <aside lang="pt-BR" className="mx-auto mt-20 max-w-3xl border-t border-line pt-8">
            <p className="kicker">
              <span className="text-signal">$</span> ls ../outros-artigos
            </p>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/artigos/${item.slug}/`}
                    lang={item.language}
                    className="text-lg text-ink transition-colors hover:text-signal"
                  >
                    <span className="font-mono text-signal">→ </span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </>
  );
}
