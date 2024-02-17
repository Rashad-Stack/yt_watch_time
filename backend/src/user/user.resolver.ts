import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request } from "express";
import { ObjectId } from "mongoose";
import { AuthResolver } from "src/auth/auth.resolver";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./schema/user.schema";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authResolver: AuthResolver,
  ) {}

  @Mutation(() => String)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: "users" })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: "user" })
  findOne(@Args("id", { type: () => String }) id: ObjectId) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
    @Context() { req }: { req: Request },
  ) {
    await this.authResolver.session({ req });
    return this.userService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => String)
  async updateUserPoint(
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
    @Context() { req }: { req: Request },
  ) {
    const user = await this.authResolver.session({ req });
    return this.userService.updatePoint(user._id, updateUserInput._id);
  }

  @Mutation(() => User)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
