import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { ObjectId } from "mongoose";
import { CreatePointInput } from "./create-point.input";

@InputType()
export class UpdatePointInput extends PartialType(CreatePointInput) {
  @Field(() => String)
  id: ObjectId;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  points: number;
}
