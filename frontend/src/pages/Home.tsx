import { useQuery } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSkeleton from "../components/LoadingSkeleton";
import VideoCard from "../components/VideoCard";
import VideoCardSkeleton from "../components/VideoCardSkeleton";
import { GET_VIDEOS } from "../lib/query";
import { Video } from "../types";

export default function Home() {
  const [limit, setLimit] = useState(12);

  const { data } = useQuery(GET_VIDEOS, {
    variables: {
      limit,
    },
  });

  const { videos, totalVideos } = data?.allVideos || {};

  return (
    <section>
      <InfiniteScroll
        dataLength={videos?.length || 12}
        next={() => setLimit(limit + 12)}
        hasMore={videos?.length < totalVideos}
        loader={
          <div className="container mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <LoadingSkeleton count={4}>
              <VideoCardSkeleton />
            </LoadingSkeleton>
          </div>
        }
      >
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos &&
            videos.length > 0 &&
            videos.map((video: Video) => (
              <VideoCard key={video._id} video={video} />
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
}
