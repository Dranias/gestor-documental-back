import { Injectable, NotFoundException } from "@nestjs/common";
import { Issue } from "./entity/data.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateIssueDto } from "./dto/create-issue.dto";
import { UpdateIssueDto } from "./dto/update-issue.dto";
import { SocketGateway } from "../../gateways/socket.gateway/socket.gateway.gateway";

@Injectable()
export class IssueService {

    constructor(
        @InjectRepository(Issue)
        private readonly issueRepository: Repository<Issue>,
        private readonly socketGateway: SocketGateway, // Inyectar el gateway
    ) {}

    async createIssue(issueRepository: CreateIssueDto) {
        const { issue } = issueRepository;
        const product = await this.issueRepository.manager.transaction(async (transactionalEntityManager) => {
            const newissue = new Issue();
            newissue.issue = issue;
            newissue.createdAt = new Date();
            await transactionalEntityManager.save(newissue);
            return newissue;
        });
        // Emitir el evento "issue-added" con el nuevo issue
        this.socketGateway.broadcast('issue-added', product.issue);
        return product;
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

    async deleteIssueById(id: string): Promise<{ message: string }> {
        // Buscar el issue por ID
        const issue = await this.issueRepository.findOne({ where: { id } });
        if (!issue) {
            throw new NotFoundException(`Issue con ID ${id} no encontrado`);
        }

        // Eliminar el issue
        await this.issueRepository.remove(issue);

        // Emitir el evento "issue-deleted" con el ID del issue eliminado
        this.socketGateway.broadcast('issue-deleted', issue.issue);

        return { message: `Issue con ID ${id} eliminado correctamente` };
    }
}
