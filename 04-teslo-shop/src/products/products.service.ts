import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      this.handleDBexception(error);
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product)
      throw new NotFoundException(`product not found with id: ${id}`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      this.findOne(id);
      const productUpdated = await this.productRepository.preload({
        ...updateProductDto,
        id,
      });
      return await this.productRepository.save({ ...productUpdated, id });
    } catch (error) {
      this.handleDBexception(error);
    }
  }

  async remove(id: string) {
    const productRemoved = await this.findOne(id);
    await this.productRepository.delete({ id });
    return productRemoved;
  }

  private handleDBexception(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(`unexpected error, check logs!`);
  }
}
