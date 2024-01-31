import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { Data } from './entity/data.entity';
import { UpdateDataDto } from './dto/update-data.dto';

@Controller('data')
export class DataController {

  constructor(private readonly dataService: DataService) { }

  @Post()
  async createDataSheet(@Body() createProductDto: CreateDataDto) {
    try {
      const data = await this.dataService.createDataSheet(createProductDto)
      return {
        success: true,
        message: 'Data sheet created successfully',
        data: data,
      };
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error creating product',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('/search')
  async searchData(@Query('query') query: string): Promise<Data[]> {
    return this.dataService.searchDataByFolioOrName(query);
  }

  @Get('/list')
  async getAllDataforList(): Promise<Data[]> {
    return this.dataService.getAllDataforList();
  }

  @Get('/all')
  async getAllData(): Promise<Data[]> {
    return this.dataService.getAllData();
  }

  @Get('/latest')
  async getLatestData(): Promise<Data> {
    return this.dataService.getLatestData();
  }

  @Get('/bydocnum')
  async getByDocNum(@Query('query') query: string) {
    return this.dataService.getByDocNum(query);
  }

  @Delete(':id')
  async deleteData(@Param('id') id: string): Promise<{ message: string }> {
    try {
      console.log(id);
      await this.dataService.deleteDataById(id);
      return { message: 'Eliminado correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get(':id')
  async searchDataById(@Param('id') id: string): Promise<{ success: boolean, message: string, data: Data }> {
    try {
      const data = await this.dataService.searchDataById(id);
      return data;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id')
  async updateDataById(@Param('id') id: string, @Body() updateDataDto: UpdateDataDto): Promise<{ message: string }> {
    console.log(updateDataDto);
    try {
      const result = await this.dataService.updateDataById(id, updateDataDto);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new HttpException('Error updating data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
