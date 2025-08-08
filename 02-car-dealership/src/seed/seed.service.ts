import { Injectable } from '@nestjs/common';
import { CAR_SEED } from './data/cars.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';
import { BRAND_SEED } from './data/brand.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}

  populateDB() {
    this.carsService.fillCarsWithSeeData(CAR_SEED);
    this.brandsService.fillBrandWithSeeData(BRAND_SEED);
    return 'seed exectuted successfull';
  }
}
