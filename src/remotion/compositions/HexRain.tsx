import { useEffect, useRef } from "react";
import {
  AbsoluteFill,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export type HexRainProps = {
  glyphs: string;
  cell: number;
  trail: number;
};

export const hexRainDefaults: HexRainProps = {
  glyphs: "0123456789abcdef<>/{}$#",
  cell: 18,
  trail: 14,
};

export const HexRain: React.FC<HexRainProps> = ({ glyphs, cell, trail }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.width = width * dpr;
    el.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${cell * 0.72}px ${theme.mono}`;
    ctx.textBaseline = "top";

    const columns = Math.ceil(width / cell);
    const cycle = height + trail * cell;

    for (let col = 0; col < columns; col++) {
      if (random(`skip-${col}`) < 0.35) continue;
      // Integer laps per composition keep the loop seamless.
      const laps = 1 + Math.floor(random(`laps-${col}`) * 3);
      const offset = random(`offset-${col}`) * cycle;
      const head =
        ((offset + (frame / durationInFrames) * laps * cycle) % cycle) -
        trail * cell;

      for (let i = 0; i < trail; i++) {
        const y = head - i * cell;
        if (y < -cell || y > height) continue;
        const tick = Math.floor(frame / 5);
        const glyph =
          glyphs[
            Math.floor(random(`g-${col}-${i}-${tick % 7}`) * glyphs.length)
          ];
        const fade = 1 - i / trail;
        ctx.fillStyle = i === 0 ? theme.ink : theme.signal;
        ctx.globalAlpha = i === 0 ? 0.9 : fade * 0.55;
        ctx.fillText(glyph, col * cell, y);
      }
    }
    ctx.globalAlpha = 1;
  }, [frame, width, height, durationInFrames, glyphs, cell, trail]);

  return (
    <AbsoluteFill name="Hex rain">
      <canvas ref={canvas} style={{ width, height }} />
    </AbsoluteFill>
  );
};
