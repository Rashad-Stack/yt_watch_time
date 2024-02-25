import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { PointsModule } from "./points/points.module";
import { UserModule } from "./user/user.module";
import { VideoModule } from "./video/video.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client"),
      exclude: ["/graphql/(.*)"],
    }),

    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGO_URI),

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
    PointsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
