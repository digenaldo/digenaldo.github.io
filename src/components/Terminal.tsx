import { Motion } from "@/components/motion/Motion";
import type { TerminalBlock } from "@/remotion/compositions/TerminalSession";
import { shellUser } from "@/lib/site";

type Props = {
  title: string;
  blocks: TerminalBlock[];
};

const size = "h-[430px] sm:h-[340px] lg:h-[310px]";

export function Terminal({ title, blocks }: Props) {
  return (
    <Motion
      id="terminal-session"
      inputProps={{ title, user: shellUser, blocks }}
      className={`relative w-full ${size}`}
      placeholder={<StaticTerminal title={title} blocks={[]} className={size} />}
      fallback={<StaticTerminal title={title} blocks={blocks} />}
      fallbackClassName="w-full"
    />
  );
}

function StaticTerminal({
  title,
  blocks,
  className = "",
}: Props & { className?: string }) {
  return (
    <div className={`border border-line bg-panel font-mono text-ink-2 ${className}`}>
      <div className="flex h-[34px] items-center gap-2 border-b border-line px-3.5 text-xs text-muted">
        <span className="size-2.5 rounded-full bg-alert" />
        <span className="size-2.5 rounded-full bg-warn" />
        <span className="size-2.5 rounded-full bg-signal" />
        <span className="ml-2">{title}</span>
      </div>
      <div className="whitespace-pre-wrap px-4 py-3.5 text-[12.5px] leading-[1.65] [overflow-wrap:anywhere] sm:text-[14.5px]">
        {blocks.map((block) => (
          <div key={block.cmd}>
            <div>
              <span className="text-signal">{shellUser}</span>
              <span className="text-muted">:~$ </span>
              <span className="text-ink">{block.cmd}</span>
            </div>
            {block.out.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        ))}
        <div>
          <span className="text-signal">{shellUser}</span>
          <span className="text-muted">:~$ </span>
          <span className="inline-block h-[1.1em] w-[0.6em] translate-y-[3px] bg-signal" />
        </div>
      </div>
    </div>
  );
}
