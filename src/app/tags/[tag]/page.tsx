import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageMast } from "@/components/PageMast";
import { PostList } from "@/components/PostList";
import { getTags, postsByTag } from "@/lib/posts";
import styles from "../../page.module.css";

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Tag: ${tag}`,
    description: `Artigos com a tag ${tag}.`,
    alternates: { canonical: `/tags/${tag}/` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = postsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div className={`container ${styles.page}`}>
      <PageMast kicker="Tag" title={tag} lede={`${posts.length} artigo(s).`} />
      <PostList posts={posts} />
    </div>
  );
}
