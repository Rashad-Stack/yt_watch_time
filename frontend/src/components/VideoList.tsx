import { Video } from "../types";
import VideoCard from "./VideoCard";

type Props = {
  videos: Video[];
};

export default function VideoList({ videos }: Props) {
  return (
    <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video: Video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}
