import { BranchService } from './branchs.service';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchController {
    private readonly branchService;
    constructor(branchService: BranchService);
    findAll(): Promise<Branch[]>;
    findByPartialAddress(search: string): Promise<Branch[]>;
    findById(id: string): Promise<Branch>;
    createBranch(dto: CreateBranchDto): Promise<Branch>;
    updateBranch(id: string, dto: UpdateBranchDto): Promise<Branch>;
    deleteBranch(id: string): Promise<string>;
}
