import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './modules/data/data.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { IssueModule } from './modules/issue/issue.module';
import { InstitutionModule } from './modules/institution/institution.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { AgendaModule } from './modules/agenda/agenda.module'
import { SocketGateway } from './gateways/socket.gateway/socket.gateway.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    DataModule, IssueModule, InstitutionModule, InvitationModule, AgendaModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
