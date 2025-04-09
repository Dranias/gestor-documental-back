import { IsString, IsBoolean, IsDateString } from 'class-validator';

export class UpdateAudienceDto {

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
