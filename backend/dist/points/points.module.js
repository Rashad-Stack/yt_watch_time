"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_resolver_1 = require("../auth/auth.resolver");
const auth_service_1 = require("../auth/auth.service");
const user_schema_1 = require("../user/schema/user.schema");
const user_service_1 = require("../user/user.service");
const points_resolver_1 = require("./points.resolver");
const points_service_1 = require("./points.service");
const points_schema_1 = require("./schema/points.schema");
let PointsModule = class PointsModule {
};
exports.PointsModule = PointsModule;
exports.PointsModule = PointsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: points_schema_1.Point.name, schema: points_schema_1.PointSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        providers: [
            points_resolver_1.PointsResolver,
            points_service_1.PointsService,
            auth_service_1.AuthService,
            auth_resolver_1.AuthResolver,
            user_service_1.UserService,
        ],
    })
], PointsModule);
//# sourceMappingURL=points.module.js.map