import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Data } from './entity/data.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { ILike } from 'typeorm';
import { SocketGateway } from "../../gateways/socket.gateway/socket.gateway.gateway";

@Injectable()
export class DataService {

    constructor(
        @InjectRepository(Data)
        private readonly dataRepository: Repository<Data>,
        private readonly socketGateway: SocketGateway, // Inyectar el gateway
    ) { }

    async createDataSheet(createProductDto: CreateDataDto) {
        const { folio, date, time, issue, name, docNumber, description, institution, legalBasis, notes } = createProductDto;

        console.log(createProductDto);

        const docNumberArray = Array.isArray(docNumber) ? docNumber : [docNumber];

        const exists = await Promise.all(docNumberArray.map(number => this.getByDocNum(number)));

        if (exists.some(Boolean)) {
            throw new HttpException({ message: 'El número de documento ya existe' }, HttpStatus.BAD_REQUEST);
        }

        const product = await this.dataRepository.manager.transaction(async (transactionalEntityManager) => {
            const newData = new Data();
            newData.folio = folio;
            newData.date = new Date(date);
            newData.time = time;
            newData.issue = issue;
            newData.name = name;
            newData.docNumber = Array.isArray(docNumber) ? docNumber : [docNumber]; // Si docNumber no es un array, se convierte en un array con un solo elemento
            newData.description = description;
            newData.institution = institution;
            newData.legalBasis = legalBasis;
            newData.notes = notes;
            newData.createdAt = new Date();
            await transactionalEntityManager.save(newData);
            return newData;
        });
        // Emitir el evento "data-added" con el nuevo issue
        this.socketGateway.broadcast('data-added', product.docNumber);
        return product;
    }

    async searchDataByFolioOrName(query: string): Promise<Data[]> {
        if (!query || query.trim().length === 0) {
            return [];
        }

        const searchData = await this.dataRepository
            .createQueryBuilder('data')
            .where('data.docNumber LIKE :query', { query: `%${query}%` })
            .orWhere('data.name LIKE :query', { query: `%${query}%` })
            .getMany();
        return searchData;
    }

    async getByDocNum(docNumber: string): Promise<boolean> {
        const data = await this.dataRepository.findOne({
            where: { docNumber: ILike(`%${docNumber}%`) }
        });
        return !!data;
    }

    async getAllData(): Promise<Data[]> {
        return await this.dataRepository.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }

    async getAllDataforList(): Promise<Data[]> {
        // Realizar la consulta y obtener los datos
        const data = await this.dataRepository.find({
            order: {
                docNumber: 'DESC',
            },
        });
        // Emitir el evento antes de devolver los datos
        return data;
    }

    async deleteDataById(id: string): Promise<string> {
        const data = await this.dataRepository.findOne({ where: { id } });
        if (!data) {
            throw new NotFoundException(`Data with ID ${id} not found`);
        }

        await this.dataRepository.remove(data);
        return `Eliminado correctamente`;
    }

    async updateDataById(id: string, updateDataDto: UpdateDataDto): Promise<{ message: string }> {
        const data = await this.dataRepository.findOne({ where: { id } });
        if (!data) {
            throw new NotFoundException(`No encontrado`);
        }
        if (!updateDataDto.docNumber || !updateDataDto.institution) {
            throw new BadRequestException('Los campos docNumber e institution no pueden estar vacíos');
        }

        Object.assign(data, updateDataDto);

        await this.dataRepository.save(data);

        this.socketGateway.broadcast('data-patch', data.docNumber);

        return { message: `Actualizado correctamente` };
    }

    async getLatestData(): Promise<Data> {
        const latestData = await this.dataRepository.findOne({
            order: {
                createdAt: 'DESC'
            },
            where: {}
        });

        return latestData;
    }

    async searchDataById(id: string): Promise<{ success: boolean, message: string, data: Data }> {
        const data = await this.dataRepository.findOne({ where: { id } });
        if (!data) {
            throw new NotFoundException(`Data with ID ${id} not found`);
        }
        return { success: true, message: 'Data found successfully', data };
    }
}
