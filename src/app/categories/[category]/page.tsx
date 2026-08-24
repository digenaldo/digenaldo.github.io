import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageMast } from "@/components/PageMast";
import { PostList } from "@/components/PostList";
import { getCategories, postsByCategory } from "@/lib/posts";
import styles from "../../page.module.css";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `Categoria: ${category}`,
    alternates: { canonical: `/categories/${category}/` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = postsByCategory(category);
  if (posts.length === 0) notFound();

  return (
    <div className={styles.page}>
      <PageMast index="Categoria" title={category} />
      <PostList posts={posts} />
    </div>
  );
}
