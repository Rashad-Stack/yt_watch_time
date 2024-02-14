import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User {
  @Field(() => String)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column({ length: 8 })
  password: string;

  @Field(() => Number)
  @Column({ default: 100 })
  watchPoint: number;
}
