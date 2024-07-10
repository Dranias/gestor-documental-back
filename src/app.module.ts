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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    DataModule, IssueModule, InstitutionModule, InvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
