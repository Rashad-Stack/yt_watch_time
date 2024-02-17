import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import { User, UserSchema } from "./schema/user.schema";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre("save", function (next) {
            const salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
            next();
          });

          return schema;
        },
      },
    ]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
