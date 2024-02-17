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

  // console.log(video?.user?._id);

  return (
    <Card
      className="overflow-hidden rounded-lg bg-white text-neutral-900 shadow-lg transition-all hover:shadow-xl dark:bg-neutral-800 dark:text-neutral-200"
      renderImage={() => (
        <div className="flex flex-col items-center">
          <ReactPlayer
            url={video.url}
            volume={1}
            muted={muted}
            onProgress={(state) => setPlayed((state.playedSeconds * 100) / 40)}
            style={{
              maxWidth: "370px",
              maxHeight: "200px",
              width: "100%",
            }}
          />
        </div>
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <CountStatus played={played} />
          <ToggleSwitch checked={muted} label="Mute" onChange={setMuted} />
        </div>
        <Progress progress={played} className="z-50 w-full" />
      </div>
      <h5 className="text-wrap text-left text-sm font-bold tracking-tight text-gray-900 dark:text-white">
        {video.title}
      </h5>
    </Card>
  );
}
