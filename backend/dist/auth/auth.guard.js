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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
let AuthGuard = class AuthGuard {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    canActivate(context) {
        try {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const token = ctx.getContext()?.req?.cookies?.token;
            if (!token) {
                throw new common_1.UnauthorizedException("You are not logged in. Please log in and try again.");
            }
            const payload = this.authService.verifyToken(token);
            if (!payload) {
                throw new common_1.UnauthorizedException("Your token has expired or invalid. Please log in and try again.");
            }
            async function isUser(service) {
                const user = await service.findOne(payload.id);
                if (!user) {
                    throw new common_1.UnauthorizedException("You are not authorized to perform this action.");
                }
                return true;
            }
            return isUser(this.userService);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map