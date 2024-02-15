import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { ObjectId, Repository } from "typeorm";
import { CreateVideoInput } from "./dto/create-video.input";
import { UpdateVideoInput } from "./dto/update-video.input";
import { Video } from "./entities/video.entity";

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async create(user: User, createVideoInput: CreateVideoInput) {
    try {
      await this.videoRepository.save({ createVideoInput, user: user });
      return "Your video has been posted successfully!";
    } catch (error) {
      throw new InternalServerErrorException();
    }
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
