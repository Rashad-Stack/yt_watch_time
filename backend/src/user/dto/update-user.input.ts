import { Optional } from "@nestjs/common";
import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";
import { Types } from "mongoose";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @MinLength(8)
  @Optional()
  password?: string;
}
