import Empty from "../components/Empty";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSkeleton from "../components/LoadingSkeleton";
import VideoCard from "../components/VideoCard";
import VideoCardSkeleton from "../components/VideoCardSkeleton";
import { useVideos } from "../hooks/useVideos";
import { handleError } from "../lib/handleError";
import { Video } from "../types";

export default function Home() {
  const { videos, loading, error } = useVideos();

  return (
    <section>
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <LoadingSkeleton count={8}>
            <VideoCardSkeleton />
          </LoadingSkeleton>
        ) : error ? (
          <ErrorMessage message={handleError(error)} />
        ) : videos && videos.length > 0 ? (
          videos.map((video: Video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </section>
  );
}
