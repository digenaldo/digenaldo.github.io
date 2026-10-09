"use client";

import { LOCALE } from "@/lib/i18n";

// Firebase Hosting serves Portuguese from the ALL_br i18n folder and English
// as the default. Forcing the country override cookie makes it serve the other
// one on reload, regardless of the visitor's real location.
function choose(country: "br" | "us") {
  document.cookie = `firebase-country-override=${country};path=/;max-age=31536000;samesite=lax`;
  window.location.reload();
}

function BrazilFlag() {
  return (
    <svg viewBox="0 0 28 20" width="24" height="17" aria-hidden="true">
      <rect width="28" height="20" fill="#009b3a" />
      <path d="M14 2 26 10 14 18 2 10Z" fill="#fedf00" />
      <circle cx="14" cy="10" r="4.2" fill="#002776" />
    </svg>
  );
}

function UsaFlag() {
  return (
    <svg viewBox="0 0 28 20" width="24" height="17" aria-hidden="true">
      <rect width="28" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="28" height={20 / 13} fill="#b22234" />
      ))}
      <rect width="12" height={(20 / 13) * 7} fill="#3c3b6e" />
    </svg>
  );
}

export function LangToggle({ className = "" }: { className?: string }) {
  const base =
    "flex items-center rounded-[2px] border px-1.5 py-1 transition-opacity";
  const active = "border-signal opacity-100";
  const idle = "border-line opacity-45 hover:opacity-90";

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={() => choose("br")}
        aria-label="Mudar para português"
        aria-pressed={LOCALE === "pt"}
        className={`${base} ${LOCALE === "pt" ? active : idle}`}
      >
        <BrazilFlag />
      </button>
      <button
        type="button"
        onClick={() => choose("us")}
        aria-label="Switch to English"
        aria-pressed={LOCALE === "en"}
        className={`${base} ${LOCALE === "en" ? active : idle}`}
      >
        <UsaFlag />
      </button>
    </div>
  );
}
