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
import { Model, Types } from "mongoose";
import { User, UserDocument } from "src/user/schema/user.schema";
import { CreateVideoInput } from "./dto/create-video.input";
import { PaginateVideo } from "./dto/videos.dto";
import { Video, VideoDocument } from "./schema/video.schema";
export declare class VideoService {
    private readonly videoModel;
    private readonly userModel;
    constructor(videoModel: Model<VideoDocument>, userModel: Model<UserDocument>);
    create(user: User, createVideoInput: CreateVideoInput): Promise<Video>;
    findAll(limit: number, page: number): Promise<PaginateVideo>;
    myVideos(limit: number, page: number, userId: Types.ObjectId): Promise<PaginateVideo>;
    remove(videoId: Types.ObjectId): Promise<string>;
    deleteAll(userId: Types.ObjectId): Promise<string>;
}
