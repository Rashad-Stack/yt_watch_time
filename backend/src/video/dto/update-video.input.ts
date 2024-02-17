import { Optional } from "@nestjs/common";
import { Field, InputType, PartialType } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";
import { ObjectId } from "mongoose";
import { CreateVideoInput } from "./create-video.input";

@InputType()
export class UpdateVideoInput extends PartialType(CreateVideoInput) {
  @Field(() => String, { name: "id" })
  @IsNotEmpty()
  id: ObjectId;

  @Field()
  @Optional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @Field()
  @Optional()
  @IsUrl({
    require_protocol: true,
    require_host: true,
    require_tld: true,
    require_valid_protocol: true,
    protocols: ["https"],
    allow_protocol_relative_urls: false,
  })
  url: string;
}
