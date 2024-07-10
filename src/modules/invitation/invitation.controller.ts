import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { InvitationsService } from "./invitation.service";
import { CreateInvitationDto } from "./dto/create-invitation.dto";
import { Invitation } from "./entity/invitation.entity";

@Controller('invitation')
export class InvitationController {

    constructor(private readonly invitationService: InvitationsService) { }

    @Post()
    async createInvitationSheet(@Body() createInvitationDto: CreateInvitationDto) {
        try {
            const data = await this.invitationService.createDataSheet(createInvitationDto)
            return {
                success: true,
                message: 'Hoja de datos creada exitosamente',
                data: data,
            };
        } catch (error) {
            console.log("Este es el error:", error)
            if (error.message === 'El número de documento ya existe') {
                throw new HttpException(
                    'El número de documento ya existe',
                    HttpStatus.BAD_REQUEST
                )
            } else {
                throw new HttpException(
                    'Error en el sistema, por favot intente de nuevo',
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            }
        }
    }

    @Get('/all')
    async getAllInvitations(): Promise<Invitation[]> {
        return this.invitationService.getAllInvitationsOrderedByAutoIdDesc();
    }
}