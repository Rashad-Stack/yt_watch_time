import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
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
      return "Login successful!";
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
