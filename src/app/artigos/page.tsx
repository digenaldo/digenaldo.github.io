import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import { PostList } from "@/components/PostList";
import { getPosts } from "@/lib/posts";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Artigos sobre cibersegurança, inteligência artificial, arquitetura e engenharia de software.",
  alternates: { canonical: "/artigos/" },
};

export default function ArtigosPage() {
  const posts = getPosts();

  return (
    <div className={styles.sheet}>
      <PageMast
        index="02 / Artigos"
        title="Artigos"
        lede="Artigos sobre cibersegurança, inteligência artificial, arquitetura e engenharia de software. Conteúdos publicados originalmente em inglês permanecem no idioma original."
      />
      <PostList posts={posts} />
    </div>
  );
}
