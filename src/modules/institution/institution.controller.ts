import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { InstitutionService } from "./institution.service";
import { CreateInstitutionDto } from "./dto/create-institution.dto";
import { Institution } from "./entity/institution.entity";
import { UpdateInstitutionDto } from "./dto/update-institution.dto";


@Controller('institution')
export class InstitutionController {

    constructor(private readonly institutionService: InstitutionService) { }

    @Post()
    async createDataSheet(@Body() createInstitutionDto: CreateInstitutionDto) {
        console.log("Hola");
        try {
            const data = await this.institutionService.createIssue(createInstitutionDto)
            return {
                success: true,
                message: 'Dependencia creada exitosamente',
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
    async getAllData(): Promise<Institution[]> {
        return this.institutionService.getAllData();
    }

    @Patch(':id')
    async updateDataById(@Param('id') id: string, @Body() updateInstitutionDto: UpdateInstitutionDto): Promise<{ message: string }> {
        console.log(updateInstitutionDto);
        try {
            const result = await this.institutionService.updateDataById(id, updateInstitutionDto);
            return result;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new HttpException('Error updating data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}