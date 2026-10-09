import type { Metadata } from "next";
import { ArticleFilters } from "@/components/ArticleFilters";
import { PageMast } from "@/components/PageMast";
import { pick } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: pick("Artigos", "Articles"),
  description: pick(
    "Notas e artigos sobre cybersecurity, AI security, arquitetura e engenharia de software.",
    "Notes and articles on cybersecurity, AI security, architecture, and software engineering.",
  ),
  alternates: { canonical: "/artigos/" },
};

export default function ArtigosPage() {
  const posts = getPosts().map(({ body: _body, ...card }) => card);

  return (
    <div className="shell">
      <PageMast
        command="ls -lt ~/artigos"
        title={pick("Artigos", "Articles")}
        lede={pick(
          "Escrevo principalmente sobre segurança, sistemas distribuídos e inteligência artificial. Os textos em inglês permanecem no original.",
          "I write mostly about security, distributed systems, and artificial intelligence. The articles are in English.",
        )}
      />
      <div className="pt-10">
        <ArticleFilters posts={posts} />
      </div>
    </div>
  );
}
