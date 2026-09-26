import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export type PortraitScanProps = {
  fields: { key: string; value: string }[];
};

export const portraitScanDefaults: PortraitScanProps = {
  fields: [
    { key: "ID", value: "digenaldo.neto" },
    { key: "ROLE", value: "security engineer" },
    { key: "LOC", value: "João Pessoa, BR" },
  ],
};

export const PORTRAIT_SCAN_FRAMES = 110;

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const PortraitScan: React.FC<PortraitScanProps> = ({ fields }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const arm = Math.round(Math.min(width, height) * 0.12);
  const inset = Math.max(10, Math.round(width * 0.035));
  const fontSize = width < 320 ? 10 : 12;
  const glitchOn = frame >= 58 && frame < 70 && frame % 3 !== 0;
  const typeStart = 44;

  const corners = [
    { top: inset, left: inset, bt: true, bl: true },
    { top: inset, right: inset, bt: true, br: true },
    { bottom: inset, left: inset, bb: true, bl: true },
    { bottom: inset, right: inset, bb: true, br: true },
  ];

  let cursor = typeStart;

  return (
    <AbsoluteFill name="Portrait scan" style={{ fontFamily: theme.mono }}>
      {corners.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            width: interpolate(frame, [4, 22], [0, arm], { ...clamp, easing: ease }),
            height: interpolate(frame, [4, 22], [0, arm], { ...clamp, easing: ease }),
            borderTop: c.bt ? `2px solid ${theme.signal}` : undefined,
            borderBottom: c.bb ? `2px solid ${theme.signal}` : undefined,
            borderLeft: c.bl ? `2px solid ${theme.signal}` : undefined,
            borderRight: c.br ? `2px solid ${theme.signal}` : undefined,
          }}
        />
      ))}

      <Interactive.Div
        name="Scan band"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 90,
          top: interpolate(frame, [10, 58], [-90, height], { ...clamp, easing: Easing.inOut(Easing.quad) }),
          opacity: interpolate(frame, [10, 16, 52, 62], [0, 1, 1, 0], clamp),
          background: `linear-gradient(to bottom, transparent, ${theme.signal}22 70%, ${theme.signal}aa 98%, ${theme.ink})`,
          mixBlendMode: "screen",
        }}
      />

      {glitchOn
        ? [0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${Math.round(random(`gx-${i}-${frame}`) * 30)}%`,
                top: `${Math.round(random(`gy-${i}-${frame}`) * 90)}%`,
                width: `${30 + Math.round(random(`gw-${i}-${frame}`) * 50)}%`,
                height: 3 + Math.round(random(`gh-${i}-${frame}`) * 8),
                background: i === 1 ? theme.cyan : theme.signal,
                opacity: 0.45,
                mixBlendMode: "screen",
              }}
            />
          ))
        : null}

      <Interactive.Div
        name="Readout"
        style={{
          position: "absolute",
          left: inset,
          bottom: inset,
          padding: "8px 10px",
          background: "rgba(10, 11, 10, 0.82)",
          border: `1px solid ${theme.line}`,
          fontSize,
          lineHeight: 1.6,
          opacity: interpolate(frame, [36, 44], [0, 1], clamp),
          translate: interpolate(frame, [36, 48], ["0px 8px", "0px 0px"], { ...clamp, easing: ease }),
        }}
      >
        {fields.map((field) => {
          const start = cursor;
          cursor += field.value.length + 4;
          const shown = Math.max(0, Math.min(field.value.length, frame - start));
          return (
            <div key={field.key} style={{ whiteSpace: "nowrap" }}>
              <span style={{ color: theme.muted, display: "inline-block", width: "5ch" }}>
                {field.key}
              </span>
              <span style={{ color: theme.ink }}>{field.value.slice(0, shown)}</span>
            </div>
          );
        })}
        <div style={{ color: theme.signal, whiteSpace: "nowrap" }}>
          {frame > cursor ? "● verified" : " "}
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
