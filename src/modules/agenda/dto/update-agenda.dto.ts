import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAgendaDto {

    @IsString()
    @IsNotEmpty({ message: 'El campo "Nombre" no puede estar vacío' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'El campo "Cargo" no puede estar vacío' })
    position: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsString()
    email: string;
}