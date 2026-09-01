import Link from "next/link";
import { formatFieldDate, getTopic } from "@/lib/post-meta";
import styles from "./PostList.module.css";

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
  numbered?: boolean;
};

export function PostList({ posts, numbered = false }: Props) {
  return (
    <ul className={styles.list}>
      {posts.map((post, index) => (
        <li key={post.slug}>
          <Link href={`/artigos/${post.slug}/`} className={styles.item}>
            {numbered ? (
              <span className={styles.n}>
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <span className={styles.body}>
              <span className={styles.kicker}>
                <span>{getTopic(post)}</span>
                <span aria-hidden="true"> · </span>
                <time dateTime={post.date}>{formatFieldDate(post.date)}</time>
              </span>
              <span className={styles.title}>{post.title}</span>
              <span className={styles.desc}>{post.description}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
