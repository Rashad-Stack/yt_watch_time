import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { ObjectId as MongoId } from "mongodb";
import { ObjectId, Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async create(createUserInput: CreateUserInput) {
    try {
      createUserInput.password = this.hashPassword(createUserInput.password);
      await this.userRepository.save(createUserInput);
      return "User created successfully!";
    } catch (error) {
      console.log(error.code);
      if (error.code === 11000) {
        throw new ConflictException("Email already exists", {
          cause: new Error(),
        });
      }

      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(userId: ObjectId) {
    try {
      const user = await this.userRepository.findOneBy({
        _id: new MongoId(userId),
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

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
