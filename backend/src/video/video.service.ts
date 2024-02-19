import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { CreateVideoInput } from "./dto/create-video.input";
import { UpdateVideoInput } from "./dto/update-video.input";
import { PaginateVideo } from "./dto/videos.dto";
import { Video, VideoDocument } from "./schema/video.schema";

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<VideoDocument>,
  ) {}

  async create(user: User, createVideoInput: CreateVideoInput): Promise<Video> {
    try {
      const video = new this.videoModel({
        ...createVideoInput,
        user: user,
      });

      await video.save();
      return video;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(limit: number, page: number): Promise<PaginateVideo> {
    try {
      const videos = await this.videoModel
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
        .skip((page - 1) * limit)
        .limit(limit);

      const totalVideos = await this.videoModel.countDocuments([
        {
          $lookup: {
            from: "users", // name of the users collection
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $match: {
            "user.watchPoint": { $gt: 0 },
          },
        },
      ]);

      return {
        videos,
        totalVideos,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: Types.ObjectId): Promise<Video> {
    try {
      const video = await this.videoModel.findOne({
        where: { _id: id },
      });

      return video;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  update(id: Types.ObjectId, updateVideoInput: UpdateVideoInput) {
    return updateVideoInput;
  }

  remove(id: Types.ObjectId) {
    return `This action removes a #${id} video`;
  }
}
