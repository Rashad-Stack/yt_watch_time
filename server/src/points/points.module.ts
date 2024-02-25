import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthResolver } from "src/auth/auth.resolver";
import { AuthService } from "src/auth/auth.service";
import { User, UserSchema } from "src/user/schema/user.schema";
import { UserService } from "src/user/user.service";
import { PointsResolver } from "./points.resolver";
import { PointsService } from "./points.service";
import { Point, PointSchema } from "./schema/points.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Point.name, schema: PointSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    PointsResolver,
    PointsService,
    AuthService,
    AuthResolver,
    UserService,
  ],
})
export class PointsModule {}
