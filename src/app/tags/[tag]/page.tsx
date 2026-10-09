import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageMast } from "@/components/PageMast";
import { PostList } from "@/components/PostList";
import { pick } from "@/lib/i18n";
import { getTags, postsByTag } from "@/lib/posts";

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Tag: ${tag}`,
    description: pick(`Artigos com a tag ${tag}.`, `Articles tagged ${tag}.`),
    alternates: { canonical: `/tags/${tag}/` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = postsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div className="shell">
      <PageMast
        command={`grep -r "#${tag}"`}
        title={`#${tag}`}
        lede={pick(`${posts.length} artigo(s).`, `${posts.length} article(s).`)}
      />
      <div className="pt-10">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
