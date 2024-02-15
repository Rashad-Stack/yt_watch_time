import { Field, ObjectType } from "@nestjs/graphql";
import { Video } from "src/video/entities/video.entity";
import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany } from "typeorm";

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

  @Field(() => String)
  @Column({ default: "user" })
  role: string;

  @Field(() => [Video])
  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];
}
