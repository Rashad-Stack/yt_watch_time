import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
