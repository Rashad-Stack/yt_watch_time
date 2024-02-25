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
import { Types } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { CreateVideoInput } from "./dto/create-video.input";
import { NewVideo, PaginateVideo } from "./dto/videos.dto";
import { VideoService } from "./video.service";
export declare class VideoResolver {
    private readonly videoService;
    constructor(videoService: VideoService);
    createVideo(createVideoInput: CreateVideoInput, user: User): Promise<NewVideo>;
    findAll(limit: number, page: number): Promise<PaginateVideo>;
    myVideos(limit: number, page: number, user: Types.ObjectId): Promise<PaginateVideo>;
    removeVideo(videoId: Types.ObjectId): Promise<string>;
    removeAllVideos(userId: Types.ObjectId): Promise<string>;
}
