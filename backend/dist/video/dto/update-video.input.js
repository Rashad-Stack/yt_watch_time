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
exports.UpdateVideoInput = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const create_video_input_1 = require("./create-video.input");
let UpdateVideoInput = class UpdateVideoInput extends (0, graphql_1.PartialType)(create_video_input_1.CreateVideoInput) {
};
exports.UpdateVideoInput = UpdateVideoInput;
__decorate([
    (0, graphql_1.Field)(() => String, { name: "id" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], UpdateVideoInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, common_1.Optional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateVideoInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, common_1.Optional)(),
    (0, class_validator_1.IsUrl)({
        require_protocol: true,
        require_host: true,
        require_tld: true,
        require_valid_protocol: true,
        protocols: ["https"],
        allow_protocol_relative_urls: false,
    }),
    __metadata("design:type", String)
], UpdateVideoInput.prototype, "url", void 0);
exports.UpdateVideoInput = UpdateVideoInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateVideoInput);
//# sourceMappingURL=update-video.input.js.map