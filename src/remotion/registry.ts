import type { ComponentType } from "react";
import { CommandLine, commandLineDefaults, commandLineFrames } from "./compositions/CommandLine";
import { HexRain, hexRainDefaults } from "./compositions/HexRain";
import {
  PORTRAIT_SCAN_FRAMES,
  PortraitScan,
  portraitScanDefaults,
} from "./compositions/PortraitScan";
import { SCROLL_METER_FRAMES, ScrollMeter } from "./compositions/ScrollMeter";
import {
  TerminalSession,
  terminalSessionDefaults,
  terminalSessionFrames,
} from "./compositions/TerminalSession";
import { FPS } from "./theme";

type Entry = {
  component: ComponentType<any>;
  defaults: Record<string, unknown>;
  frames: (props: any) => number;
  studioSize: { width: number; height: number };
};

const entries = {
  "hex-rain": {
    component: HexRain,
    defaults: hexRainDefaults,
    frames: () => 12 * FPS,
    studioSize: { width: 1280, height: 720 },
  },
  "portrait-scan": {
    component: PortraitScan,
    defaults: portraitScanDefaults,
    frames: () => PORTRAIT_SCAN_FRAMES,
    studioSize: { width: 540, height: 720 },
  },
  "terminal-session": {
    component: TerminalSession,
    defaults: terminalSessionDefaults,
    frames: terminalSessionFrames,
    studioSize: { width: 720, height: 360 },
  },
  "command-line": {
    component: CommandLine,
    defaults: commandLineDefaults,
    frames: commandLineFrames,
    studioSize: { width: 720, height: 28 },
  },
  "scroll-meter": {
    component: ScrollMeter,
    defaults: {},
    frames: () => SCROLL_METER_FRAMES,
    studioSize: { width: 1280, height: 40 },
  },
} satisfies Record<string, Entry>;

export type CompositionId = keyof typeof entries;

export const registry: Record<CompositionId, Entry> = entries;
