import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // },
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    createBrandDto.name.toLocaleUpperCase();
    const newBrand: Brand = {
      id: uuid(),
      name: name.toLocaleUpperCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((b) => b.id === id);
    if (brand == null) throw new NotFoundException();
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandBD = this.findOne(id);

    this.brands.map((b) => {
      if (b.id === id) {
        brandBD = {
          ...brandBD,
          ...updateBrandDto,
          updatedAt: new Date().getTime(),
        };
        return brandBD;
      }
    });
    return brandBD;
  }

  remove(id: string) {
    const brandBD = this.findOne(id);

    this.brands = this.brands.filter((b) => {
      if (b.id !== id) return b;
    });
    return brandBD;
  }

  fillBrandWithSeeData(brand: Brand[]) {
    this.brands = brand;
  }
}
