import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, ArrayNotEmpty  } from 'class-validator';


@Entity({ name: 'agenda' })
export class Agenda {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'longtext' })
  @IsString()
  @ArrayNotEmpty()
  name: string;

  @Column({ type: 'longtext' })
  @IsString()
  @ArrayNotEmpty()
  position: string;

  @Column()
  @IsString()
  phone: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  createdAt: Date;

}