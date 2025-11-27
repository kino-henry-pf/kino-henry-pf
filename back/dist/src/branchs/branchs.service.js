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
exports.BranchService = void 0;
const common_1 = require("@nestjs/common");
const branch_repository_1 = require("./branch.repository");
let BranchService = class BranchService {
    branchRepository;
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    findAll() {
        return this.branchRepository.findAll();
    }
    findBranchesByPartialAddress(search) {
        return this.branchRepository.findBranchesByPartialAddress(search);
    }
    findById(id) {
        return this.branchRepository.findById(id);
    }
    createBranch(dto) {
        return this.branchRepository.createBranch(dto);
    }
    updateBranch(id, dto) {
        return this.branchRepository.updateBranch(id, dto);
    }
    deleteBranch(id) {
        return this.branchRepository.deleteBranch(id);
    }
};
exports.BranchService = BranchService;
exports.BranchService = BranchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [branch_repository_1.BranchRepository])
], BranchService);
//# sourceMappingURL=branchs.service.js.map