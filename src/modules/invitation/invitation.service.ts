import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Invitation } from "./entity/invitation.entity";
import { Repository } from "typeorm";
import { CreateInvitationDto } from "./dto/create-invitation.dto";

@Injectable()
export class InvitationsService {

    constructor(
        @InjectRepository(Invitation)
        private readonly invitationRepository: Repository<Invitation>,
    ) { }

    async createDataSheet(createInvitationDto: CreateInvitationDto) {
        const { name, position, avenue, municipality, day, enventDate, enventHour, event, matters, priority } = createInvitationDto;

        console.log(createInvitationDto);

        const product = await this.invitationRepository.manager.transaction(async (transactionalEntityManager) => {
            const newData = new Invitation();
            newData.name = name;
            newData.position = position;
            newData.avenue = avenue;
            newData.municipality = municipality;
            newData.day = day;
            newData.enventDate = enventDate;
            newData.enventHour = enventHour;
            newData.event = event;
            newData.matters = matters;
            newData.priority = priority;

            newData.createdAt = new Date();
            await transactionalEntityManager.save(newData);
            return newData;
        });
        return product;
    }

    async getAllInvitationsOrderedByAutoIdDesc() {
        return this.invitationRepository.find({
            order: {
                autoId: "ASC",
            },
        });
    }

}