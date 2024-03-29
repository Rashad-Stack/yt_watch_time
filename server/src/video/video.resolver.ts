import { BadRequestException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Types } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/current.user.decorator";
import { User } from "src/user/schema/user.schema";
import { CreateVideoInput } from "./dto/create-video.input";
import { NewVideo, PaginateVideo } from "./dto/videos.dto";
import { Video } from "./schema/video.schema";
import { VideoService } from "./video.service";

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Mutation(() => NewVideo)
  @UseGuards(AuthGuard)
  async createVideo(
    @Args("createVideoInput") createVideoInput: CreateVideoInput,
    @CurrentUser() user: User,
  ): Promise<NewVideo> {
    const urls = ["youtu.be", "youtube"];
    const isYoutubeUrl = urls.some((url) => createVideoInput.url.includes(url));

    if (!isYoutubeUrl) {
      throw new BadRequestException("Invalid Youtube video URL");
    }

    const video = await this.videoService.create(user, createVideoInput);

    return {
      video,
      message: "Video posted",
    };
  }

  @Query(() => PaginateVideo, { name: "allVideos" })
  async findAll(
    @Args("limit", { defaultValue: 12 }) limit: number,
    @Args("page", { defaultValue: 1 }) page: number,
  ): Promise<PaginateVideo> {
    return this.videoService.findAll(limit, page);
  }

  @Query(() => PaginateVideo, { name: "myVideos" })
  @UseGuards(AuthGuard)
  async myVideos(
    @Args("limit", { defaultValue: 12 }) limit: number,
    @Args("page", { defaultValue: 1 }) page: number,
    @CurrentUser() user: Types.ObjectId,
  ): Promise<PaginateVideo> {
    return await this.videoService.myVideos(limit, page, user);
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async removeVideo(
    @Args("videoId", { type: () => String }) videoId: Types.ObjectId,
  ): Promise<string> {
    return await this.videoService.remove(videoId);
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async removeAllVideos(
    @CurrentUser() userId: Types.ObjectId,
  ): Promise<string> {
    return await this.videoService.deleteAll(userId);
  }
}
