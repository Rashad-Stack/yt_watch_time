import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./schema/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    try {
      // Create a new instance of the User entity and set its properties

      await this.userModel.create(createUserInput);

      return "User created successfully!";
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

  async findOne(userId: ObjectId) {
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

  async updatePoint(loggedUserId: ObjectId, hostUserId: ObjectId) {
    try {
      await this.userModel.findOneAndUpdate(
        { _id: hostUserId, watchPoint: { $gt: 0 } },
        { $inc: { watchPoint: -1 } },
      );

      await this.userModel.findByIdAndUpdate(loggedUserId, {
        $inc: { watchPoint: 1 },
      });

      return "User updated successfully!";
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(userId: ObjectId, updateUserInput: UpdateUserInput) {
    return `This action updates a #${userId} user: ${updateUserInput.email}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
