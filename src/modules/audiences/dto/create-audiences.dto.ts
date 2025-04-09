import { IsString, IsBoolean } from 'class-validator';

export class CreateAudienceDto {

    @IsString()
    folio: string;

    @IsString()
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
