import { BadRequestException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Types } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthResolver } from "src/auth/auth.resolver";
import { CurrentUser } from "src/auth/current.user.decorator";
import { User } from "src/user/schema/user.schema";
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
  @UseGuards(AuthGuard)
  async createVideo(
    @Args("createVideoInput") createVideoInput: CreateVideoInput,
    @CurrentUser() user: User,
  ): Promise<{ video: Video; message: string }> {
    const urls = ["youtu.be", "youtube"];
    const isYoutubeUrl = urls.some((url) => createVideoInput.url.includes(url));

    if (!isYoutubeUrl) {
      throw new BadRequestException("Invalid Youtube video URL");
    }

    const video = await this.videoService.create(user, createVideoInput);

    return {
      video,
      message: "Video created successfully",
    };
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
    @Args("id", { type: () => String }) id: Types.ObjectId,
  ): Promise<Video> {
    return await this.videoService.findOne(id);
  }

  @Mutation(() => Video)
  updateVideo(@Args("updateVideoInput") updateVideoInput: UpdateVideoInput) {
    return this.videoService.update(updateVideoInput.id, updateVideoInput);
  }

  @Mutation(() => Video)
  removeVideo(@Args("id", { type: () => String }) id: Types.ObjectId) {
    return this.videoService.remove(id);
  }
}
