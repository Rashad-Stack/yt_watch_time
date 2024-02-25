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
exports.UpdatePointInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const create_point_input_1 = require("./create-point.input");
let UpdatePointInput = class UpdatePointInput extends (0, graphql_1.PartialType)(create_point_input_1.CreatePointInput) {
};
exports.UpdatePointInput = UpdatePointInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", Object)
], UpdatePointInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    __metadata("design:type", Number)
], UpdatePointInput.prototype, "points", void 0);
exports.UpdatePointInput = UpdatePointInput = __decorate([
    (0, graphql_1.InputType)()
], UpdatePointInput);
//# sourceMappingURL=update-point.input.js.map