import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Model, ObjectId } from "mongoose";
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

  private readonly createAuthToken = function (
    id: ObjectId,
    role: string,
  ): string {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  private readonly comparePassword = async function (
    candidatePassword: string,
    databasePassword: string,
  ) {
    return await bcrypt.compare(candidatePassword, databasePassword);
  };

  async create(LoginInput: LoginInput) {
    try {
      const user = await this.userModel.findOne(
        { email: LoginInput.email },
        "password",
      );

      if (!user) {
        throw new UnauthorizedException("Invalid credentials!");
      }
      const passwordMatches = await this.comparePassword(
        LoginInput.password,
        user.password,
      );

      if (!passwordMatches) {
        throw new UnauthorizedException("Invalid credentials!");
      }

      return this.createAuthToken(user._id, user.role);
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials!");
    }
  }

  verifyToken(token: string): jwt.JwtPayload {
    try {
      return this.verify(token);
    } catch (error) {
      throw new UnauthorizedException(
        "Your token has expired or invalid. Please log in and try again.",
        {
          cause: new Error("Invalid token!"),
        },
      );
    }
  }
}
