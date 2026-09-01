import type { Metadata } from "next";
import { ArticleFilters } from "@/components/ArticleFilters";
import { PageMast } from "@/components/PageMast";
import { getPosts } from "@/lib/posts";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Notas e artigos sobre cybersecurity, AI security, arquitetura e engenharia de software.",
  alternates: { canonical: "/artigos/" },
};

export default function ArtigosPage() {
  const posts = getPosts();

  return (
    <div className={`container ${styles.page}`}>
      <PageMast
        kicker="Index / articles"
        title="Artigos"
        lede="Escrevo principalmente sobre segurança, sistemas distribuídos e inteligência artificial. Os textos em inglês permanecem no original."
      />
      <ArticleFilters posts={posts} />
    </div>
  );
}
