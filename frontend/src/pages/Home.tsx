import VideoCard from "../components/VideoCard";
import { useVideos } from "../hooks/useVideos";
import { Video } from "../types";

export default function Home() {
  const { videos, loading, error } = useVideos();

  return (
    <section>
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>error</div>
        ) : videos && videos.length > 0 ? (
          videos.map((video: Video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <div>No videos</div>
        )}
      </div>
    </section>
  );
}
