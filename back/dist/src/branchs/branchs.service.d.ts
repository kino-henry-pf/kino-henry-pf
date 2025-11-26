import { BranchRepository } from './branch.repository';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchService {
    private readonly branchRepository;
    constructor(branchRepository: BranchRepository);
    findAll(): Promise<Branch[]>;
    findBranchesByPartialAddress(search: string): Promise<Branch[]>;
    findById(id: string): Promise<Branch>;
    createBranch(dto: CreateBranchDto): Promise<Branch>;
    updateBranch(id: string, dto: UpdateBranchDto): Promise<Branch>;
    deleteBranch(id: string): Promise<string>;
}
