import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthResolver } from "src/auth/auth.resolver";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Point } from "./entities/point.entity";
import { PointsResolver } from "./points.resolver";
import { PointsService } from "./points.service";

@Module({
  imports: [TypeOrmModule.forFeature([Point, User])],
  providers: [
    PointsResolver,
    PointsService,
    AuthService,
    AuthResolver,
    UserService,
  ],
})
export class PointsModule {}
