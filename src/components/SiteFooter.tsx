import { site } from "@/lib/site";

const links = [
  { label: "E-mail", href: `mailto:${site.email}` },
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Instagram", href: site.social.instagram },
  { label: "YouTube", href: site.social.youtube },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="shell grid gap-6 py-10 font-mono text-sm sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-muted">{"// EOF"}</p>
          <p className="mt-2 text-ink">{site.name}</p>
          <p className="kicker mt-1">Cybersecurity Engineer</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                rel="noopener noreferrer"
                className="text-ink-2 transition-colors hover:text-signal"
              >
                <span className="text-muted">↗ </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted sm:col-span-2">
          {site.location} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
