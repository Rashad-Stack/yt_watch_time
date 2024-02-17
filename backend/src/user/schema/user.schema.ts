import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import { Response } from "express";
import * as jwt from "jsonwebtoken";
import mongoose, { ObjectId } from "mongoose";
import { Point } from "src/points/schema/points.schema";
import { Video } from "src/video/schema/video.schema";

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop({ length: 8, select: false })
  password: string;

  @Field(() => Number)
  @Prop({ default: 100 }) // Default value for watchPoint
  watchPoint: number;

  @Field(() => String)
  @Prop({ default: "user" }) // Default value for role
  role: string;

  @Field(() => [Video])
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Video" })
  videos: Video;

  @Field(() => [Point])
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Point" })
  points: Point[];

  readonly createAuthToken = function (): string {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  readonly comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  readonly sendCookie = function (res: Response, token: string) {
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1,
      secure: process.env.NODE_ENV === "production",
    });
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
