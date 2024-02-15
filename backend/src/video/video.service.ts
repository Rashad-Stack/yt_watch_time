import { Injectable } from "@nestjs/common";
import { ObjectId } from "typeorm";
import { CreateVideoInput } from "./dto/create-video.input";
import { UpdateVideoInput } from "./dto/update-video.input";

@Injectable()
export class VideoService {
  create(createVideoInput: CreateVideoInput) {
    return "This action adds a new video";
  }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: ObjectId) {
    return `This action returns a #${id} video`;
  }

  update(id: ObjectId, updateVideoInput: UpdateVideoInput) {
    return `This action updates a #${id} video`;
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} video`;
  }
}
