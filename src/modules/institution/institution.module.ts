import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './entity/institution.entity';
import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Institution]),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}