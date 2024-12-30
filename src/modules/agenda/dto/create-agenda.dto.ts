import { IsString } from 'class-validator';

export class CreateAgendaDto {

    @IsString()
    name: string;

    @IsString()
    position: string;

    @IsString()
    phone: string;

    @IsString()
    adress: string;

    @IsString()
    email: string;
}
