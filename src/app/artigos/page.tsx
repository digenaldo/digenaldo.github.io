import type { Metadata } from "next";
import { ArticleFilters } from "@/components/ArticleFilters";
import { PageMast } from "@/components/PageMast";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Notas e artigos sobre cybersecurity, AI security, arquitetura e engenharia de software.",
  alternates: { canonical: "/artigos/" },
};

export default function ArtigosPage() {
  const posts = getPosts().map(({ body: _body, ...card }) => card);

  return (
    <div className="shell">
      <PageMast
        command="ls -lt ~/artigos"
        title="Artigos"
        lede="Escrevo principalmente sobre segurança, sistemas distribuídos e inteligência artificial. Os textos em inglês permanecem no original."
      />
      <div className="pt-10">
        <ArticleFilters posts={posts} />
      </div>
    </div>
  );
}
