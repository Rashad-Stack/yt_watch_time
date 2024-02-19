import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Video } from "../schema/video.schema";

@ObjectType("videos")
export class PaginateVideo {
  @Field(() => [Video])
  videos: Video[];

  @Field(() => Int)
  totalVideos: number;
}

@ObjectType("newVideo")
export class NewVideo {
  @Field(() => Video)
  video: Video;

  @Field(() => String)
  message: string;
}
