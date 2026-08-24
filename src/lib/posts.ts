import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  categories: string[];
  language: "en" | "pt-BR";
  readingTime: number;
  body: string;
  draft: boolean;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getPosts(): Post[] {
  return readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readPost(file.replace(/\.md$/, "")))
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getTags(): string[] {
  return unique(getPosts().flatMap((post) => post.tags));
}

export function getCategories(): string[] {
  return unique(getPosts().flatMap((post) => post.categories));
}

export function postsByTag(tag: string): Post[] {
  return getPosts().filter((post) =>
    post.tags.map((item) => slugify(item)).includes(slugify(tag)),
  );
}

export function postsByCategory(category: string): Post[] {
  return getPosts().filter((post) =>
    post.categories.map((item) => slugify(item)).includes(slugify(category)),
  );
}

export function formatDate(iso: string, locale: string = "pt-BR"): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readPost(slug: string): Post {
  const raw = readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, body } = splitFrontMatter(raw);
  const tags = asStringArray(data.tags);
  const categories = asStringArray(data.categories);
  const description =
    asString(data.description) || firstParagraph(body) || asString(data.title);
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const readingTime =
    Number(data.readingTime) || Math.max(1, Math.round(wordCount / 200));

  return {
    slug,
    title: asString(data.title) || slug,
    date: asString(data.date).slice(0, 10),
    description,
    tags,
    categories,
    language: asString(data.language) === "pt-BR" ? "pt-BR" : "en",
    readingTime,
    body: body.trim(),
    draft: data.draft === "true" || data.draft === true,
  };
}

function splitFrontMatter(raw: string): {
  data: Record<string, unknown>;
  body: string;
} {
  const toml = raw.match(/^\+\+\+\n([\s\S]*?)\n\+\+\+\n?([\s\S]*)$/);
  if (toml) {
    return { data: parseTomlish(toml[1]), body: toml[2] };
  }
  const yaml = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (yaml) {
    return { data: parseYamlish(yaml[1]), body: yaml[2] };
  }
  return { data: {}, body: raw };
}

function parseTomlish(source: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const line of source.split("\n")) {
    const match = line.match(/^([A-Za-z][\w]*)\s*=\s*(.+)$/);
    if (!match) continue;
    data[match[1]] = coerce(match[2].trim());
  }
  return data;
}

function parseYamlish(source: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const line of source.split("\n")) {
    const match = line.match(/^([A-Za-z][\w]*)\s*:\s*(.*)$/);
    if (!match) continue;
    data[match[1]] = coerce(match[2].trim());
  }
  return data;
}

function coerce(value: string): unknown {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith("[")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return value.replace(/^["']|["']$/g, "");
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value) return [value];
  return [];
}

function firstParagraph(body: string): string {
  const line = body
    .split("\n")
    .map((item) => item.trim())
    .find((item) => item && !item.startsWith("#") && !item.startsWith("!"));
  return line ? line.replace(/\*+/g, "").slice(0, 220) : "";
}

function unique(values: string[]): string[] {
  return [...new Set(values.map((value) => slugify(value)))].sort();
}
