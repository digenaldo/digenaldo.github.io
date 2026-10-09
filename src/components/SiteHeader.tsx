import Link from "next/link";
import { LangToggle } from "@/components/LangToggle";
import { pick } from "@/lib/i18n";
import { nav, shellUser } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="shell flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
        <Link
          href="/"
          aria-label={pick("Início", "Home")}
          className="order-1 font-mono text-sm text-ink transition-colors hover:text-signal"
        >
          <span className="text-signal">{shellUser}</span>
          <span className="text-muted">:~$</span>
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[2px] bg-signal"
          />
        </Link>
        <LangToggle className="order-2 ml-auto sm:order-3" />
        <nav
          aria-label={pick("Principal", "Main")}
          className="order-3 -mx-1 w-full overflow-x-auto [scrollbar-width:none] sm:order-2 sm:mx-0 sm:w-auto"
        >
          <ul className="flex gap-1 font-mono text-[13px]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block whitespace-nowrap px-2 py-1 text-ink-2 transition-colors hover:bg-panel-2 hover:text-signal"
                >
                  <span className="text-muted">./</span>
                  {item.label.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
