"use client";

import { useMemo, useState } from "react";
import { PostList, type PostCard } from "@/components/PostList";
import { pick } from "@/lib/i18n";
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
    { value: "all", label: pick("Todos", "All") },
    ...articleTopics.map((item) => ({ value: item, label: item })),
  ];

  return (
    <div>
      <div
        role="toolbar"
        aria-label={pick("Filtrar por assunto", "Filter by topic")}
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
          {pick("0 resultados.", "0 results.")}{" "}
          <button
            type="button"
            onClick={() => setTopic("all")}
            className="text-signal underline underline-offset-4"
          >
            {pick("Ver todos", "Show all")}
          </button>
        </p>
      )}
    </div>
  );
}
