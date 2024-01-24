import { IsDate, IsString, IsArray } from 'class-validator';

export class CreateDataDto {

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
    docNumber: string[];
    
    @IsString()
    description: string;
    
    @IsArray()
    @IsString({ each: true })
    institution: string[];
  
    @IsString()
    legalBasis: string;
  
    @IsString()
    notes: string;
}
