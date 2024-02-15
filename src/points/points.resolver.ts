import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePointInput } from "./dto/create-point.input";
import { UpdatePointInput } from "./dto/update-point.input";
import { Point } from "./entities/point.entity";
import { PointsService } from "./points.service";

@Resolver(() => Point)
export class PointsResolver {
  constructor(private readonly pointsService: PointsService) {}

  @Mutation(() => Point)
  createPoint(@Args("createPointInput") createPointInput: CreatePointInput) {
    return this.pointsService.create(createPointInput);
  }

  @Query(() => [Point], { name: "points" })
  findAll() {
    return this.pointsService.findAll();
  }

  @Query(() => Point, { name: "point" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.pointsService.findOne(id);
  }

  @Mutation(() => Point)
  updatePoint(@Args("id") updatePointInput: UpdatePointInput) {
    return this.pointsService.update(updatePointInput.id, updatePointInput);
  }

  @Mutation(() => Point)
  removePoint(@Args("id", { type: () => Int }) id: number) {
    return this.pointsService.remove(id);
  }
}
