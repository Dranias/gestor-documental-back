import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PdfMergerService } from './pdfMerger.service';
import { Response } from 'express';
import { multerConfig } from '../../config/multer.config';
import * as path from 'path';
import * as fs from 'fs';

@Controller('pdf')
export class PdfMergerController {
  constructor(private readonly pdfService: PdfMergerService) { }

  @Post('merge')
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async merge(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      if (!files || files.length === 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'No se recibieron archivos PDF.',
        });
      }

      const merged = await this.pdfService.mergeUploadedFiles(files);
      return res.status(HttpStatus.OK).json(merged);
    } catch (error) {
      console.error('Error al unir PDFs:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al unir archivos PDF.',
        detail: error.message,
      });
    }
  }

  @Get('download/:fileName')
  async downloadFile(@Res() res: Response, @Param('fileName') fileName: string) {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadsDir, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Archivo no encontrado.',
      });
    }

    return res.sendFile(filePath);
  }
}
