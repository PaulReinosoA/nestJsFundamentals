import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  //tranform here
  limit?: number;

  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  ofset?: number;
}
