import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FPS, theme } from "../theme";

export type CommandLineProps = {
  user: string;
  command: string;
};

export const commandLineDefaults: CommandLineProps = {
  user: "digenaldo@sec",
  command: "cd ~/artigos",
};

const START = 6;
const CHAR = 2;
const BLINK_TAIL = 8 * FPS;

export function commandLineFrames(props: CommandLineProps): number {
  return START + props.command.length * CHAR + BLINK_TAIL;
}

export const CommandLine: React.FC<CommandLineProps> = ({ user, command }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const typed = Math.max(0, Math.min(command.length, Math.floor((frame - START) / CHAR)));
  const done = typed === command.length;
  const visible = !done || Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill
      name="Command line"
      style={{
        fontFamily: theme.mono,
        fontSize: width < 420 ? 12 : 13,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        whiteSpace: "pre",
        letterSpacing: "0.02em",
      }}
    >
      <span style={{ color: theme.signal }}>{user}</span>
      <span style={{ color: theme.muted }}>:~$ </span>
      <span style={{ color: theme.ink }}>{command.slice(0, typed)}</span>
      <span
        style={{
          display: "inline-block",
          width: "0.6em",
          height: "1.15em",
          marginLeft: 1,
          background: visible ? theme.signal : "transparent",
        }}
      />
    </AbsoluteFill>
  );
};
