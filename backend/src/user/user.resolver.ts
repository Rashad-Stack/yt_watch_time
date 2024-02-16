import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ObjectId } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}