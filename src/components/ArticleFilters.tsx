"use client";

import { useMemo, useState } from "react";
import { PostList, type PostCard } from "@/components/PostList";
import { getTopic } from "@/lib/post-meta";
import { articleTopics } from "@/lib/site";
import styles from "./ArticleFilters.module.css";

export function ArticleFilters({ posts }: { posts: PostCard[] }) {
  const [topic, setTopic] = useState<"all" | (typeof articleTopics)[number]>(
    "all",
  );

  const filtered = useMemo(() => {
    if (topic === "all") return posts;
    return posts.filter((post) => getTopic(post) === topic);
  }, [posts, topic]);

  return (
    <div>
      <div className={styles.bar} role="toolbar" aria-label="Filtrar por assunto">
        <button
          type="button"
          className={topic === "all" ? styles.active : styles.chip}
          onClick={() => setTopic("all")}
          aria-pressed={topic === "all"}
        >
          Todos
        </button>
        {articleTopics.map((item) => (
          <button
            type="button"
            key={item}
            className={topic === item ? styles.active : styles.chip}
            onClick={() => setTopic(item)}
            aria-pressed={topic === item}
          >
            {item}
          </button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <PostList posts={filtered} />
      ) : (
        <p className={styles.empty}>
          Nenhum artigo nesse assunto por enquanto.{" "}
          <button
            type="button"
            className={styles.reset}
            onClick={() => setTopic("all")}
          >
            Ver todos
          </button>
          .
        </p>
      )}
    </div>
  );
}
