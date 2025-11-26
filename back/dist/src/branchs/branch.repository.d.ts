import { Branch } from "./branch.entity";
import { Repository } from "typeorm";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
export declare class BranchRepository {
    private readonly branchRepository;
    constructor(branchRepository: Repository<Branch>);
    findAll(): Promise<Branch[]>;
    findBranchesByPartialAddress(search: string): Promise<Branch[]>;
    findById(id: string): Promise<Branch>;
    createBranch(branch: CreateBranchDto): Promise<Branch>;
    updateBranch(id: string, branch: UpdateBranchDto): Promise<Branch>;
    deleteBranch(id: string): Promise<string>;
}
