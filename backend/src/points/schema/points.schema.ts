import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";

@ObjectType()
@Schema({ timestamps: true })
export class Point {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => Int)
  @Prop()
  points: number;

  @Field(() => Int)
  @Prop()
  price: number;

  @Field(() => String)
  @Prop()
  phone: string;

  @Field(() => String)
  @Prop()
  trxId: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  isApproved: boolean;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;
}

export const PointSchema = SchemaFactory.createForClass(Point);
