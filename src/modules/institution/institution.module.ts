import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './entity/institution.entity';
import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';
import { SocketGateway } from "../../gateways/socket.gateway/socket.gateway.gateway";


@Module({
  imports: [
    TypeOrmModule.forFeature([Institution]),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService, SocketGateway],
})
export class InstitutionModule {}