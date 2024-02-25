"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const jwt = require("jsonwebtoken");
exports.CurrentUser = (0, common_1.createParamDecorator)(async (data, context) => {
    try {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const token = ctx.getContext()?.req?.cookies?.token;
        if (!token) {
            throw new common_1.UnauthorizedException("You are not logged in. Please log in and try again.");
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload) {
            throw new common_1.UnauthorizedException("Your token has expired or invalid. Please log in and try again.");
        }
        return payload.id;
    }
    catch (error) {
        throw new common_1.UnauthorizedException("Your token has expired or invalid. Please log in and try again.", {
            cause: new Error("Invalid token!"),
        });
    }
});
//# sourceMappingURL=current.user.decorator.js.map