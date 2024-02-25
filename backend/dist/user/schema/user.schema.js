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
exports.UserSchema = exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
const points_schema_1 = require("../../points/schema/points.schema");
const video_schema_1 = require("../../video/schema/video.schema");
let User = class User {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", Object)
], User.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ unique: true, required: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ length: 8, select: false, required: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, mongoose_1.Prop)({ default: 100, required: true, type: Number }),
    __metadata("design:type", Number)
], User.prototype, "watchPoint", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ default: "user", required: true, type: String }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => [video_schema_1.Video]),
    (0, mongoose_1.Prop)([{ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Video" }]),
    __metadata("design:type", Array)
], User.prototype, "videos", void 0);
__decorate([
    (0, graphql_1.Field)(() => [points_schema_1.Point]),
    (0, mongoose_1.Prop)([{ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Point" }]),
    __metadata("design:type", Array)
], User.prototype, "points", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)({
        timestamps: true,
        methods: {
            async comparePassword(password) {
                return await bcrypt.compareSync(password, this.password);
            },
            createAuthToken() {
                return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
            },
        },
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.pre("save", function (next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});
//# sourceMappingURL=user.schema.js.map