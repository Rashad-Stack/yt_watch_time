import { useQuery } from "@apollo/client";
import Empty from "../components/Empty";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MyVideosCard from "../components/MyVideosCard";
import VideoCardSkeleton from "../components/VideoCardSkeleton";
import { handleError } from "../lib/handleError";
import { MY_VIDEOS } from "../lib/query";
import { Video } from "../types";

export default function MyVideos() {
  const { data, loading, error } = useQuery(MY_VIDEOS);

  const { videos, totalVideos } = data?.myVideos || {};

  return (
    <div className="container mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <LoadingSkeleton count={8}>
          <VideoCardSkeleton />
        </LoadingSkeleton>
      ) : error ? (
        <ErrorMessage message={handleError(error)} />
      ) : totalVideos === 0 ? (
        <Empty />
      ) : (
        videos &&
        videos.length > 0 &&
        videos.map((video: Video) => (
          <MyVideosCard key={video._id} video={video} />
        ))
      )}
    </div>
  );
}
