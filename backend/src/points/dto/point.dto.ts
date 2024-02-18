import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Point } from "../schema/points.schema";

@ObjectType("points")
export class PaginatePoints {
  @Field(() => [Point])
  points: Point[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pages: number;
}
