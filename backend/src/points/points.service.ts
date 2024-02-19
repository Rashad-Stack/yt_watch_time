import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { CreatePointInput } from "./dto/create-point.input";
import { PaginatePoints } from "./dto/point.dto";
import { UpdatePointInput } from "./dto/update-point.input";
import { Point } from "./schema/points.schema";

@Injectable()
export class PointsService {
  constructor(
    @InjectModel(Point.name)
    private readonly pointRepository: Model<Point>,
  ) {}
  async create(user: User, createPointInput: CreatePointInput) {
    try {
      const point = new this.pointRepository({
        ...createPointInput,
        user: user,
      });
      await point.save();
      return point;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(
    page: number,
    limit: number,
    search: string,
    filter: boolean,
  ): Promise<PaginatePoints> {
    try {
      let promise = this.pointRepository.find();
      let totalPromise = this.pointRepository.countDocuments();

      if (search) {
        const searchCriteria = [
          { phone: { $regex: search, $options: "i" } },
          { trxId: { $regex: search, $options: "i" } },
        ];
        promise = promise.or(searchCriteria);

        totalPromise = totalPromise.or(searchCriteria);
      }

      if (filter) {
        promise = promise.where("isApproved").equals(true);
        totalPromise = totalPromise.where("isApproved").equals(true);
      }

      if (!filter) {
        promise = promise.where("isApproved").equals(false);
        totalPromise = totalPromise.where("isApproved").equals(false);
      }

      const points = await promise
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();

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

  findOne(id: ObjectId): Promise<Point> {
    return this.pointRepository.findById(id).exec();
  }

  update(id: ObjectId, updatePointInput: UpdatePointInput) {
    return `This action updates a #${id} point with ${updatePointInput}`;
  }

  remove(id: number) {
    return `This action removes a #${id} point`;
  }
}
