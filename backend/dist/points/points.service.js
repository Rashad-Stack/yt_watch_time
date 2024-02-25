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
exports.PointsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const points_schema_1 = require("./schema/points.schema");
let PointsService = class PointsService {
    constructor(pointModel) {
        this.pointModel = pointModel;
    }
    async create(user, createPointInput) {
        try {
            const point = new this.pointModel({
                ...createPointInput,
                user: user,
            });
            await point.save();
            return point;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findAll(page, limit, search, filter) {
        try {
            let promise = this.pointModel.find();
            let totalPromise = this.pointModel.countDocuments();
            if (search) {
                const searchCriteria = [
                    { phone: { $regex: search, $options: "i" } },
                    { trxId: { $regex: search, $options: "i" } },
                ];
                promise = promise.or(searchCriteria);
                totalPromise = totalPromise.or(searchCriteria);
            }
            if (filter === "Approve") {
                promise = promise.where("status").equals("Approve");
                totalPromise = totalPromise.where("status").equals("Approve");
            }
            if (filter === "Approved") {
                promise = promise.where("status").equals("Approved");
                totalPromise = totalPromise.where("status").equals("Approved");
            }
            if (filter === "Declean") {
                promise = promise.where("status").equals("Declean");
                totalPromise = totalPromise.where("status").equals("Declean");
            }
            const points = await promise
                .populate("user")
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 });
            const total = await totalPromise.exec();
            const pages = Math.ceil(total / limit);
            return {
                total,
                points,
                pages,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async approve(pointId, status) {
        try {
            const point = await this.pointModel.findByIdAndUpdate(pointId, {
                isApproved: true,
                status: status,
            }, { new: true });
            if (!point) {
                throw new common_1.NotFoundException();
            }
            return point;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async pointRequest(user, page, limit) {
        try {
            const points = await this.pointModel
                .find({ user: user })
                .populate("user")
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 });
            const total = await this.pointModel.countDocuments({ user: user });
            const pages = Math.ceil(total / limit);
            return {
                total,
                points,
                pages,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
exports.PointsService = PointsService;
exports.PointsService = PointsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(points_schema_1.Point.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PointsService);
//# sourceMappingURL=points.service.js.map