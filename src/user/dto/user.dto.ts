import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../schema/user.schema";

@ObjectType()
export class Signup {
  @Field(() => User)
  user: User;

  @Field(() => String)
  message: string;
}
