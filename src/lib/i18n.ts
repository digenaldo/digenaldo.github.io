export type Locale = "pt" | "en";

// Baked per build by scripts/build-i18n.mjs (NEXT_PUBLIC_LOCALE).
// Default is pt so a plain `next dev` / `next build` keeps the Portuguese site.
export const LOCALE: Locale =
  process.env.NEXT_PUBLIC_LOCALE === "en" ? "en" : "pt";

export function pick<T>(pt: T, en: T): T {
  return LOCALE === "en" ? en : pt;
}

export const htmlLang = pick("pt-BR", "en");
export const ogLocale = pick("pt_BR", "en_US");
