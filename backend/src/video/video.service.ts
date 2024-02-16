import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
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
      const video = await this.videoRepository.save({
        ...createVideoInput,
        user: user,
      });
      return video;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Video[]> {
    try {
      const videos = await this.videoRepository.find({ relations: ["user"] });
      console.log(videos);
      return videos;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: ObjectId): Promise<Video> {
    try {
      const video = await this.videoRepository.findOne({
        where: { _id: new ObjectId(id) },
        relations: ["user"],
      });

      return video;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  update(id: ObjectId, updateVideoInput: UpdateVideoInput) {
    return `This action updates a #${id} video`;
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} video`;
  }
}
