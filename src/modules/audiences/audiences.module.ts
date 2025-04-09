import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudiencesService } from './audiences.service';
import { AudiencesController } from './audiences.controller';
import { Audiences } from './entity/audience.entity';
import { SocketGateway } from "../../gateways/socket.gateway/socket.gateway.gateway";

@Module({
    imports: [
        TypeOrmModule.forFeature([Audiences])
    ],
    controllers: [AudiencesController],
    providers: [AudiencesService, SocketGateway],
})
export class AudiencesModule { }
