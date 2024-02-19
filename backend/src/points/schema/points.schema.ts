import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { User } from "src/user/schema/user.schema";

@ObjectType()
@Schema({ timestamps: true })
export class Point extends Document {
  @Field(() => String)
  _id: Types.ObjectId | Point;

  @Field(() => Int)
  @Prop({ required: true, type: Number })
  points: number;

  @Field(() => Int)
  @Prop({ required: true, type: Number })
  price: number;

  @Field(() => String)
  @Prop({ required: true, type: String })
  phone: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  trxId: string;

  @Field(() => Boolean)
  @Prop({ default: false, type: Boolean })
  isApproved: boolean;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: Types.ObjectId | User;
}

export type PointDocument = Point & Document;

export const PointSchema = SchemaFactory.createForClass(Point);
