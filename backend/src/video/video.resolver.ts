import { BadRequestException } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request } from "express";
import { AuthResolver } from "src/auth/auth.resolver";
import { ObjectId } from "typeorm";
import { CreateVideoInput } from "./dto/create-video.input";
import { UpdateVideoInput } from "./dto/update-video.input";
import { Video } from "./entities/video.entity";
import { VideoService } from "./video.service";

@Resolver(() => Video)
export class VideoResolver {
  constructor(
    private readonly videoService: VideoService,
    private readonly authResolver: AuthResolver,
  ) {}

  @Mutation(() => String)
  async createVideo(
    @Args("createVideoInput") createVideoInput: CreateVideoInput,
    @Context() { req }: { req: Request },
  ) {
    const urls = ["youtu.be", "youtube"];
    const isYoutubeUrl = urls.some((url) => createVideoInput.url.includes(url));

    if (!isYoutubeUrl) {
      throw new BadRequestException("Invalid Youtube video URL");
    }
    const user = await this.authResolver.session({ req });
    return this.videoService.create(user, createVideoInput);
  }

  @Query(() => [Video], { name: "video" })
  findAll() {
    return this.videoService.findAll();
  }

  @Query(() => Video, { name: "video" })
  findOne(@Args("id", { type: () => String }) id: ObjectId) {
    return this.videoService.findOne(id);
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
