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
exports.BranchRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const branch_entity_1 = require("./branch.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
let BranchRepository = class BranchRepository {
    branchRepository;
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async findAll() {
        return await this.branchRepository.find();
    }
    async findBranchesByPartialAddress(search) {
        const addressKeywords = search
            .split(' ')
            .map(word => word.trim())
            .filter(word => word.length > 0);
        let query = this.branchRepository.createQueryBuilder('branch');
        addressKeywords.forEach((keyword, index) => {
            query = query.orWhere(`branch.address ILIKE :keyword${index}`, {
                [`keyword${index}`]: `%${keyword}%`,
            });
        });
        const Branches = await query.getMany();
        return Branches;
    }
    async findById(id) {
        const findBranch = await this.branchRepository.findOneBy({ id });
        if (!findBranch)
            throw new common_1.NotFoundException(`Sucursal con id ${id} no fue encontrada`);
        return findBranch;
    }
    async createBranch(branch) {
        const newBranch = this.branchRepository.create({
            name: branch.name,
            address: branch.address,
            latitude: branch.latitude,
            longitude: branch.longitude,
            googlePlaceId: branch.googlePlaceId
        });
        return await this.branchRepository.save(newBranch);
    }
    async updateBranch(id, branch) {
        await this.findById(id);
        await this.branchRepository.update(id, branch);
        const updatedBranch = await this.branchRepository.findOneBy({ id });
        if (!updatedBranch) {
            throw new common_1.BadRequestException(`Error al actualizar la sucursal con id ${id}`);
        }
        return updatedBranch;
    }
    async deleteBranch(id) {
        await this.findById(id);
        await this.branchRepository.delete({ id });
        return `Sucursal con id ${id} ha sido eliminada exitosamente`;
    }
};
exports.BranchRepository = BranchRepository;
exports.BranchRepository = BranchRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(branch_entity_1.Branch)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BranchRepository);
//# sourceMappingURL=branch.repository.js.map