import { Field, ObjectType } from "@nestjs/graphql";
import { Point } from "src/points/entities/point.entity";
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
  @Column({ length: 8, select: false })
  password: string;

  @Field(() => Number)
  @Column({ default: 100 }) // Default value for watchPoint
  watchPoint: number;

  @Field(() => String)
  @Column({ default: "user" }) // Default value for role
  role: string;

  @Field(() => [Video])
  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @Field(() => [Point])
  @OneToMany(() => Point, (point) => point.user)
  points: Point[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    // Set default values if not provided
    this.watchPoint = this.watchPoint || 100;
    this.role = this.role || "user";
  }
}
