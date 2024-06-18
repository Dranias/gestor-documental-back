import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { IsString  } from 'class-validator';
  
  
  @Entity({ name: 'institution' })
  export class Institution {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @IsString()
    institution: string;
  
    @Column()
    createdAt: Date;
  
  }