import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfMergerService {
  async mergeUploadedFiles(files: Express.Multer.File[]) {
    const mergedPdf = await PDFDocument.create();

    for (const [i, file] of files.entries()) {
      const filePath = file.path;

      if (!filePath) {
        throw new Error(`Archivo sin ruta detectado.`);
      }

      const fileBuffer = fs.readFileSync(filePath);
      const pdf = await PDFDocument.load(fileBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      copiedPages.forEach((page) => mergedPdf.addPage(page));

      console.log(`Archivo #${i + 1}: ${file.originalname} ${filePath}`);
    }

    const mergedPdfBytes = await mergedPdf.save();

    // Define ruta absoluta fuera de dist
    const uploadsDir = path.join(process.cwd(), 'uploads'); // carpeta raíz del proyecto /uploads

    // Crear carpeta si no existe
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `merged_${Date.now()}.pdf`;
    const outputPath = path.join(uploadsDir, fileName);

    fs.writeFileSync(outputPath, mergedPdfBytes);

    return { fileName };
  }
}
