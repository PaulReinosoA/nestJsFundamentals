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
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { ProductImage } from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Product)
    private readonly productImagesRepository: Repository<ProductImage>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productDetails } = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map((img) =>
          this.productImagesRepository.create({
            url: img,
          }),
        ),
      });

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBexception(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, ofset = 0 } = paginationDto;
    return this.productRepository.find({ take: limit, skip: ofset });
  }

  async findOne(term: string) {
    let product: Product | null;
    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      //product = await this.productRepository.findOneBy({ slug: term });
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where('UPPER(title)=:title or LOWER(slug)=:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne();
    }
    if (!product)
      throw new NotFoundException(`product not found with term: ${term}`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      this.findOne(id);
      const productUpdated = await this.productRepository.preload({
        id,
        ...updateProductDto,
        images: [],
      });
      return await this.productRepository.save({ id, ...productUpdated });
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
