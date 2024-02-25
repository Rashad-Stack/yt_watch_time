import { Card } from "flowbite-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import AddVideoForm from "./AddVideoForm";
// www.youtube.com/watch?v=y8bRLf3SFBI
export default function AddVideo() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoLength, setVideoLength] = useState<boolean>(false);

  return (
    <div className="pt-6">
      <Card
        className="max-w-md items-center overflow-hidden rounded-lg bg-white pb-0 text-neutral-900 shadow-lg transition-all dark:bg-neutral-800 dark:text-neutral-200"
        renderImage={() => (
          <ReactPlayer
            url={videoUrl}
            onDuration={(state) => setVideoLength(state > 40)}
            style={{
              maxWidth: "448px",
              maxHeight: "200px",
              width: "100%",
            }}
          />
        )}
      >
        <p
          className={`font-normal ${videoLength ? "text-green-700" : "text-gray-700"}`}
        >
          Video length should be at least 40 seconds
        </p>
      </Card>
      <AddVideoForm setVideoUrl={setVideoUrl} videoLength={videoLength} />
    </div>
  );
}
