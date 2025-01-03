import { Body, Controller, Patch, Get, Param } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { UpdateActorsDto } from './dto/update-actors.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) { }

  @Get()
  async getActors() {
    // No se necesita pasar el id en este caso ya que solo se busca uno
    const actors = await this.actorsService.getOrCreateDefaultActors();
    return {
      message: 'Actors fetched successfully',
      data: actors,
    };
  }

  // Recibe el id en la URL y los datos del actor a actualizar en el body
  @Patch(':id')  // `:id` es el parámetro de la URL
  async update(
    @Param('id') id: string, // Recibe el id de la URL
    @Body() updateActorsDto: UpdateActorsDto, // Recibe los datos a actualizar en el body
  ) {
    const actor = await this.actorsService.updateActors(id, updateActorsDto);
    return {
      message: 'Actor updated successfully',
      data: actor,
    };
  }
}