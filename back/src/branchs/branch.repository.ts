import { InjectRepository } from "@nestjs/typeorm";
import { Branch } from "./branch.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";



@Injectable()
export class BranchRepository {
    constructor(
        @InjectRepository(Branch)
        private readonly branchRepository: Repository<Branch>)  {}

    async findAll(){
        return await this.branchRepository.find()
    }
    
    async findBranchesByPartialAddress(search: string): Promise<Branch[]> {
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

    return Branches
}

    async findById(id: string): Promise<Branch>{
        const findBranch = await this.branchRepository.findOneBy({id})
        if(!findBranch) throw new NotFoundException(`Sucursal con id ${id} no fue encontrada`)

        return findBranch
    }

    async createBranch(branch: CreateBranchDto): Promise<Branch>{
        const newBranch = this.branchRepository.create({
            name: branch.name,
            address: branch.address,
            latitude: branch.latitude,
            longitude: branch.longitude,
            googlePlaceId: branch.googlePlaceId
        })

        return await this.branchRepository.save(newBranch)

    }

    async updateBranch(id: string, branch: UpdateBranchDto): Promise<Branch>{
        await this.findById(id); // asegura que existe
        await this.branchRepository.update(id, branch);
        const updatedBranch = await this.branchRepository.findOneBy({ id });

        if (!updatedBranch) {
        throw new BadRequestException(`Error al actualizar la sucursal con id ${id}`);
        }

        return updatedBranch;
        
    }

    async deleteBranch(id: string):Promise<string>{
        await this.findById(id)
        await this.branchRepository.delete({id})
        return `Sucursal con id ${id} ha sido eliminada exitosamente`

    }


  }