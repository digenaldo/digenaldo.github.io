"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useMemo, useRef } from "react";
import { registry, type CompositionId } from "@/remotion/registry";
import { FPS } from "@/remotion/theme";

export type PlayerCoreProps = {
  id: CompositionId;
  inputProps?: Record<string, unknown>;
  width: number;
  height: number;
  loop?: boolean;
  progress?: number;
  onReady: () => void;
};

export default function PlayerCore({
  id,
  inputProps,
  width,
  height,
  loop = false,
  progress,
  onReady,
}: PlayerCoreProps) {
  const ref = useRef<PlayerRef>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const entry = registry[id];
  const props = useMemo(
    () => ({ ...entry.defaults, ...inputProps }),
    [entry, inputProps],
  );
  const frames = entry.frames(props);
  const controlled = progress !== undefined;

  useEffect(() => {
    onReady();
  }, [onReady]);

  useEffect(() => {
    if (controlled) return;
    const node = wrap.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = ref.current;
        if (!player) return;
        if (!entry.isIntersecting) {
          player.pause();
        } else if (loop || player.getCurrentFrame() < frames - 1) {
          player.play();
        }
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [controlled, loop, frames]);

  useEffect(() => {
    if (!controlled) return;
    ref.current?.seekTo(Math.round(progress * (frames - 1)));
  }, [controlled, progress, frames]);

  return (
    <div ref={wrap} style={{ width: "100%", height: "100%" }}>
      <Player
        ref={ref}
        component={entry.component}
        inputProps={props}
        durationInFrames={frames}
        fps={FPS}
        compositionWidth={width}
        compositionHeight={height}
        loop={loop}
        autoPlay={!controlled}
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        moveToBeginningWhenEnded={false}
        numberOfSharedAudioTags={0}
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%", background: "transparent" }}
      />
    </div>
  );
}
