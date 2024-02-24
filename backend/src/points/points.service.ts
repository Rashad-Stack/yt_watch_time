import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreatePointInput } from "./dto/create-point.input";
import { PaginatePoints, Status } from "./dto/point.dto";
import { Point, PointDocument } from "./schema/points.schema";

@Injectable()
export class PointsService {
  constructor(
    @InjectModel(Point.name)
    private readonly pointModel: Model<PointDocument>,
  ) {}
  async create(user: Types.ObjectId, createPointInput: CreatePointInput) {
    try {
      const point = new this.pointModel({
        ...createPointInput,
        user: user,
      });
      await point.save();
      return point;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(
    page: number,
    limit: number,
    search: string,
    filter: Status,
  ): Promise<PaginatePoints> {
    try {
      let promise = this.pointModel.find();
      let totalPromise = this.pointModel.countDocuments();

      if (search) {
        const searchCriteria = [
          { phone: { $regex: search, $options: "i" } },
          { trxId: { $regex: search, $options: "i" } },
        ];
        promise = promise.or(searchCriteria);

        totalPromise = totalPromise.or(searchCriteria);
      }

      if (filter === "Approve") {
        promise = promise.where("status").equals("Approve");
        totalPromise = totalPromise.where("status").equals("Approve");
      }

      if (filter === "Approved") {
        promise = promise.where("status").equals("Approved");
        totalPromise = totalPromise.where("status").equals("Approved");
      }

      if (filter === "Declean") {
        promise = promise.where("status").equals("Declean");
        totalPromise = totalPromise.where("status").equals("Declean");
      }

      const points = await promise
        .populate("user")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await totalPromise.exec();

      const pages = Math.ceil(total / limit);

      return {
        total,
        points,
        pages,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async approve(pointId: Types.ObjectId, status: Status) {
    try {
      const point = await this.pointModel.findByIdAndUpdate(
        pointId,
        {
          isApproved: true,
          status: status,
        },
        { new: true },
      );
      if (!point) {
        throw new NotFoundException();
      }
      return point;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async pointRequest(user: Types.ObjectId, page: number, limit: number) {
    try {
      const points = await this.pointModel
        .find({ user: user })
        .populate("user")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await this.pointModel.countDocuments({ user: user });

      const pages = Math.ceil(total / limit);

      return {
        total,
        points,
        pages,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
