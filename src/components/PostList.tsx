import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import styles from "./PostList.module.css";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className={styles.list}>
      {posts.map((post, index) => (
        <li key={post.slug}>
          <Link href={`/artigos/${post.slug}/`}>
            <span className={styles.n}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.body}>
              <span className={styles.title}>{post.title}</span>
              <span className={styles.meta}>
                {formatDate(post.date)} · {post.language.toUpperCase()} ·{" "}
                {post.readingTime} min
                {post.tags[0] ? ` · ${post.tags[0]}` : ""}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
