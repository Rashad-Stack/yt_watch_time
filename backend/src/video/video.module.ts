import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthResolver } from "src/auth/auth.resolver";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Video } from "./entities/video.entity";
import { VideoResolver } from "./video.resolver";
import { VideoService } from "./video.service";

@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  providers: [
    VideoResolver,
    VideoService,
    AuthService,
    AuthResolver,
    UserService,
  ],
})
export class VideoModule {}
