import { Module } from '@nestjs/common';
import { PdfMergerService } from './pdfMerger.service';
import { PdfMergerController } from './pdfMerger.controller';

@Module({
  controllers: [PdfMergerController],
  providers: [PdfMergerService],
  exports: [PdfMergerService],
})
export class PdfMergerModule {}
