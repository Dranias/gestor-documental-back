import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsString, ArrayNotEmpty, IsBoolean } from 'class-validator';

@Entity({ name: 'audiences' })
export class Audiences {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'int', unique: true, primary: true, generated: 'increment' })
    folio: number;

    @Column({ type: 'longtext' })
    @IsString()
    @ArrayNotEmpty()
    name: string;

    @Column({ type: 'longtext' })
    @IsString()
    @ArrayNotEmpty()
    position: string;

    @Column({ type: 'longtext' })
    @IsString()
    @ArrayNotEmpty()
    description: string;

    @Column()
    @IsBoolean()
    priority: boolean; // Cambiar a booleano

    @Column()
    createdAt: Date;
}
