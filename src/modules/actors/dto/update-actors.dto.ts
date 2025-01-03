import { IsString, IsOptional } from 'class-validator';

export class UpdateActorsDto {
  @IsOptional()  // Solo se modifica si el campo es enviado
  @IsString()
  realiza?: string;

  @IsOptional()
  @IsString()
  revisa?: string;

  @IsOptional()
  @IsString()
  autoriza?: string;
}
