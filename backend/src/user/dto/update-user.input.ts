import { Optional } from "@nestjs/common";
import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";
import { ObjectId } from "mongoose";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @MinLength(8)
  @Optional()
  password?: string;
}
