import { IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateAudienceDto {

    @IsString()
    folio: string;

    @IsDateString()
    date: string;

    @IsString()
    name: string;

    @IsString()
    position: string;

    @IsString()
    description: string;

    @IsBoolean()
    priority: boolean;
}
