import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Response } from "express";
import * as jwt from "jsonwebtoken";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schema/user.schema";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // Verify the token
  private readonly verify = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
  };

  async login(LoginInput: LoginInput): Promise<{ user: User; token: string }> {
    try {
      // Find the user by email
      const user = await this.userModel.findOne(
        { email: LoginInput.email },
        "password role",
      );

      if (!user) {
        throw new UnauthorizedException("Invalid credentials!");
      }

      // Check if the password matches
      const passwordMatches = await user.comparePassword(LoginInput.password);
      if (!passwordMatches) {
        throw new UnauthorizedException("Invalid credentials!");
      }

      // Remove the password from the user object
      user.password = undefined;

      // Create Authenticated User Token
      const token = user.createAuthToken();

      // Return the token and the user
      return { user, token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Verify the token
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

  // Send the token as a cookie
  sendTokenCookies(res: Response, token: string) {
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1,
      secure: process.env.NODE_ENV === "production",
    });
  }
}
