import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/schema/user.schema";

@ObjectType("LoggedInUser")
export class LoggedInUser {
  @Field(() => User)
  user: User;

  @Field(() => String)
  message: string;
}
