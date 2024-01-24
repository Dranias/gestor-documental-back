import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsString, ArrayNotEmpty  } from 'class-validator';


@Entity({ name: 'data' })
export class Data {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  folio: string;

  @Column()
  @IsDate()
  date: Date;

  @Column()
  @IsString()
  time: string;

  @Column()
  @IsString()
  issue: string;

  @Column()
  @IsString()
  name: string;
  
  @Column('simple-array')
  @IsString({ each: true })
  @ArrayNotEmpty()
  docNumber: string[]; 
  
  @Column({ type: 'longtext' })
  @IsString()
  description: string;
  
  @Column('simple-array')
  @IsString({ each: true })
  @ArrayNotEmpty()
  institution: string[];

  @Column({ type: 'longtext' })
  @IsString()
  legalBasis: string;

  @Column({ type: 'longtext' })
  @IsString()
  notes: string;

  @Column()
  createdAt: Date;

}