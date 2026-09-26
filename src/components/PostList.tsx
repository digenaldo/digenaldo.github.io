import Link from "next/link";
import { formatFieldDate, getTopic } from "@/lib/post-meta";

export type PostCard = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  categories: string[];
  language: "en" | "pt-BR";
  readingTime: number;
};

type Props = {
  posts: PostCard[];
};

export function PostList({ posts }: Props) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/artigos/${post.slug}/`}
            className="group grid gap-2 border-l-2 border-transparent py-6 pl-4 pr-2 transition-colors hover:border-signal hover:bg-panel sm:grid-cols-[11rem_1fr] sm:gap-6"
          >
            <span className="font-mono text-xs leading-6 text-muted">
              <span className="text-signal">[{getTopic(post)}]</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> · </span>
              <time dateTime={post.date}>{formatFieldDate(post.date)}</time>
              <span> · {post.readingTime} min</span>
            </span>
            <span>
              <span
                lang={post.language}
                className="block text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-signal"
              >
                {post.title}
              </span>
              <span
                lang={post.language}
                className="mt-2 block max-w-3xl leading-relaxed text-ink-2"
              >
                {post.description}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
