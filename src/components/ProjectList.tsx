import { projects } from "@/lib/site";

type Props = {
  limit?: number;
};

export function ProjectList({ limit }: Props) {
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
      {items.map((project) => (
        <li key={project.name} className="flex flex-col bg-bg p-6 transition-colors hover:bg-panel">
          <h3 className="font-mono text-lg font-bold">
            <a
              href={project.href}
              rel="noopener noreferrer"
              className="text-ink transition-colors hover:text-signal"
            >
              <span className="text-signal">$ </span>
              {project.name}
            </a>
          </h3>
          <p className="mt-3 flex-1 leading-relaxed text-ink-2">{project.description}</p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted">
              {project.stack.map((tech) => (
                <li key={tech} className="border border-line px-2 py-0.5">
                  #{tech.toLowerCase().replace(/\s+/g, "-")}
                </li>
              ))}
            </ul>
            <a
              href={project.href}
              rel="noopener noreferrer"
              aria-label={`${project.name} no GitHub`}
              className="font-mono text-xs text-ink-2 transition-colors hover:text-signal"
            >
              ↗ github
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
