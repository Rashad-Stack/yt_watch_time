import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Point } from "../schema/points.schema";

export enum Status {
  Declean = "Declean",
  Approved = "Approved",
  Approve = "Approve",
}

@ObjectType("points")
export class PaginatePoints {
  @Field(() => [Point])
  points: Point[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pages: number;
}

@ObjectType("newPoints")
export class NewPoints {
  @Field(() => Point)
  point: Point;

  @Field(() => String)
  message: string;
}

@ObjectType("updatedPoints")
export class UpdatedPoints extends NewPoints {}
