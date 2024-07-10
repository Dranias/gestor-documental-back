import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';


@Entity({ name: 'invitations' })
export class Invitation {

  @PrimaryGeneratedColumn('increment')
  autoId: number;

  @Column({ type: 'longtext' })
  @IsString()
  name: string;

  @Column({ type: 'longtext' })
  @IsString()
  position: string;

  @Column({ type: 'longtext' })
  @IsString()
  avenue: string;

  @Column()
  @IsString()
  municipality: string;

  @Column()
  @IsString()
  day: string;

  @Column()
  @IsString()
  enventDate: string;

  @Column()
  @IsString()
  enventHour: string;

  @Column({ type: 'longtext' })
  @IsString()
  event: string;

  @Column({ type: 'longtext' })
  @IsString()
  matters: string;

  @Column({ type: 'longtext' })
  @IsString()
  priority: string;

  @Column()
  createdAt: Date;
}