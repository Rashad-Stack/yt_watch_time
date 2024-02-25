/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Document, Types } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { Status } from "../dto/point.dto";
export declare class Point extends Document {
    _id: Types.ObjectId | Point;
    points: number;
    price: number;
    phone: string;
    trxId: string;
    isApproved: boolean;
    status: Status;
    user: Types.ObjectId | User;
    createdAt: Date;
    updatedAt: Date;
}
export type PointDocument = Point & Document;
export declare const PointSchema: mongoose.Schema<Point, mongoose.Model<Point, any, any, any, mongoose.Document<unknown, any, Point> & Point & Required<{
    _id: Point | Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Point, mongoose.Document<unknown, {}, mongoose.FlatRecord<Point>> & mongoose.FlatRecord<Point> & Required<{
    _id: Point | Types.ObjectId;
}>>;
