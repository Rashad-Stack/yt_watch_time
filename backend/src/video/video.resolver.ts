import { BadRequestException } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request } from "express";
import { ObjectId } from "mongoose";
import { AuthResolver } from "src/auth/auth.resolver";
import { CreateVideoInput } from "./dto/create-video.input";
import { UpdateVideoInput } from "./dto/update-video.input";
import { PaginateVideo } from "./dto/videos.dto";
import { Video } from "./schema/video.schema";
import { VideoService } from "./video.service";

@Resolver(() => Video)
export class VideoResolver {
  constructor(
    private readonly videoService: VideoService,
    private readonly authResolver: AuthResolver,
  ) {}

  @Mutation(() => Video)
  async createVideo(
    @Args("createVideoInput") createVideoInput: CreateVideoInput,
    @Context() { req }: { req: Request },
  ): Promise<Video> {
    const urls = ["youtu.be", "youtube"];
    const isYoutubeUrl = urls.some((url) => createVideoInput.url.includes(url));

    if (!isYoutubeUrl) {
      throw new BadRequestException("Invalid Youtube video URL");
    }
    const user = await this.authResolver.session({ req });
    return this.videoService.create(user, createVideoInput);
  }

  @Query(() => PaginateVideo, { name: "allVideos" })
  async findAll(
    @Args("limit", { defaultValue: 12 }) limit: number,
    @Args("page", { defaultValue: 1 }) page: number,
  ): Promise<PaginateVideo> {
    return this.videoService.findAll(limit, page);
  }

  @Query(() => Video, { name: "video" })
  async findOne(
    @Args("id", { type: () => String }) id: ObjectId,
  ): Promise<Video> {
    return await this.videoService.findOne(id);
  }

  @Mutation(() => Video)
  updateVideo(@Args("updateVideoInput") updateVideoInput: UpdateVideoInput) {
    return this.videoService.update(updateVideoInput.id, updateVideoInput);
  }

  @Mutation(() => Video)
  removeVideo(@Args("id", { type: () => String }) id: ObjectId) {
    return this.videoService.remove(id);
  }
}
