import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageMast } from "@/components/PageMast";
import { PostList } from "@/components/PostList";
import { pick } from "@/lib/i18n";
import { getCategories, postsByCategory } from "@/lib/posts";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return {
    title: pick(`Categoria: ${category}`, `Category: ${category}`),
    description: pick(
      `Artigos na categoria ${category}.`,
      `Articles in the ${category} category.`,
    ),
    alternates: { canonical: `/categories/${category}/` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = postsByCategory(category);
  if (posts.length === 0) notFound();

  return (
    <div className="shell">
      <PageMast
        command={`ls ~/categorias/${category}`}
        title={category}
        lede={pick(`${posts.length} artigo(s).`, `${posts.length} article(s).`)}
      />
      <div className="pt-10">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
