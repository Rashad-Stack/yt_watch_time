import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ObjectId, ObjectIdColumn, OneToOne } from "typeorm";

@ObjectType()
@Entity("request_points")
export class Point {
  @Field(() => String)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field(() => Int)
  @Column()
  points: number;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => String)
  @Column()
  phone: string;

  @Field(() => String)
  @Column()
  trxId: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isApproved: boolean;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.points)
  user: User;

  constructor(partial: Partial<Point>) {
    Object.assign(this, partial);
    // Set default values if not provided
    this.isApproved = this.isApproved || false;
  }
}
