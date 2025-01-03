import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actors } from './entity/actors.entity';
import { UpdateActorsDto } from './dto/update-actors.dto';
import { SocketGateway } from '../../gateways/socket.gateway/socket.gateway.gateway';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actors)
    private readonly actorsRepository: Repository<Actors>,
    private readonly socketGateway: SocketGateway, // Inyección del gateway
  ) { }

  // Garantizar que solo haya un registro
  async getOrCreateDefaultActors(): Promise<Actors> {
    const actors = await this.actorsRepository.findOne({ where: { } });// Buscar cualquier registro existente
    if (!actors) {
      const defaultActors = this.actorsRepository.create({
        realiza: 'AVPS',
        revisa: 'AFG',
        autoriza: 'FBF',
      });
      return this.actorsRepository.save(defaultActors);
    }
    return actors;
  }

  // Actualizar el único registro existente
  async updateActors(id: string, updateActorsDto: UpdateActorsDto): Promise<Actors> {

    const actor = await this.actorsRepository.findOne({ where: { id } }); // Buscar por id

    if (!actor) {
      throw new Error('Actor no encontrado');
    }

    // Asignar los valores del DTO al actor
    Object.assign(actor, updateActorsDto);

    this.socketGateway.broadcast('actor-patch', actor.autoriza);

    // Guardar el actor actualizado
    return this.actorsRepository.save(actor);
  }
}

