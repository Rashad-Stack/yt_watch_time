import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  OneToOne,
} from "typeorm";

@ObjectType()
@Entity("videos")
export class Video {
  @Field(() => String)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field(() => String)
  @Column({ length: 200 })
  title: string;

  @Field(() => String)
  @Column()
  url: string;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.videos)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
