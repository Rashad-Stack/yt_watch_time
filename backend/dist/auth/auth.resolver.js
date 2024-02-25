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
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const user_service_1 = require("../user/user.service");
const auth_guard_1 = require("./auth.guard");
const auth_service_1 = require("./auth.service");
const current_user_decorator_1 = require("./current.user.decorator");
const login_input_1 = require("./dto/login.input");
const user_dto_1 = require("./dto/user.dto");
let AuthResolver = class AuthResolver {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(loginInput, { res }) {
        const data = await this.authService.login(loginInput);
        this.authService.sendTokenCookies(res, data.token);
        return {
            user: data.user,
            message: "Login successful!",
        };
    }
    async logout({ res }) {
        res.clearCookie("token");
        return "Logout successful!";
    }
    async session(currentUser) {
        const user = await this.userService.findOne(currentUser);
        return user;
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => user_dto_1.LoggedInUser),
    __param(0, (0, graphql_1.Args)("loginInput")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
__decorate([
    (0, graphql_1.Query)(() => user_schema_1.User),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "session", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map