import { UnauthorizedException } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request, Response } from "express";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args("loginInput") loginInput: LoginInput,
    @Context() { res }: { res: Response },
  ) {
    const token = await this.authService.create(loginInput);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return "Login successful!";
  }

  @Mutation(() => String)
  async logout(@Context() { res }: { res: Response }) {
    res.clearCookie("token");
    return "Logout successful!";
  }

  @Query(() => User)
  async session(@Context() { req }: { req: Request }) {
    const { token } = req.cookies;

    if (!token) {
      throw new UnauthorizedException(
        "You are not logged in. Please log in and try again.",
      );
    }

    const payload = await this.authService.verifyToken(token);

    if (!payload) {
      throw new UnauthorizedException(
        "Your token has expired or invalid. Please log in and try again.",
      );
    }

    const user = await this.userService.findOne(payload.id);

    return {
      ...user,
      password: undefined,
    };
  }
}
