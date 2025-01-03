import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actors } from './entity/actors.entity';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { SocketGateway } from "../../gateways/socket.gateway/socket.gateway.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([Actors])],
  controllers: [ActorsController],
  providers: [ActorsService, SocketGateway],
})
export class ActorsModule {}
