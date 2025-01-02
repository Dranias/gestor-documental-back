import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Agenda } from './entity/agenda.entity';
import { SocketGateway } from "../../gateways/socket.gateway/socket.gateway.gateway";

@Injectable()
export class AgendaService {
    constructor(
        @InjectRepository(Agenda)
        private readonly agendaRepository: Repository<Agenda>,
        private readonly socketGateway: SocketGateway, // Inyectar el gateway
    ) { }

    // Crear un nuevo registro en la agenda
    async createAgenda(createAgendaDto: CreateAgendaDto): Promise<Agenda> {
        const { name, position, phone, address, email } = createAgendaDto;

        // Validar si ya existe un registro con el mismo nombre
        const exists = await this.agendaRepository.findOne({ where: { name } });

        if (exists) {
            throw new HttpException(
                { message: 'El nombre ya existe en la agenda' },
                HttpStatus.BAD_REQUEST,
            );
        }

        // Transacción para crear el registro
        const agenda = await this.agendaRepository.manager.transaction(async (transactionalEntityManager) => {
            const newAgenda = new Agenda();
            newAgenda.name = name;
            newAgenda.position = position;
            newAgenda.phone = phone;
            newAgenda.address = address;
            newAgenda.email = email;
            newAgenda.createdAt = new Date();
            await transactionalEntityManager.save(newAgenda);
            return newAgenda;
        });

        this.socketGateway.broadcast('agenda-added', agenda.position);

        return agenda;
    }

    // Actualizar un registro existente
    async updateAgenda(id: string, updateAgendaDto: Partial<CreateAgendaDto>): Promise<{ message: string }> {
        const agenda = await this.agendaRepository.findOne({ where: { id } });

        if (!agenda) {
            throw new HttpException({ message: 'Agenda no encontrada' }, HttpStatus.NOT_FOUND);
        }

        Object.assign(agenda, updateAgendaDto);

        await this.agendaRepository.save(agenda);

        this.socketGateway.broadcast('agenda-patch', agenda.position);

        return { message: `Actualizado correctamente` };
    }

    // Eliminar un registro por su ID
    async deleteAgenda(id: string): Promise<string> {
        const agenda = await this.agendaRepository.findOne({ where: { id } });

        if (!agenda) {
            throw new HttpException({ message: 'Agenda no encontrada' }, HttpStatus.NOT_FOUND);
        }

        await this.agendaRepository.remove(agenda);

        this.socketGateway.broadcast('agenda-delete', agenda.position);

        return `Eliminado correctamente`;
    }

    // Regresa toda la lista de la Agenda ordenada por el cargo
    async getAllAgendaByPosition(): Promise<Agenda[]> {
        return await this.agendaRepository.find({
            order: {
                position: 'DESC', // Ordenar por position en orden ascendente (puedes cambiar a 'DESC' si necesitas descendente)
            },
        });
    }
}
