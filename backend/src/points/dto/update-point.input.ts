import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Types } from "mongoose";
import { Point } from "../schema/points.schema";
import { CreatePointInput } from "./create-point.input";

@InputType()
export class UpdatePointInput extends PartialType(CreatePointInput) {
  @Field(() => String)
  id: Types.ObjectId | Point;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  points: number;
}
