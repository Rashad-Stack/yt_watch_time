import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  OneToOne,
} from "typeorm";

@ObjectType()
@Entity("videos")
export class Video {
  @Field(() => String, { name: "id" })
  @ObjectIdColumn()
  _id: ObjectId;

  @Field(() => String)
  @Column(() => String)
  title: string;

  @Field(() => String)
  @Column(() => String)
  url: string;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.videos)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
