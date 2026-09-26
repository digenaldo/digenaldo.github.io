import type { ReactNode } from "react";
import { Motion } from "@/components/motion/Motion";
import { shellUser } from "@/lib/site";

type Props = {
  command: string;
  title: string;
  lede?: ReactNode;
};

function Prompt({ command }: { command: string }) {
  return (
    <p className="flex h-7 items-center whitespace-pre font-mono text-xs sm:text-[13px]">
      <span className="text-signal">{shellUser}</span>
      <span className="text-muted">:~$ </span>
      <span className="text-ink">{command}</span>
    </p>
  );
}

export function PageMast({ command, title, lede }: Props) {
  return (
    <header className="border-b border-line pb-10 pt-12 md:pb-14 md:pt-16">
      <Motion
        id="command-line"
        inputProps={{ user: shellUser, command }}
        className="h-7 w-full"
        placeholder={<Prompt command="" />}
        fallback={<Prompt command={command} />}
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h1 className="font-mono text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {lede ? (
          <p className="max-w-2xl text-lg leading-relaxed text-ink-2">{lede}</p>
        ) : null}
      </div>
    </header>
  );
}
