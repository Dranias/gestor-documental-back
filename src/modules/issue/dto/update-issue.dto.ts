import { IsString } from 'class-validator';

export class UpdateIssueDto {
    @IsString()
    issue: string;
}