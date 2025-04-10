import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Institution } from "./entity/institution.entity";
import { CreateInstitutionDto } from "./dto/create-institution.dto";
import { UpdateInstitutionDto } from "./dto/update-institution.dto";
import { SocketGateway } from "../../gateways/socket.gateway/socket.gateway.gateway";

@Injectable()
export class InstitutionService {

    constructor(
        @InjectRepository(Institution)
        private readonly institutionRepository: Repository<Institution>,
        private readonly socketGateway: SocketGateway,
    ) { }

    async createInstitution(institutionRepository: CreateInstitutionDto) {
        const { institution } = institutionRepository;

        console.log(institution);

        const data = await this.institutionRepository.manager.transaction(async (transactionalEntityManager) => {
            const newinstitution = new Institution();
            newinstitution.institution = institution;
            newinstitution.createdAt = new Date();
            await transactionalEntityManager.save(newinstitution);
            return newinstitution;
        });
        this.socketGateway.broadcast('institution-added', data.institution);
    }

    async getAllData(): Promise<Institution[]> {
        return await this.institutionRepository.find({
            order: {
                institution: 'ASC',
            },
        });
    }

    async updateDataById(id: string, updateInstitutionDto: UpdateInstitutionDto): Promise<{ message: string }> {
        const data = await this.institutionRepository.findOne({ where: { id } });
        if (!data) {
            throw new NotFoundException(`No encontrado`);
        }

        Object.assign(data, updateInstitutionDto);

        await this.institutionRepository.save(data);

        return { message: `Actualizado correctamente` };
    }

    async deleteById(id: string): Promise<{ message: string }> {
        const data = await this.institutionRepository.findOne({ where: { id } });
        if (!data) {
            throw new NotFoundException(`No encontrado`);
        }

        await this.institutionRepository.remove(data);

        this.socketGateway.broadcast('institution-deleted', data.institution);

        return { message: `Eliminado correctamente` };
    }

}