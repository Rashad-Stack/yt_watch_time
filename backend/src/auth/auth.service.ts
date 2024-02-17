import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as jwt from "jsonwebtoken";
import { Model } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  private readonly verify = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
  };

  async create(LoginInput: LoginInput) {
    try {
      const user = await this.userModel.findOne({
        where: { email: LoginInput.email },
      });
      if (!user) {
        throw new UnauthorizedException("Invalid credentials!");
      }

      const passwordMatches = await user.comparePassword(LoginInput.password);
      if (!passwordMatches) {
        throw new UnauthorizedException("Invalid credentials!");
      }

      return user.createAuthToken();
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials!");
    }
  }

  verifyToken(token: string): jwt.JwtPayload {
    try {
      return this.verify(token);
    } catch (error) {
      throw new UnauthorizedException("Invalid token!", {
        cause: new Error("Invalid token!"),
      });
    }
  }
}
