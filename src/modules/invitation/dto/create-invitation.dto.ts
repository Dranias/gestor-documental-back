import { IsString } from 'class-validator';

export class CreateInvitationDto {

  @IsString()
  name: string;

  @IsString()
  position: string;

  @IsString()
  avenue: string;

  @IsString()
  municipality: string;

  @IsString()
  day: string;

  @IsString()
  enventDate: string;

  @IsString()
  enventHour: string;

  @IsString()
  event: string;

  @IsString()
  matters: string;

  @IsString()
  priority: string;
}
