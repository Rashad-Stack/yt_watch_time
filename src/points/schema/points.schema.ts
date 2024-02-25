import { InternalServerErrorException } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { Status } from "../dto/point.dto";

@ObjectType()
@Schema({ timestamps: true })
export class Point extends Document {
  @Field(() => String)
  _id: Types.ObjectId | Point;

  @Field(() => Int)
  @Prop({ type: Number })
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
  @Prop({ type: Boolean, default: false })
  isApproved: boolean;

  @Field(() => String)
  @Prop({ enum: Status, default: Status.Approve })
  status: Status;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: Types.ObjectId | User;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export type PointDocument = Point & Document;

export const PointSchema = SchemaFactory.createForClass(Point);

// Pre hooks for push the video to the user's videos array
PointSchema.pre("save", async function (next) {
  try {
    // Calculate Points by price
    this.points = this.price * 10;

    // Update User Point array
    const User = this.model("User");
    await User.updateOne(
      { _id: this.user._id },
      {
        $push: { points: this._id },
      },
    );
    next();
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException(error);
  }
});
