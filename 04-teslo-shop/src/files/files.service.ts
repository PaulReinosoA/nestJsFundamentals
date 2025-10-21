import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    // const path = join(__dirname, '../../static/upload', imageName);
    const path = join(process.cwd(), 'static', 'upload', imageName);
    const path2 = path.toString().replace('\\\\', '\\');
    console.log({path2});
    if (!existsSync(path))
      throw new BadRequestException(`no product image with ${path}`);
    return path;
  }
}
