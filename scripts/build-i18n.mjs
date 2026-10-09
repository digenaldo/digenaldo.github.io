// Builds the site twice and lays it out for Firebase Hosting i18n:
//   out/                -> English (default, served outside Brazil)
//   out/i18n/ALL_br/    -> Portuguese (served when the visitor's IP is in Brazil)
// firebase.json points i18n.root at "/i18n". The flag toggle flips the
// firebase-country-override cookie to switch languages on demand.
import { execSync } from "node:child_process";
import { cpSync, mkdirSync, renameSync, rmSync } from "node:fs";

function build(locale) {
  console.log(`\n▶ next build (${locale})`);
  execSync("next build", {
    stdio: "inherit",
    env: { ...process.env, NEXT_PUBLIC_LOCALE: locale },
  });
}

rmSync("out", { recursive: true, force: true });
rmSync("out_pt", { recursive: true, force: true });

// Portuguese first, then move it aside so the English build can own `out/`.
build("pt");
renameSync("out", "out_pt");

build("en");

mkdirSync("out/i18n", { recursive: true });
cpSync("out_pt", "out/i18n/ALL_br", { recursive: true });
rmSync("out_pt", { recursive: true, force: true });

console.log("\n✓ i18n output ready: out/ (en) + out/i18n/ALL_br/ (pt)");
