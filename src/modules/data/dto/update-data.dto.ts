import { IsDate, IsString, IsArray, IsNotEmpty } from 'class-validator';

export class UpdateDataDto {
  
    @IsString()
    folio: string;
  
    @IsDate()
    date: Date;
  
    @IsString()
    time: string;
  
    @IsString()
    issue: string;
  
    @IsString()
    name: string;
    
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ message: 'El campo OPG no puede estar vacío' })
    docNumber: string | string[];
    
    @IsString()
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    description: string;
    
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ message: 'El campo dependencia no puede estar vacía' })
    institution: string | string[];
  
    @IsString()
    legalBasis: string;
  
    @IsString()
    notes: string;  
}
