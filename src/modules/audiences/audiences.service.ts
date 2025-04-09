import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Audiences } from './entity/audience.entity'
import { CreateAudienceDto } from './dto/create-audiences.dto';
import { UpdateAudienceDto } from './dto/update-audiences.dto';
import { SocketGateway } from '../../gateways/socket.gateway/socket.gateway.gateway';

@Injectable()
export class AudiencesService {
  constructor(
    @InjectRepository(Audiences)
    private readonly audienceRepository: Repository<Audiences>,
    private readonly socketGateway: SocketGateway,
  ) { }

  // Crear audiencia
  async createAudience(createAudienceDto: CreateAudienceDto): Promise<Audiences> {

    const { date, name, position, description, priority } = createAudienceDto;

    console.log("Data");
    console.log(createAudienceDto);

    const audience = await this.audienceRepository.manager.transaction(async (transactionalEntityManager) => {
      const newData = new Audiences();
      newData.date = new Date(date);
      newData.name = name;
      newData.position = position;
      newData.description = description;
      newData.priority = priority;
      newData.createdAt = new Date();
      await transactionalEntityManager.save(newData);
      return newData;
    });
    
    // Emitir el evento "audience-added" con el nuevo issue
    this.socketGateway.broadcast('audience-added', name);
    
    return audience;
  }

  // Buscar por nombre
  async searchByName(name: string): Promise<Audiences[]> {
    if (!name || name.trim().length === 0) return [];

    return this.audienceRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  // Obtener todas las audiencias ordenadas por folio
  async getAll(): Promise<Audiences[]> {
    const all = await this.audienceRepository.find();
    return all.sort((a, b) => a.folio - b.folio);
  }

  // Obtener por ID
  async getById(id: string): Promise<Audiences> {
    const found = await this.audienceRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`No se encontró audiencia con ID ${id}`);
    return found;
  }

  // Eliminar por ID
  async deleteById(id: string): Promise<string> {
    const found = await this.audienceRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`No se encontró audiencia con ID ${id}`);

    await this.audienceRepository.remove(found);
    return 'Eliminado correctamente';
  }

  // Actualizar por ID
  async updateById(id: string, updateDto: UpdateAudienceDto): Promise<{ message: string }> {
    const found = await this.audienceRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`No encontrado`);

    if (!updateDto.name) {
      throw new BadRequestException('Nombre no puede estar vacío');
    }

    Object.assign(found, updateDto);

    await this.audienceRepository.save(found);

    this.socketGateway.broadcast('audience-updated', found.name);

    return { message: 'Actualizado correctamente' };
  }
}
