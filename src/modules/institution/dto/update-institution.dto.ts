import { IsString } from 'class-validator';

export class UpdateInstitutionDto {
    @IsString()
    institution: string;
}