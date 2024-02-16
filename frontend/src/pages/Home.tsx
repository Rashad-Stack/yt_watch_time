import { useQuery } from "@apollo/client";
import VideoCard from "../components/VideoCard";
import { GET_VIDEOS } from "../lib/query";
import { Video } from "../types";

export default function Home() {
  const { data, loading, error } = useQuery(GET_VIDEOS);
  const videos = data?.videos;

  console.log(videos);
  return (
    <section>
      <div>
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
