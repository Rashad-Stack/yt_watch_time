import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "src/user/schema/user.schema";
import { CreateVideoInput } from "./dto/create-video.input";
import { PaginateVideo } from "./dto/videos.dto";
import { Video, VideoDocument } from "./schema/video.schema";

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<VideoDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
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

  async remove(videoId: Types.ObjectId): Promise<string> {
    try {
      const video = await this.videoModel.findOneAndDelete({ _id: videoId });
      if (!video) {
        throw new NotAcceptableException();
      }

      // Deleting video id from usr videos array
      await this.userModel.findByIdAndUpdate(video.user._id, {
        $pull: { videos: video._id },
      });

      return "Deleted";
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteAll(userId: Types.ObjectId): Promise<string> {
    try {
      // Fetch all video ids
      const videos = await this.videoModel.find({ _id: userId }, "_id");

      // Delete all videos
      await this.videoModel.deleteMany({ _id: userId });

      // Update all users by removing the deleted video ids from the user.videos array
      await this.userModel.updateMany(
        { _id: userId },
        { $pull: { videos: { $in: videos } } },
      );

      return "Deleted";
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
