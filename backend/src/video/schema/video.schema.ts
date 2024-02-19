import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/user/schema/user.schema";

@ObjectType()
@Schema({ timestamps: true })
export class Video {
  @Field(() => String)
  _id: Types.ObjectId | Video;

  @Field(() => String)
  @Prop({ length: 200, required: true, type: String })
  title: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  url: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: Types.ObjectId | User;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
