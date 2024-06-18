import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { IssueService } from "./issue.service";
import { CreateIssueDto } from "./dto/create-issue.dto";
import { Issue } from "./entity/data.entity";
import { UpdateIssueDto } from "./dto/update-issue.dto";

@Controller('issue')
export class IssueController {

    constructor(private readonly issueService: IssueService) { }

    @Post()
    async createDataSheet(@Body() createIssueDto: CreateIssueDto) {
        try {
            const data = await this.issueService.createIssue(createIssueDto)
            return {
                success: true,
                message: 'Tema creada exitosamente',
                data: data,
            };
        } catch (error) {
            console.log("Este es el error:", error)
            throw new HttpException(
                'Error en el sistema, por favor intente de nuevo',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    @Get('/all')
    async getAllData(): Promise<Issue[]> {
        return this.issueService.getAllData();
    }

    @Patch(':id')
    async updateDataById(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto): Promise<{ message: string }> {
        console.log(updateIssueDto);
        try {
            const result = await this.issueService.updateDataById(id, updateIssueDto);
            return result;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new HttpException('Error updating data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}