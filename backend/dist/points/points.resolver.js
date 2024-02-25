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
exports.PointsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("mongoose");
const auth_guard_1 = require("../auth/auth.guard");
const current_user_decorator_1 = require("../auth/current.user.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const user_service_1 = require("../user/user.service");
const create_point_input_1 = require("./dto/create-point.input");
const point_dto_1 = require("./dto/point.dto");
const points_service_1 = require("./points.service");
const points_schema_1 = require("./schema/points.schema");
let PointsResolver = class PointsResolver {
    constructor(pointsService, userService) {
        this.pointsService = pointsService;
        this.userService = userService;
    }
    async createPoint(createPointInput, user) {
        const point = await this.pointsService.create(user, createPointInput);
        return {
            point,
            message: "Request send",
        };
    }
    async findAll(page, limit, search, filter) {
        return this.pointsService.findAll(page, limit, search, filter);
    }
    async sendPointsToUser(pointId, status) {
        const point = await this.pointsService.approve(pointId, status);
        if (point.status === point_dto_1.Status.Approved) {
            await this.userService.approveUpdatePoint(point.user, point._id, point.points);
        }
        return {
            point,
            message: "Sended",
        };
    }
    async pointRequest(user, page, limit) {
        return this.pointsService.pointRequest(user, page, limit);
    }
};
exports.PointsResolver = PointsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => point_dto_1.NewPoints),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)("createPointInput")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_point_input_1.CreatePointInput, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PointsResolver.prototype, "createPoint", null);
__decorate([
    (0, graphql_1.Query)(() => point_dto_1.PaginatePoints, { name: "points" }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)("page", { type: () => graphql_1.Int, defaultValue: 1 })),
    __param(1, (0, graphql_1.Args)("limit", { type: () => graphql_1.Int, defaultValue: 20 })),
    __param(2, (0, graphql_1.Args)("search", { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)("filter", {
        type: () => String,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], PointsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => point_dto_1.UpdatedPoints),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, graphql_1.Args)("pointId", { type: () => String })),
    __param(1, (0, graphql_1.Args)("status", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], PointsResolver.prototype, "sendPointsToUser", null);
__decorate([
    (0, graphql_1.Query)(() => point_dto_1.PaginatePoints, { name: "pointRequest" }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)("page", { type: () => graphql_1.Int, defaultValue: 1 })),
    __param(2, (0, graphql_1.Args)("limit", { type: () => graphql_1.Int, defaultValue: 20 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Number, Number]),
    __metadata("design:returntype", Promise)
], PointsResolver.prototype, "pointRequest", null);
exports.PointsResolver = PointsResolver = __decorate([
    (0, graphql_1.Resolver)(() => points_schema_1.Point),
    __metadata("design:paramtypes", [points_service_1.PointsService,
        user_service_1.UserService])
], PointsResolver);
//# sourceMappingURL=points.resolver.js.map