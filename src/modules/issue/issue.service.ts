import { Injectable, NotFoundException } from "@nestjs/common";
import { Issue } from "./entity/data.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateIssueDto } from "./dto/create-issue.dto";
import { UpdateIssueDto } from "./dto/update-issue.dto";

@Injectable()
export class IssueService {

    constructor(
        @InjectRepository(Issue)
        private readonly issueRepository: Repository<Issue>,
    ) { }

    async createIssue(issueRepository: CreateIssueDto) {
        const { issue } = issueRepository;

        const product = await this.issueRepository.manager.transaction(async (transactionalEntityManager) => {
            const newissue = new Issue();
            newissue.issue = issue;
            newissue.createdAt = new Date();
            await transactionalEntityManager.save(newissue);
            return newissue;
        });

    }

    async getAllData(): Promise<Issue[]> {
        return await this.issueRepository.find({
            order: {
                issue: 'ASC',
            },
        });
    }

    async updateDataById(id: string, updateIssueDto: UpdateIssueDto): Promise<{ message: string }> {
        const data = await this.issueRepository.findOne({ where: { id } });
        if (!data) {
            throw new NotFoundException(`No encontrado`);
        }

        Object.assign(data, updateIssueDto);

        await this.issueRepository.save(data);

        return { message: `Actualizado correctamente` };
    }

}