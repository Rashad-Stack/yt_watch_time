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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewVideo = exports.PaginateVideo = void 0;
const graphql_1 = require("@nestjs/graphql");
const video_schema_1 = require("../schema/video.schema");
let PaginateVideo = class PaginateVideo {
};
exports.PaginateVideo = PaginateVideo;
__decorate([
    (0, graphql_1.Field)(() => [video_schema_1.Video]),
    __metadata("design:type", Array)
], PaginateVideo.prototype, "videos", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginateVideo.prototype, "totalVideos", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], PaginateVideo.prototype, "pages", void 0);
exports.PaginateVideo = PaginateVideo = __decorate([
    (0, graphql_1.ObjectType)("videos")
], PaginateVideo);
let NewVideo = class NewVideo {
};
exports.NewVideo = NewVideo;
__decorate([
    (0, graphql_1.Field)(() => video_schema_1.Video),
    __metadata("design:type", video_schema_1.Video)
], NewVideo.prototype, "video", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NewVideo.prototype, "message", void 0);
exports.NewVideo = NewVideo = __decorate([
    (0, graphql_1.ObjectType)("newVideo")
], NewVideo);
//# sourceMappingURL=videos.dto.js.map