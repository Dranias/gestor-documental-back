import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { Agenda } from './entity/agenda.entity';

@Controller('agenda')
export class AgendaController {
    constructor(private readonly agendaService: AgendaService) {}

    // Endpoint para crear un nuevo registro en la agenda
    @Post()
    async createAgenda(@Body() createAgendaDto: CreateAgendaDto): Promise<Agenda> {
        try {
            return await this.agendaService.createAgenda(createAgendaDto);
        } catch (error) {
            throw new HttpException(error.response || error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint para actualizar un registro en la agenda
    @Put(':id')
    async updateAgenda(
        @Param('id') id: string,
        @Body() updateAgendaDto: Partial<UpdateAgendaDto>,
    ): Promise<{ message: string }> {
        try {
            return await this.agendaService.updateAgenda(id, updateAgendaDto);
        } catch (error) {
            throw new HttpException(error.response || error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint para eliminar un registro en la agenda
    @Delete(':id')
    async deleteAgenda(@Param('id') id: string): Promise<string> {
        try {
            return await this.agendaService.deleteAgenda(id);
        } catch (error) {
            throw new HttpException(error.response || error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint para obtener todos los registros ordenados por el cargo (position)
    @Get('/all')
    async getAllAgendaByPosition(): Promise<Agenda[]> {
        try {
            return await this.agendaService.getAllAgendaByPosition();
        } catch (error) {
            throw new HttpException(error.response || error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
