import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { UserService } from "src/user/user.service";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current.user.decorator";
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
  @UseGuards(AuthGuard)
  async logout(@Context() { res }: { res: Response; req: Request }) {
    res.clearCookie("token");
    return "Logout successful!";
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async session(@CurrentUser() currentUser: Types.ObjectId): Promise<User> {
    // Find the user by id
    const user = await this.userService.findOne(currentUser);

    // Return the user
    return user;
  }
}
