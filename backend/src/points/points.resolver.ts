import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request } from "express";
import { AuthResolver } from "src/auth/auth.resolver";
import { AuthService } from "src/auth/auth.service";
import { CreatePointInput } from "./dto/create-point.input";
import { UpdatePointInput } from "./dto/update-point.input";
import { PointsService } from "./points.service";
import { Point } from "./schema/points.schema";

@Resolver(() => Point)
export class PointsResolver {
  constructor(
    private readonly pointsService: PointsService,
    private readonly authService: AuthService,
    private readonly authResolver: AuthResolver,
  ) {}

  @Mutation(() => String)
  async createPoint(
    @Args("createPointInput") createPointInput: CreatePointInput,
    @Context() { req }: { req: Request },
  ) {
    const user = await this.authResolver.session({ req });
    return this.pointsService.create(user, createPointInput);
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
