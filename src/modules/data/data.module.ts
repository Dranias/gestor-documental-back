import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './entity/data.entity';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { SocketGateway } from "../../gateways/socket.gateway/socket.gateway.gateway";

@Module({
  imports: [
    TypeOrmModule.forFeature([Data]),
  ],
  controllers: [DataController],
  providers: [DataService, SocketGateway],
})
export class DataModule {}
