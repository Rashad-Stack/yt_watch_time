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
import mongoose, { Types } from "mongoose";
import { User } from "src/user/schema/user.schema";
export declare class Video {
    _id: Types.ObjectId | Video;
    title: string;
    url: string;
    user: Types.ObjectId | User;
}
export type VideoDocument = Video & Document;
export declare const VideoSchema: mongoose.Schema<Video, mongoose.Model<Video, any, any, any, mongoose.Document<unknown, any, Video> & Video & Required<{
    _id: Types.ObjectId | Video;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Video, mongoose.Document<unknown, {}, mongoose.FlatRecord<Video>> & mongoose.FlatRecord<Video> & Required<{
    _id: Types.ObjectId | Video;
}>>;
