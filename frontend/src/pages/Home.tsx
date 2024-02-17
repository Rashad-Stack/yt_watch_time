import { useQuery } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSkeleton from "../components/LoadingSkeleton";
import VideoCard from "../components/VideoCard";
import VideoCardSkeleton from "../components/VideoCardSkeleton";
import { GET_VIDEOS } from "../lib/query";
import { Video } from "../types";

export default function Home() {
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState<Video[]>([]);

  const { data, fetchMore } = useQuery(GET_VIDEOS, {
    onCompleted: (data) => {
      setVideos(data?.allVideos?.videos || []);
    },
  });

  const { totalVideos } = data?.allVideos || {};

  return (
    <section>
      <InfiniteScroll
        dataLength={totalVideos || 0}
        next={() => {
          setPage(page + 1);
          fetchMore({ variables: { page: page + 1 } }).then((res) => {
            setVideos([...videos, ...res.data.allVideos.videos]);
          });
        }}
        hasMore={totalVideos === videos.length ? false : true}
        loader={
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <LoadingSkeleton count={8}>
              <VideoCardSkeleton />
            </LoadingSkeleton>
          </div>
        }
      >
        {
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos &&
              videos.length > 0 &&
              videos.map((video: Video) => (
                <VideoCard key={video._id} video={video} />
              ))}
          </div>
        }
      </InfiniteScroll>
    </section>
  );
}
