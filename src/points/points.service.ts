import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { ObjectId, Repository } from "typeorm";
import { CreatePointInput } from "./dto/create-point.input";
import { UpdatePointInput } from "./dto/update-point.input";
import { Point } from "./entities/point.entity";

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
  ) {}
  async create(user: User, createPointInput: CreatePointInput) {
    try {
      const newPoint = new Point(createPointInput);
      await this.pointRepository.save({ ...newPoint, user: user });
      return "Request send successfully!";
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return "This action adds a new point";
  }

  findAll() {
    return `This action returns all points`;
  }

  findOne(id: number) {
    return `This action returns a #${id} point`;
  }

  update(id: ObjectId, updatePointInput: UpdatePointInput) {
    return `This action updates a #${id} point`;
  }

  remove(id: number) {
    return `This action removes a #${id} point`;
  }
}
