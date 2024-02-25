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
import { UserService } from "src/user/user.service";
import { CreatePointInput } from "./dto/create-point.input";
import { NewPoints, PaginatePoints, Status } from "./dto/point.dto";
import { PointsService } from "./points.service";
import { Point } from "./schema/points.schema";
export declare class PointsResolver {
    private readonly pointsService;
    private readonly userService;
    constructor(pointsService: PointsService, userService: UserService);
    createPoint(createPointInput: CreatePointInput, user: Types.ObjectId): Promise<NewPoints>;
    findAll(page: number, limit: number, search: string, filter: Status): Promise<PaginatePoints>;
    sendPointsToUser(pointId: Types.ObjectId, status: Status): Promise<{
        point: import("mongoose").Document<unknown, {}, import("./schema/points.schema").PointDocument> & Point & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    pointRequest(user: Types.ObjectId, page: number, limit: number): Promise<PaginatePoints>;
}
