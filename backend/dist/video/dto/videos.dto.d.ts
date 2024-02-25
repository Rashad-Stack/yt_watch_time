import { Video } from "../schema/video.schema";
export declare class PaginateVideo {
    videos: Video[];
    totalVideos: number;
    pages?: number;
}
export declare class NewVideo {
    video: Video;
    message: string;
}
