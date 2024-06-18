import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { IsString  } from 'class-validator';
  
  
  @Entity({ name: 'issue' })
  export class Issue {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @IsString()
    issue: string;
  
    @Column()
    createdAt: Date;
  
  }