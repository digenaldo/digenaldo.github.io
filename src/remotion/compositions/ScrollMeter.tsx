import { AbsoluteFill, Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const SCROLL_METER_FRAMES = 101;

export const ScrollMeter: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const pct = Math.min(100, Math.max(0, frame));
  const cells = width < 480 ? 10 : 20;
  const filled = Math.round((pct / 100) * cells);

  return (
    <AbsoluteFill name="Scroll meter" style={{ fontFamily: theme.mono }}>
      <Interactive.Div
        name="Track"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: "100%",
          background: theme.signal,
          transformOrigin: "left center",
          scale: `${pct / 100} 1`,
        }}
      />
      <Interactive.Div
        name="Readout"
        style={{
          position: "absolute",
          bottom: 8,
          right: 12,
          padding: "2px 8px",
          fontSize: 11,
          background: "rgba(10, 11, 10, 0.88)",
          border: `1px solid ${theme.line}`,
          color: theme.muted,
          whiteSpace: "pre",
        }}
      >
        <span style={{ color: theme.signal }}>{"█".repeat(filled)}</span>
        <span>{"░".repeat(cells - filled)}</span>
        <span style={{ color: theme.ink }}>{` ${String(pct).padStart(3, "0")}%`}</span>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
