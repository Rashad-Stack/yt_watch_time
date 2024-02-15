import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ObjectId } from "typeorm";
import { CreateVideoInput } from "./dto/create-video.input";
import { UpdateVideoInput } from "./dto/update-video.input";
import { Video } from "./entities/video.entity";
import { VideoService } from "./video.service";

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Mutation(() => Video)
  createVideo(@Args("createVideoInput") createVideoInput: CreateVideoInput) {
    return this.videoService.create(createVideoInput);
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
