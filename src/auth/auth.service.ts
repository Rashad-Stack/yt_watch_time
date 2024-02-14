import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "src/user/entities/user.entity";
import { ObjectId, Repository } from "typeorm";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  private sighAuthToken(userId: ObjectId, userRole: string) {
    return jwt.sign({ id: userId, role: userRole }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN!,
    });
  }

  async create(LoginInput: LoginInput) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: LoginInput.email },
      });
      if (!user) {
        throw new UnauthorizedException("Invalid credentials!", {
          cause: new Error("Invalid credentials!"),
        });
      }

      const passwordMatches = await this.comparePasswords(
        LoginInput.password,
        user.password,
      );
      if (!passwordMatches) {
        throw new UnauthorizedException("Invalid credentials!", {
          cause: new Error("Invalid credentials!"),
        });
      }
      return this.sighAuthToken(user._id, "user");
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
