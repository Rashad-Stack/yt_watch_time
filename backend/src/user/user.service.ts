import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateUserInput } from "./dto/create-user.input";
import { User, UserDocument } from "./schema/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      // Create a new instance of the User entity and set its properties
      const user = new this.userModel(createUserInput);

      // Save the user entity to the database
      await user.save();

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException("Email already exists", {
          cause: new Error(),
        });
      }

      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(userId: Types.ObjectId): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        _id: userId,
      });
      if (!user) {
        throw new NotFoundException("user does not exist!", {
          cause: new Error("Invalid credentials!"),
        });
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updatePoint(loggedUserId: Types.ObjectId, hostUserId: Types.ObjectId) {
    try {
      // Find the user by id and update the watchPoint field
      await this.userModel.findOneAndUpdate(
        { _id: hostUserId, watchPoint: { $gt: 0 } },
        { $inc: { watchPoint: -1 } },
      );

      // Find the user by id and update the watchPoint field
      await this.userModel.findByIdAndUpdate(loggedUserId, {
        $inc: { watchPoint: 1 },
      });

      return "User updated successfully!";
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async approveUpdatePoint(
    userId: Types.ObjectId | User,
    pointId: Types.ObjectId,
    points: number,
  ) {
    try {
      const user = await this.userModel.findOneAndUpdate(
        {
          _id: userId,
          points: pointId,
        },
        {
          $inc: { watchPoint: points },
          $pull: { points: pointId },
        },
        { new: true },
      );

      if (!user) {
        throw new NotFoundException("Requested for Points no longer exist!");
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
