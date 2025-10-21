import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import type { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response, //manualmente manejo yo la respuesta
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    res.status(403).json({
      ok: false,
      path: path,
    });
    console.log({ path });
    res.sendFile(path);
  }

  // El estandar para subir archivos es un post
  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: { fileSize: 1000000 },
      storage: diskStorage({
        destination: './static/upload ',
        filename: fileNamer,
      }),
    }),
  ) //propiedad del body al enviar el archivo por postman, y la referenia de mihelper para validar el archivo
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(
        'Not found file with correct extention to upload',
      );
    }

    console.log({ fileControler: file });
    return file;
  }
}
