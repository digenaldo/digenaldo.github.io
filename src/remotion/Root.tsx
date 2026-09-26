import { Composition } from "remotion";
import { registry } from "./registry";
import { FPS } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {Object.entries(registry).map(([id, entry]) => (
        <Composition
          key={id}
          id={id}
          component={entry.component}
          defaultProps={entry.defaults}
          durationInFrames={entry.frames(entry.defaults)}
          fps={FPS}
          width={entry.studioSize.width}
          height={entry.studioSize.height}
        />
      ))}
    </>
  );
};
