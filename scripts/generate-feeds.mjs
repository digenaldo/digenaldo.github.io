import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const SITE = "https://digenaldo.com";

function splitFrontMatter(raw) {
  const toml = raw.match(/^\+\+\+\n([\s\S]*?)\n\+\+\+\n?([\s\S]*)$/);
  if (toml) return { fm: toml[1], body: toml[2], kind: "toml" };
  const yaml = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (yaml) return { fm: yaml[1], body: yaml[2], kind: "yaml" };
  return { fm: "", body: raw, kind: "none" };
}

function coerce(value) {
  if (value.startsWith("[")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""));
  }
  return value.replace(/^["']|["']$/g, "");
}

function parseFm(source, kind) {
  const data = {};
  const sep = kind === "toml" ? "=" : ":";
  for (const line of source.split("\n")) {
    const match = line.match(new RegExp(`^([A-Za-z][\\w]*)\\s*${sep}\\s*(.*)$`));
    if (match) data[match[1]] = coerce(match[2].trim());
  }
  return data;
}

function firstParagraph(body) {
  const line = body
    .split("\n")
    .map((item) => item.trim())
    .find((item) => item && !item.startsWith("#") && !item.startsWith("!"));
  return line ? line.replace(/\*+/g, "").slice(0, 220) : "";
}

function escape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getPosts() {
  return readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { fm, body, kind } = splitFrontMatter(raw);
      const data = parseFm(fm, kind);
      return {
        slug,
        title: data.title || slug,
        date: String(data.date || "").slice(0, 10),
        description: data.description || firstParagraph(body),
        draft: data.draft === true || data.draft === "true",
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

const posts = getPosts();
const items = posts
  .map(
    (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${SITE}/artigos/${post.slug}/</link>
      <guid>${SITE}/artigos/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.description)}</description>
    </item>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Digenaldo Neto</title>
    <link>${SITE}/</link>
    <description>Pesquisa, engenharia e ensino.</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>
`;

mkdirSync(path.join(process.cwd(), "public"), { recursive: true });
writeFileSync(path.join(process.cwd(), "public", "index.xml"), xml);
console.log(`RSS: ${posts.length} itens → public/index.xml`);
