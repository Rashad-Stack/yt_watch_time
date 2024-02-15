import { Field, InputType } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";

@InputType()
export class CreateVideoInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @Field()
  @IsNotEmpty()
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
