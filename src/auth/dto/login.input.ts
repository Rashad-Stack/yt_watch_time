import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  remember: boolean;
}
