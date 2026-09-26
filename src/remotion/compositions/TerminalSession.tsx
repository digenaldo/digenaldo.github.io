import {
  AbsoluteFill,
  Interactive,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FPS, theme } from "../theme";

export type TerminalBlock = { cmd: string; out: string[] };

export type TerminalSessionProps = {
  title: string;
  user: string;
  blocks: TerminalBlock[];
};

export const terminalSessionDefaults: TerminalSessionProps = {
  title: "digenaldo@sec: ~",
  user: "digenaldo@sec",
  blocks: [
    { cmd: "whoami", out: ["digenaldo — cybersecurity & software engineer"] },
    { cmd: "echo $FOCUS", out: ["ai-security"] },
  ],
};

const CHAR = 2;
const PAUSE_AFTER_CMD = 8;
const LINE_GAP = 3;
const PAUSE_AFTER_BLOCK = 14;
const BLINK_TAIL = 30 * FPS;

type Step = { cmdStart: number; outStart: number; end: number };

function timeline(blocks: TerminalBlock[]): { steps: Step[]; end: number } {
  let t = 0;
  const steps = blocks.map((block) => {
    const cmdStart = t;
    const outStart = cmdStart + block.cmd.length * CHAR + PAUSE_AFTER_CMD;
    const end = outStart + block.out.length * LINE_GAP + PAUSE_AFTER_BLOCK;
    t = end;
    return { cmdStart, outStart, end };
  });
  return { steps, end: t };
}

export function terminalSessionFrames(props: TerminalSessionProps): number {
  return timeline(props.blocks).end + BLINK_TAIL;
}

export const TerminalSession: React.FC<TerminalSessionProps> = ({
  title,
  user,
  blocks,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const { steps, end } = timeline(blocks);
  const fontSize = width < 480 ? 12.5 : 14.5;
  const blink = Math.floor(frame / 15) % 2 === 0;

  const prompt = (
    <>
      <span style={{ color: theme.signal }}>{user}</span>
      <span style={{ color: theme.muted }}>:~$ </span>
    </>
  );

  const cursor = (visible: boolean) => (
    <span
      style={{
        display: "inline-block",
        width: "0.6em",
        height: "1.1em",
        verticalAlign: "text-bottom",
        background: visible ? theme.signal : "transparent",
      }}
    />
  );

  return (
    <AbsoluteFill
      name="Terminal"
      style={{
        background: theme.panel,
        border: `1px solid ${theme.line}`,
        fontFamily: theme.mono,
        color: theme.ink2,
      }}
    >
      <Interactive.Div
        name="Title bar"
        style={{
          height: 34,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
          borderBottom: `1px solid ${theme.line}`,
          fontSize: 12,
          color: theme.muted,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 5, background: theme.alert }} />
        <span style={{ width: 10, height: 10, borderRadius: 5, background: theme.warn }} />
        <span style={{ width: 10, height: 10, borderRadius: 5, background: theme.signal }} />
        <span style={{ marginLeft: 8 }}>{title}</span>
      </Interactive.Div>

      <Interactive.Div
        name="Output"
        style={{
          padding: "14px 16px",
          fontSize,
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
        }}
      >
        {blocks.map((block, i) => {
          const step = steps[i];
          if (frame < step.cmdStart) return null;
          const typed = Math.min(
            block.cmd.length,
            Math.floor((frame - step.cmdStart) / CHAR),
          );
          const typing = frame < step.outStart;
          const shownOut = Math.max(
            0,
            Math.min(block.out.length, Math.floor((frame - step.outStart) / LINE_GAP) + 1),
          );
          return (
            <div key={i}>
              <div>
                {prompt}
                <span style={{ color: theme.ink }}>{block.cmd.slice(0, typed)}</span>
                {typing ? cursor(true) : null}
              </div>
              {typing
                ? null
                : block.out.slice(0, shownOut).map((line, j) => <div key={j}>{line}</div>)}
            </div>
          );
        })}
        {frame >= end ? (
          <div>
            {prompt}
            {cursor(blink)}
          </div>
        ) : null}
      </Interactive.Div>
    </AbsoluteFill>
  );
};
