import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Video } from "../entities/video.entity";

@ObjectType("Videos")
export class PaginateVideo {
  @Field(() => [Video])
  videos: Video[];

  @Field(() => Int)
  totalVideos: number;
}
