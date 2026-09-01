import type { ArticleTopic } from "@/lib/site";

export function formatDate(iso: string, locale: string = "pt-BR"): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

const MONTHS_PT = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export function formatFieldDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} ${MONTHS_PT[date.getMonth()]} ${date.getFullYear()}`;
}

export function getTopic(post: {
  tags: string[];
  categories: string[];
}): ArticleTopic {
  const tags = new Set(post.tags.map((tag) => tag.toLowerCase()));
  const categories = post.categories.map((item) => item.toLowerCase());
  const aiHint =
    tags.has("ai-security") ||
    tags.has("llm") ||
    tags.has("model-extraction") ||
    tags.has("distillation");
  const securityHint =
    tags.has("security") ||
    tags.has("cybersecurity") ||
    tags.has("pentest") ||
    tags.has("api-security") ||
    categories.includes("security");

  if (aiHint && securityHint) return "AI Security";
  if (tags.has("ai-security")) return "AI Security";
  if (securityHint) return "Security";
  return "Software";
}
