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
exports.UpdatedPoints = exports.NewPoints = exports.PaginatePoints = exports.Status = void 0;
const graphql_1 = require("@nestjs/graphql");
const points_schema_1 = require("../schema/points.schema");
var Status;
(function (Status) {
    Status["Declean"] = "Declean";
    Status["Approved"] = "Approved";
    Status["Approve"] = "Approve";
})(Status || (exports.Status = Status = {}));
let PaginatePoints = class PaginatePoints {
};
exports.PaginatePoints = PaginatePoints;
__decorate([
    (0, graphql_1.Field)(() => [points_schema_1.Point]),
    __metadata("design:type", Array)
], PaginatePoints.prototype, "points", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginatePoints.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginatePoints.prototype, "pages", void 0);
exports.PaginatePoints = PaginatePoints = __decorate([
    (0, graphql_1.ObjectType)("points")
], PaginatePoints);
let NewPoints = class NewPoints {
};
exports.NewPoints = NewPoints;
__decorate([
    (0, graphql_1.Field)(() => points_schema_1.Point),
    __metadata("design:type", points_schema_1.Point)
], NewPoints.prototype, "point", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NewPoints.prototype, "message", void 0);
exports.NewPoints = NewPoints = __decorate([
    (0, graphql_1.ObjectType)("newPoints")
], NewPoints);
let UpdatedPoints = class UpdatedPoints extends NewPoints {
};
exports.UpdatedPoints = UpdatedPoints;
exports.UpdatedPoints = UpdatedPoints = __decorate([
    (0, graphql_1.ObjectType)("updatedPoints")
], UpdatedPoints);
//# sourceMappingURL=point.dto.js.map