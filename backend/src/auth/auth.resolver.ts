import { UnauthorizedException } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request, Response } from "express";
import { User } from "src/user/schema/user.schema";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { LoggedInUser } from "./dto/user.dto";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => LoggedInUser)
  async login(
    @Args("loginInput") loginInput: LoginInput,
    @Context() { res }: { res: Response },
  ): Promise<LoggedInUser> {
    // Create a new user
    const data = await this.authService.create(loginInput);

    // Send the token as a cookie
    this.authService.sendTokenCookies(res, data.token);

    // Return the user and a message
    return {
      user: data.user,
      message: "Login successful!",
    };
  }

  @Mutation(() => String)
  async logout(@Context() { req, res }: { res: Response; req: Request }) {
    await this.session({ req });
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

    return user;
  }
}
