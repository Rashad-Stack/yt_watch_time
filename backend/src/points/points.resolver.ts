import { UnauthorizedException } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request } from "express";
import { ObjectId } from "mongoose";
import { AuthResolver } from "src/auth/auth.resolver";
import { AuthService } from "src/auth/auth.service";
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
  async createPoint(
    @Args("createPointInput") createPointInput: CreatePointInput,
    @Context() { req }: { req: Request },
  ) {
    const user = await this.authResolver.session({ req });
    return this.pointsService.create(user, createPointInput);
  }

  @Query(() => PaginatePoints, { name: "points" })
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
    @Context() { req }: { req: Request },
  ): Promise<PaginatePoints> {
    const user = await this.authResolver.session({ req });
    if (user.role !== "admin") {
      throw new UnauthorizedException(
        "You are not authorized to perform this action",
      );
    }

    return this.pointsService.findAll(page, limit, search, filter);
  }

  @Query(() => Point, { name: "point" })
  async findOne(
    @Args("id", { type: () => String }) id: ObjectId,
    @Context() { req }: { req: Request },
  ) {
    const user = await this.authResolver.session({ req });
    if (user.role !== "admin") {
      throw new UnauthorizedException(
        "You are not authorized to perform this action",
      );
    }
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
