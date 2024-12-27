import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { Agenda } from './entity/agenda.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Agenda]), // Importa el repositorio de Agenda
    ],
    controllers: [AgendaController], // Declara el controlador
    providers: [AgendaService], // Declara el servicio
})
export class AgendaModule {}
