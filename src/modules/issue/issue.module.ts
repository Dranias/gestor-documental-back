import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './entity/data.entity';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}