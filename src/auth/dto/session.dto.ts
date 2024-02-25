import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/schema/user.schema";

@ObjectType("session")
export class Session {
  @Field(() => Boolean)
  isAuthenticated: boolean;

  @Field(() => User, { nullable: true })
  user: User;
}
