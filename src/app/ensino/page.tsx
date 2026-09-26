import type { Metadata } from "next";
import { PageMast } from "@/components/PageMast";
import { courses } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ensino",
  description:
    "Aulas e materiais de Digenaldo Neto sobre inteligência artificial, segurança e engenharia.",
  alternates: { canonical: "/ensino/" },
};

export default function EnsinoPage() {
  return (
    <div className="shell">
      <PageMast
        command="cd ~/ensino"
        title="Ensino"
        lede="Parte do que estudo vira aula ou material, hoje com foco em IA. Tudo aqui é público e não pede cadastro."
      />

      <ul className="mt-10 divide-y divide-line border-y border-line">
        {courses.map((course, i) => (
          <li key={course.href}>
            <a
              href={course.href}
              className="group grid gap-2 border-l-2 border-transparent py-6 pl-4 transition-colors hover:border-signal hover:bg-panel sm:grid-cols-[4rem_1fr]"
            >
              <span className="font-mono text-sm text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <strong className="block text-xl font-semibold text-ink transition-colors group-hover:text-signal">
                  {course.title}
                </strong>
                <span className="mt-2 block text-ink-2">{course.description}</span>
                <span className="mt-3 block font-mono text-xs text-muted">
                  ./abrir-slides →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
