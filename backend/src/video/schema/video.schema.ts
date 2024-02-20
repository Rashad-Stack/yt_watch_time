import { InternalServerErrorException } from "@nestjs/common";
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

export type VideoDocument = Video & Document;

export const VideoSchema = SchemaFactory.createForClass(Video);

// Pre hooks for push the video to the user's videos array
VideoSchema.pre("save", async function (next) {
  try {
    const User = this.model("User");

    await User.updateOne(
      { _id: this.user._id },
      {
        $push: { videos: this._id },
      },
    );
    next();
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException(error);
  }
});
