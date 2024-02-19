import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Types } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/current.user.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { Signup } from "./dto/user.dto";
import { User } from "./schema/user.schema";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Signup)
  async createUser(
    @Args("createUserInput") createUserInput: CreateUserInput,
  ): Promise<Signup> {
    const user = await this.userService.create(createUserInput);

    return {
      user,
      message: "User created successfully",
    };
  }

  @Query(() => [User], { name: "users" })
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: "user" })
  @UseGuards(AuthGuard)
  findOne(@Args("id", { type: () => String }) id: Types.ObjectId) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async updateUserPoint(
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: Types.ObjectId,
  ) {
    return this.userService.updatePoint(currentUser, updateUserInput._id);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard, RolesGuard)
  async updateWatchPoint(
    @Args("userId", { type: () => String }) userId: Types.ObjectId,
    @Args("watchPoints", { type: () => Int }) watchPoints: number,
  ) {
    return this.userService.approveUpdatePoint(userId, watchPoints);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  removeUser(@Args("id", { type: () => Int }) id: Types.ObjectId) {
    return this.userService.remove(id);
  }
}
