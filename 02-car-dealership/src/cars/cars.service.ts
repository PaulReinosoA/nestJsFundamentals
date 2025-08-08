import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'honda',
    //   model: 'Odyssey',
    // },
  ];

  finAll() {
    return this.cars;
  }

  findById(id: string) {
    const res = this.cars.find((c) => c.id === id);
    if (!res) throw new NotFoundException(`car with id:${id} not found!`);

    return res;
  }

  create(createCarDto: CreateCarDto) {
    const newCar = {
      id: uuid(),
      // brand: createCarDto.brand,
      // model: createCarDto.model,
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid in the body`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto, //sobreescribe propiedades anterirores
          id, //sobreescribo id
        };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const carDB = this.findById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return carDB;
  }

  fillCarsWithSeeData(cars: Car[]) {
    this.cars = cars;
  }
}
