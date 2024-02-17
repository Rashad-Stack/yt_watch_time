import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
}

export const UserSchema = SchemaFactory.createForClass(User);
