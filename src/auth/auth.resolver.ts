import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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

  @Query(() => String)
  async hello(@Context() { req }: { req: Request }) {
    console.log("cookies", req.cookies);
    return "hello";
  }
}
