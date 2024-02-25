import { Field, InputType, Int } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Min,
} from "class-validator";

@InputType()
export class CreatePointInput {
  @Field(() => Int)
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
