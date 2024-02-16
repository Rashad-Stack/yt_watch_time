import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSkeleton from "../components/LoadingSkeleton";
import VideoCard from "../components/VideoCard";
import VideoCardSkeleton from "../components/VideoCardSkeleton";
import { handleError } from "../lib/handleError";
import { GET_VIDEOS } from "../lib/query";
import { Video } from "../types";

export default function Home() {
  // const { videos, totalVideos, loading, error } = useVideos();
  const [searchParam, setSearchParam] = useSearchParams();
  const limit = Number(searchParam.get("limit")) || 12;

  const { data, loading, error } = useQuery(GET_VIDEOS);

  const { videos, totalVideos } = data?.allVideos || {};

  function handleFetchMore() {
    let newPage = limit + 3;
    if (newPage > totalVideos) {
      newPage = totalVideos;
    }

    searchParam.set("limit", newPage.toString());
    setSearchParam(searchParam);
  }

  return (
    <section>
      <InfiniteScroll
        dataLength={videos?.length || 3}
        next={handleFetchMore}
        hasMore={videos?.length < totalVideos}
        loader={
          loading && (
            <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <LoadingSkeleton count={8}>
                <VideoCardSkeleton />
              </LoadingSkeleton>
            </div>
          )
        }
        endMessage={error && <ErrorMessage message={handleError(error)} />}
      >
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!loading &&
            !error &&
            videos &&
            videos.length > 0 &&
            videos.map((video: Video) => (
              <VideoCard key={video._id} video={video} />
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
}
