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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserInput) {
        try {
            const user = new this.userModel(createUserInput);
            await user.save();
            return user;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException("Email already exists", {
                    cause: new Error(),
                });
            }
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findAll() {
        try {
            return await this.userModel.find();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findOne(userId) {
        try {
            const user = await this.userModel.findOne({
                _id: userId,
            });
            if (!user) {
                throw new common_1.NotFoundException("user does not exist!", {
                    cause: new Error("Invalid credentials!"),
                });
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updatePoint(loggedUserId, hostUserId) {
        try {
            await this.userModel.findOneAndUpdate({ _id: hostUserId, watchPoint: { $gt: 0 } }, { $inc: { watchPoint: -1 } });
            await this.userModel.findByIdAndUpdate(loggedUserId, {
                $inc: { watchPoint: 1 },
            });
            return "User updated successfully!";
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async approveUpdatePoint(userId, pointId, points) {
        try {
            const user = await this.userModel.findOneAndUpdate({
                _id: userId,
                points: pointId,
            }, {
                $inc: { watchPoint: points },
                $pull: { points: pointId },
            }, { new: true });
            if (!user) {
                throw new common_1.NotFoundException("Requested for Points no longer exist!");
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map