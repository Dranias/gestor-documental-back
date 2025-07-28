import { IsArray, IsString } from 'class-validator';

export class MergePdfDto {
  @IsArray()
  @IsString({ each: true })
  filePaths: string[];
}
