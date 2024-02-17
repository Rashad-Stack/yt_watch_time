import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreatePointInput } from "./dto/create-point.input";
import { UpdatePointInput } from "./dto/update-point.input";

import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { Point } from "./schema/points.schema";

@Injectable()
export class PointsService {
  constructor(
    @InjectModel(Point.name)
    private readonly pointRepository: Model<Point>,
  ) {}
  async create(user: User, createPointInput: CreatePointInput) {
    try {
      await this.pointRepository.create({ ...createPointInput, user: user });
      return "Request send successfully!";
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return "This action returns all points";
  }

  findOne(id: number) {
    return `This action returns a #${id} point`;
  }

  update(id: ObjectId, updatePointInput: UpdatePointInput) {
    return `This action updates a #${id} point with ${updatePointInput}`;
  }

  remove(id: number) {
    return `This action removes a #${id} point`;
  }
}
