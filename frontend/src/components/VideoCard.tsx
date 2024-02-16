import { Card, Progress, ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Video } from "../types";
import CountStatus from "./CountStatus";

type Props = {
  video: Video;
};

export default function VideoCard({ video }: Props) {
  const [played, setPlayed] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(true);

  return (
    <Card
      className="flex max-w-sm flex-col items-center"
      renderImage={() => (
        <ReactPlayer
          url={video.url}
          width={384}
          height={200}
          volume={1}
          muted={muted}
          onProgress={(state) => setPlayed((state.playedSeconds * 100) / 40)}
        />
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <CountStatus played={played} />
          <ToggleSwitch checked={muted} label="Mute" onChange={setMuted} />
        </div>
        <Progress progress={played} className="transition-all" />
      </div>
      <h5 className="text-wrap text-sm font-bold tracking-tight text-gray-900 dark:text-white">
        {video.title}
      </h5>
    </Card>
  );
}
