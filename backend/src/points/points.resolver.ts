import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthResolver } from "src/auth/auth.resolver";
import { AuthService } from "src/auth/auth.service";
import { CurrentUser } from "src/auth/current.user.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { User } from "src/user/schema/user.schema";
import { CreatePointInput } from "./dto/create-point.input";
import { PaginatePoints } from "./dto/point.dto";
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
  @UseGuards(AuthGuard)
  async createPoint(
    @Args("createPointInput") createPointInput: CreatePointInput,
    @CurrentUser() user: User,
  ) {
    return this.pointsService.create(user, createPointInput);
  }

  @Query(() => PaginatePoints, { name: "points" })
  @UseGuards(AuthGuard, RolesGuard)
  async findAll(
    @Args("page", { type: () => Int, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Int, defaultValue: 20 }) limit: number,
    @Args("search", { type: () => String, nullable: true })
    search: string,
    @Args("filter", {
      type: () => Boolean,
      defaultValue: false,
      nullable: true,
    })
    filter: boolean,
  ): Promise<PaginatePoints> {
    return this.pointsService.findAll(page, limit, search, filter);
  }

  @Query(() => Point, { name: "point" })
  @UseGuards(AuthGuard, RolesGuard)
  async findOne(@Args("id", { type: () => String }) id: ObjectId) {
    return this.pointsService.findOne(id);
  }

  @Mutation(() => Point)
  @UseGuards(AuthGuard, RolesGuard)
  updatePoint(@Args("id") updatePointInput: UpdatePointInput) {
    return this.pointsService.update(updatePointInput.id, updatePointInput);
  }

  @Mutation(() => Point)
  @UseGuards(AuthGuard, RolesGuard)
  removePoint(@Args("id", { type: () => Int }) id: number) {
    return this.pointsService.remove(id);
  }
}
