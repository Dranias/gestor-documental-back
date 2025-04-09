import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
  } from '@nestjs/common';
  import { AudiencesService } from './audiences.service';
  import { CreateAudienceDto } from './dto/create-audiences.dto';
  import { UpdateAudienceDto } from './dto/update-audiences.dto';
  
  @Controller('audiences')
  export class AudiencesController {
    constructor(private readonly audiencesService: AudiencesService) {}
  
    @Post()
    create(@Body() createAudienceDto: CreateAudienceDto) {
      return this.audiencesService.createAudience(createAudienceDto);
    }
  
    @Get('/all')
    findAll() {
      return this.audiencesService.getAll();
    }
  
    @Get('search')
    searchByName(@Query('name') name: string) {
      return this.audiencesService.searchByName(name);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.audiencesService.getById(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAudienceDto: UpdateAudienceDto) {
      return this.audiencesService.updateById(id, updateAudienceDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.audiencesService.deleteById(id);
    }
  }
  