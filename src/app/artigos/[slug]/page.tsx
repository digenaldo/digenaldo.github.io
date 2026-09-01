import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ReadingProgress } from "@/components/ReadingProgress";
import { formatFieldDate, getPost, getPosts, getTopic } from "@/lib/posts";
import { site } from "@/lib/site";
import styles from "./page.module.css";

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

  return (
    <>
      <ReadingProgress />
      <article lang="en" className={styles.article}>
        <header className={styles.header}>
          <p className={styles.kicker}>
            {getTopic(post)}
            <span aria-hidden="true"> · </span>
            <time dateTime={post.date}>{formatFieldDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.readingTime} min
          </p>
          <h1>{post.title}</h1>
          <p className={styles.desc}>{post.description}</p>
          <p className={styles.meta}>
            {site.name}
            {post.tags[0] ? ` · ${post.tags[0]}` : ""}
          </p>
        </header>
        <MarkdownBody content={post.body} />
        {related.length > 0 ? (
          <aside className={styles.more} lang="pt-BR">
            <p className="meta-label">Outros artigos</p>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/artigos/${item.slug}/`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </>
  );
}
