import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Actors {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    realiza: string;

    @Column({ unique: true })
    revisa: string;

    @Column({ unique: true })
    autoriza: string;
}
