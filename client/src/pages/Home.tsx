import { useQuery } from "@apollo/client";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import Empty from "../components/Empty";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSkeleton from "../components/LoadingSkeleton";
import VideoCardSkeleton from "../components/VideoCardSkeleton";
import VideoList from "../components/VideoList";
import { handleError } from "../lib/handleError";
import { GET_VIDEOS } from "../lib/query";
import { Video } from "../types";

export default function Home() {
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const { data, fetchMore, loading, error } = useQuery(GET_VIDEOS);

  const { totalVideos } = data?.allVideos || {};

  const LoadMore = async () => {
    setLoadMoreLoading(true);
    const res = await fetchMore({
      variables: {
        page: page + 1,
      },
    });

    setVideos([...videos, ...res.data.allVideos.videos]);

    setPage(page + 1);
    setLoadMoreLoading(false);
  };

  useEffect(() => {
    if (data) {
      setVideos(data.allVideos.videos);
    }
  }, [data]);

  return (
    <section>
      {videos && videos.length > 0 && <VideoList videos={videos} />}

      {totalVideos === 0 && <Empty />}

      {error && <ErrorMessage message={handleError(error)} />}

      {loading ||
        (loadMoreLoading && (
          <div className="container mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <LoadingSkeleton count={8}>
              <VideoCardSkeleton />
            </LoadingSkeleton>
          </div>
        ))}

      {totalVideos !== videos.length && (
        <Button onClick={LoadMore} className="mx-auto mt-4">
          Load more
        </Button>
      )}
    </section>
  );
}
