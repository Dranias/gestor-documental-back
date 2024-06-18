import { IsString } from 'class-validator';

export class CreateInstitutionDto {

    @IsString()
    institution: string;
}