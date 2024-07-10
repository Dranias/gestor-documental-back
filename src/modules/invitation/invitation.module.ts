import { TypeOrmModule } from "@nestjs/typeorm";
import { Invitation } from "./entity/invitation.entity";
import { Module } from "@nestjs/common";
import { InvitationController } from "./invitation.controller";
import { InvitationsService } from "./invitation.service";

@Module({
    imports: [
      TypeOrmModule.forFeature([Invitation]),
    ],
    controllers: [InvitationController],
    providers: [InvitationsService],
  })
  export class InvitationModule {}