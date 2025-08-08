// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBrandDto } from './create-brand.dto';
// //PartialType : hace que mi extens(los atributos) sea opcional
// export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

import { IsString, MinLength } from "class-validator";

export class UpdateBrandDto {
    @IsString()
    @MinLength(3)
    name: string;
  }
  