import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthResolver } from "src/auth/auth.resolver";
import { AuthService } from "src/auth/auth.service";
import { User, UserSchema } from "src/user/schema/user.schema";
import { UserService } from "src/user/user.service";
import { Video, VideoSchema } from "./schema/video.schema";
import { VideoResolver } from "./video.resolver";
import { VideoService } from "./video.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    VideoResolver,
    VideoService,
    AuthService,
    AuthResolver,
    UserService,
  ],
})
export class VideoModule {}
