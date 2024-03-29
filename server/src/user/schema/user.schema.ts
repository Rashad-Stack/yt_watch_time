import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import mongoose, { Document, Types } from "mongoose";
import { Point } from "src/points/schema/points.schema";
import { Video } from "src/video/schema/video.schema";

@ObjectType()
@Schema({
  timestamps: true,
  methods: {
    async comparePassword(
      this: UserDocument,
      password: string,
    ): Promise<boolean> {
      return await bcrypt.compareSync(password, this.password);
    },

    createAuthToken(this: UserDocument): string {
      return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      );
    },
  },
})
export class User {
  @Field(() => String)
  _id: Types.ObjectId | User;

  @Field(() => String)
  @Prop({ unique: true, required: true, type: String })
  email: string;

  @Field(() => String)
  @Prop({ length: 8, select: false, required: true, type: String })
  password: string;

  @Field(() => Number)
  @Prop({ default: 100, required: true, type: Number }) // Default value for watchPoint
  watchPoint: number;

  @Field(() => String)
  @Prop({ default: "user", required: true, type: String }) // Default value for role
  role: string;

  @Field(() => [Video])
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }])
  videos: Types.ObjectId[] | Video[];

  @Field(() => [Point])
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Point" }])
  points: Types.ObjectId[] | Point[];

  readonly comparePassword: (password: string) => Promise<boolean>;
  readonly createAuthToken: () => string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

// Hash the password before saving the user
UserSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
