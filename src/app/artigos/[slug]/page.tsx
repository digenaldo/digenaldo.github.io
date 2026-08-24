import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/MarkdownBody";
import { formatDate, getPost, getPosts } from "@/lib/posts";
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

  return (
    <article lang="en" className={styles.article}>
      <header className={styles.header}>
        <p className={styles.kicker}>
          {post.tags[0] ?? "Article"} · {post.language.toUpperCase()} ·{" "}
          {post.readingTime} min
        </p>
        <h1>{post.title}</h1>
        <p className={styles.desc}>{post.description}</p>
        <p className={styles.meta}>
          {formatDate(post.date, "en-GB")} · {site.name}
        </p>
      </header>
      <MarkdownBody content={post.body} />
    </article>
  );
}
