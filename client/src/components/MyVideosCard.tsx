import { Card } from "flowbite-react";
import ReactPlayer from "react-player";
import { Video } from "../types";
import DeleteVideo from "./DeleteVideo";

type Props = {
  video: Video;
};

export default function MyVideosCard({ video }: Props) {
  return (
    <Card
      className="relative overflow-hidden rounded-lg bg-white text-neutral-900 shadow-lg transition-all hover:shadow-xl dark:bg-neutral-800 dark:text-neutral-200"
      renderImage={() => (
        <div className="flex flex-col items-center">
          <ReactPlayer
            url={video.url}
            volume={0}
            muted={true}
            light={true}
            style={{
              maxWidth: "370px",
              maxHeight: "200px",
              width: "100%",
            }}
          />
        </div>
      )}
    >
      <h5 className="text-wrap text-left text-sm font-bold tracking-tight text-gray-900 dark:text-white">
        {video.title}
      </h5>
      <DeleteVideo videoId={video._id} />
    </Card>
  );
}
