"use client";

import { useMemo, useState } from "react";
import { PostList, type PostCard } from "@/components/PostList";
import { getTopic } from "@/lib/post-meta";
import { articleTopics } from "@/lib/site";

type Topic = "all" | (typeof articleTopics)[number];

export function ArticleFilters({ posts }: { posts: PostCard[] }) {
  const [topic, setTopic] = useState<Topic>("all");

  const filtered = useMemo(() => {
    if (topic === "all") return posts;
    return posts.filter((post) => getTopic(post) === topic);
  }, [posts, topic]);

  const options: { value: Topic; label: string }[] = [
    { value: "all", label: "Todos" },
    ...articleTopics.map((item) => ({ value: item, label: item })),
  ];

  return (
    <div>
      <div
        role="toolbar"
        aria-label="Filtrar por assunto"
        className="mb-8 flex flex-wrap gap-2 font-mono text-sm"
      >
        <span className="self-center pr-1 text-muted">grep --topic</span>
        {options.map((option) => {
          const active = topic === option.value;
          return (
            <button
              type="button"
              key={option.value}
              onClick={() => setTopic(option.value)}
              aria-pressed={active}
              className={
                active
                  ? "border border-signal bg-signal px-3 py-1.5 text-bg"
                  : "border border-line-2 px-3 py-1.5 text-ink-2 transition-colors hover:border-signal hover:text-signal"
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {filtered.length > 0 ? (
        <PostList posts={filtered} />
      ) : (
        <p className="font-mono text-ink-2">
          0 resultados.{" "}
          <button
            type="button"
            onClick={() => setTopic("all")}
            className="text-signal underline underline-offset-4"
          >
            Ver todos
          </button>
        </p>
      )}
    </div>
  );
}
