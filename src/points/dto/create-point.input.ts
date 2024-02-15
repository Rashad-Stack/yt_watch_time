import { Field, InputType } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Min,
} from "class-validator";

@InputType("BuyPointInput")
export class CreatePointInput {
  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  points: number;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  trxId: string;
}
