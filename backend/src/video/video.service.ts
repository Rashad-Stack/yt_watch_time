import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { CreateVideoInput } from "./dto/create-video.input";
import { UpdateVideoInput } from "./dto/update-video.input";
import { PaginateVideo } from "./dto/videos.dto";
import { Video } from "./schema/video.schema";

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<Video>,
  ) {}

  async create(user: User, createVideoInput: CreateVideoInput) {
    try {
      const video = await this.videoModel.create({
        ...createVideoInput,
        user: user,
      });
      return video;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(limit: number, page: number): Promise<PaginateVideo> {
    try {
      const promise = this.videoModel
        .aggregate([
          {
            $lookup: {
              from: "users", // name of the users collection
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: "$user", // Unwind user array
          },
          {
            $match: {
              "user.watchPoint": { $gt: 0 },
            },
          },
          {
            $sort: { "user.watchPoint": -1 },
          },
        ])
        .skip(limit * (page - 1))
        .limit(limit);

      const videos = await promise.exec();
      const totalVideos = await this.videoModel.countDocuments();

      return {
        videos,
        totalVideos,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: ObjectId): Promise<Video> {
    try {
      const video = await this.videoModel.findOne({
        where: { _id: id },
        relations: ["user"],
      });

      return video;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  update(id: ObjectId, updateVideoInput: UpdateVideoInput) {
    return updateVideoInput;
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} video`;
  }
}
