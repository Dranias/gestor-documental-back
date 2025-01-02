import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { Agenda } from './entity/agenda.entity';
import { SocketGateway } from "../../gateways/socket.gateway/socket.gateway.gateway";

@Module({
    imports: [
        TypeOrmModule.forFeature([Agenda]), // Importa el repositorio de Agenda
    ],
    controllers: [AgendaController], // Declara el controlador
    providers: [AgendaService, SocketGateway], // Declara el servicio
})
export class AgendaModule {}
