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
import { CreateUserInput } from "./dto/create-user.input";
import { User, UserDocument } from "./schema/user.schema";
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[]>;
    findOne(userId: Types.ObjectId): Promise<User>;
    updatePoint(loggedUserId: Types.ObjectId, hostUserId: Types.ObjectId): Promise<string>;
    approveUpdatePoint(userId: Types.ObjectId | User, pointId: Types.ObjectId, points: number): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
}
