"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchsModule = void 0;
const common_1 = require("@nestjs/common");
const branchs_service_1 = require("./branchs.service");
const branchs_controller_1 = require("./branchs.controller");
const typeorm_1 = require("@nestjs/typeorm");
const branch_entity_1 = require("./branch.entity");
const branch_repository_1 = require("./branch.repository");
let BranchsModule = class BranchsModule {
};
exports.BranchsModule = BranchsModule;
exports.BranchsModule = BranchsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([branch_entity_1.Branch])],
        controllers: [branchs_controller_1.BranchController],
        providers: [branchs_service_1.BranchService, branch_repository_1.BranchRepository],
    })
], BranchsModule);
//# sourceMappingURL=branchs.module.js.map