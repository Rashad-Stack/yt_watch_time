import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";

@ObjectType()
@Schema({ timestamps: true })
export class Video {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String)
  @Prop({ length: 200 })
  title: string;

  @Field(() => String)
  @Prop()
  url: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
