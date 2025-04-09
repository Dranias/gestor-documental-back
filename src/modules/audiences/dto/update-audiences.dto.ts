import { IsString, IsBoolean } from 'class-validator';

export class UpdateAudienceDto {

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
