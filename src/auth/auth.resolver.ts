import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login(@Args("loginInput") loginInput: LoginInput) {
    return this.authService.create(loginInput);
  }

  @Query(() => String)
  async hello() {
    return "hello";
  }
}
