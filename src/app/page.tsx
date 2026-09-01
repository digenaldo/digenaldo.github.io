import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PostList } from "@/components/PostList";
import { ProjectList } from "@/components/ProjectList";
import { getPosts } from "@/lib/posts";
import { courses, interests, site } from "@/lib/site";
import styles from "./page.module.css";

export default function HomePage() {
  const posts = getPosts().slice(0, 4);

  return (
    <div className={`container ${styles.page}`}>
      <Hero />

      <section className={styles.section} aria-labelledby="apresentacao">
        <p className="meta-label">Field notes / 026</p>
        <h2 id="apresentacao" className={styles.hidden}>
          Apresentação
        </h2>
        <p className={styles.intro}>
          Sou engenheiro de segurança e de software. Meu trabalho fica na
          interseção entre cybersecurity, aplicações, sistemas distribuídos e
          inteligência artificial.
        </p>
        <p className={styles.intro}>
          Também pesquiso, escrevo e ensino a partir dos problemas que encontro
          pelo caminho, sobretudo quando a teoria encontra um sistema em
          produção.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="recentes">
        <div className={styles.head}>
          <h2 id="recentes">Últimos artigos</h2>
          <Link className="link-arrow" href="/artigos/">
            Ver todos os artigos →
          </Link>
        </div>
        <PostList posts={posts} />
      </section>

      <section className={styles.section} aria-labelledby="interesses">
        <div className={styles.head}>
          <h2 id="interesses">O que tenho estudado</h2>
        </div>
        <ul className={styles.interests}>
          {interests.map((item) => (
            <li key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="projetos">
        <div className={styles.head}>
          <h2 id="projetos">Projetos & experimentos</h2>
          <Link className="link-arrow" href="/projetos/">
            Ver projetos →
          </Link>
        </div>
        <ProjectList limit={3} />
      </section>

      <section className={styles.split} aria-labelledby="pesquisa-ensino">
        <div>
          <p className="meta-accent">Research</p>
          <h2 id="pesquisa-ensino">Pesquisa</h2>
          <p>
            No mestrado, investiguei detecção de ataques DDoS na camada de
            aplicação com machine learning e Big Data. Continuo nessa linha,
            agora também no cruzamento com inteligência artificial.
          </p>
          <Link className="link-arrow" href="/pesquisa/">
            Notas de pesquisa →
          </Link>
        </div>
        <div>
          <p className="meta-accent">Teaching</p>
          <h2>Ensino</h2>
          <p>
            Também transformo parte do que estudo e desenvolvo em aulas e
            materiais. O que está publicado aqui é público, sem cadastro.
          </p>
          <a className="link-arrow" href={courses[0].href}>
            {courses[0].title} →
          </a>
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="contato">
        <p className="meta-label">Status: exploring</p>
        <h2 id="contato">Contato</h2>
        <p>
          {site.location}.
        </p>
      </section>
    </div>
  );
}
