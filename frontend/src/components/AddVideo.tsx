import { Card } from "flowbite-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import AddVideoForm from "./AddVideoForm";
// www.youtube.com/watch?v=y8bRLf3SFBI
export default function AddVideo() {
  const [videoUrl, setVideoUrl] = useState<string>("");

  return (
    <div className="pt-6">
      <Card className="max-w-md items-center">
        <ReactPlayer url={videoUrl} width={400} height={200} />
      </Card>
      <AddVideoForm setVideoUrl={setVideoUrl} />
    </div>
  );
}
