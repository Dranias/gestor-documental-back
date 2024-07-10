import { IsString } from 'class-validator';

export class UpdateInvitationDto {
  
    @IsString()
    folio: string;
  
    @IsString()
    event: string;

    @IsString()
    dataDate: string;

    @IsString()
    avenue: string;
}
