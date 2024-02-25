"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("mongoose");
const auth_guard_1 = require("../auth/auth.guard");
const current_user_decorator_1 = require("../auth/current.user.decorator");
const user_schema_1 = require("../user/schema/user.schema");
const create_video_input_1 = require("./dto/create-video.input");
const videos_dto_1 = require("./dto/videos.dto");
const video_schema_1 = require("./schema/video.schema");
const video_service_1 = require("./video.service");
let VideoResolver = class VideoResolver {
    constructor(videoService) {
        this.videoService = videoService;
    }
    async createVideo(createVideoInput, user) {
        const urls = ["youtu.be", "youtube"];
        const isYoutubeUrl = urls.some((url) => createVideoInput.url.includes(url));
        if (!isYoutubeUrl) {
            throw new common_1.BadRequestException("Invalid Youtube video URL");
        }
        const video = await this.videoService.create(user, createVideoInput);
        return {
            video,
            message: "Video posted",
        };
    }
    async findAll(limit, page) {
        return this.videoService.findAll(limit, page);
    }
    async myVideos(limit, page, user) {
        return await this.videoService.myVideos(limit, page, user);
    }
    async removeVideo(videoId) {
        return await this.videoService.remove(videoId);
    }
    async removeAllVideos(userId) {
        return await this.videoService.deleteAll(userId);
    }
};
exports.VideoResolver = VideoResolver;
__decorate([
    (0, graphql_1.Mutation)(() => videos_dto_1.NewVideo),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)("createVideoInput")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_video_input_1.CreateVideoInput,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], VideoResolver.prototype, "createVideo", null);
__decorate([
    (0, graphql_1.Query)(() => videos_dto_1.PaginateVideo, { name: "allVideos" }),
    __param(0, (0, graphql_1.Args)("limit", { defaultValue: 12 })),
    __param(1, (0, graphql_1.Args)("page", { defaultValue: 1 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], VideoResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => videos_dto_1.PaginateVideo, { name: "myVideos" }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)("limit", { defaultValue: 12 })),
    __param(1, (0, graphql_1.Args)("page", { defaultValue: 1 })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], VideoResolver.prototype, "myVideos", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)("videoId", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], VideoResolver.prototype, "removeVideo", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], VideoResolver.prototype, "removeAllVideos", null);
exports.VideoResolver = VideoResolver = __decorate([
    (0, graphql_1.Resolver)(() => video_schema_1.Video),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoResolver);
//# sourceMappingURL=video.resolver.js.map