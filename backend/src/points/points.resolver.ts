import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Types } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/current.user.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { UserService } from "src/user/user.service";
import { CreatePointInput } from "./dto/create-point.input";
import {
  NewPoints,
  PaginatePoints,
  Status,
  UpdatedPoints,
} from "./dto/point.dto";
import { PointsService } from "./points.service";
import { Point } from "./schema/points.schema";

@Resolver(() => Point)
export class PointsResolver {
  constructor(
    private readonly pointsService: PointsService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => NewPoints)
  @UseGuards(AuthGuard)
  async createPoint(
    @Args("createPointInput") createPointInput: CreatePointInput,
    @CurrentUser() user: Types.ObjectId,
  ): Promise<NewPoints> {
    const point = await this.pointsService.create(user, createPointInput);

    return {
      point,
      message: "Request send",
    };
  }

  @Query(() => PaginatePoints, { name: "points" })
  @UseGuards(AuthGuard, RolesGuard)
  async findAll(
    @Args("page", { type: () => Int, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Int, defaultValue: 20 }) limit: number,
    @Args("search", { type: () => String, nullable: true })
    search: string,
    @Args("filter", {
      type: () => String,
      nullable: true,
    })
    filter: Status,
  ): Promise<PaginatePoints> {
    return this.pointsService.findAll(page, limit, search, filter);
  }

  @Mutation(() => UpdatedPoints)
  @UseGuards(AuthGuard, RolesGuard)
  async sendPointsToUser(
    @Args("pointId", { type: () => String }) pointId: Types.ObjectId,
    @Args("status", { type: () => String }) status: Status,
  ) {
    const point = await this.pointsService.approve(pointId, status);
    if (point.status === Status.Approved) {
      await this.userService.approveUpdatePoint(
        point.user,
        point._id,
        point.points,
      );
    }

    return {
      point,
      message: "Sended",
    };
  }
}
