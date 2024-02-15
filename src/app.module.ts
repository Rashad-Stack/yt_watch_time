import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { User } from "./user/entities/user.entity";
import { UserModule } from "./user/user.module";
import { Video } from "./video/entities/video.entity";
import { VideoModule } from "./video/video.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: process.env.MONGO_HOST,
      password: process.env.MONGO_PASSWORD,
      username: process.env.MONGO_USERNAME,
      database: "watch-time",
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User, Video],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      include: [],
      context: ({ req, res }) => ({ req, res }),

      // Code first
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
    }),
    UserModule,
    AuthModule,
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
