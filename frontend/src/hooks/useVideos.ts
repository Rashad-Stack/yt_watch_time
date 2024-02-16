import React from "react";
import { VideoContext } from "../context/VideosContext";
export function useVideos() {
  const context = React.useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within AuthProvider");
  }
  return context;
}
