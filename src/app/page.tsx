import { Hero } from "@/components/Hero";
import { PostList } from "@/components/PostList";
import { Reveal } from "@/components/Reveal";
import { getPosts } from "@/lib/posts";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  const posts = getPosts();

  return (
    <div className={styles.page}>
      <Hero />

      <Reveal delay={0.15}>
        <section aria-labelledby="recentes">
          <div className={styles.sectionHead}>
            <h2 id="recentes">Artigos</h2>
            <Link href="/artigos/">Ver todos</Link>
          </div>
          <PostList posts={posts} />
        </section>
      </Reveal>
    </div>
  );
}
