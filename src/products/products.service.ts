import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';
import { ProductImage, Product } from './entities';
import { ProductStock } from './entities/product-stock.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    @InjectRepository(ProductStock)
    private readonly productStockRepository: Repository<ProductStock>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    try {
        // 1. Desestructurar el DTO: Ahora extraemos 'images' Y 'stockEntries' (ambos opcionales)
        const { images = [], stockEntries = [], sizes = [], ...productDetails } = createProductDto;

        // 2. Crear la instancia del producto
        const product = this.productRepository.create({
            ...productDetails,
            user,
            sizes: sizes,
            // Mapear URLs a entidades ProductImage
            images: images.map( url => this.productImageRepository.create({ url }) ),
            
            // 3. Mapear las entradas de stock del DTO a entidades ProductStock
            stockEntries: stockEntries.map(entry => 
                this.productStockRepository.create(entry)
            ),
        });

        // 4. Guardar en la DB (Gracias al 'cascade: true', TypeORM guarda el producto y todas las stockEntries)
        await this.productRepository.save( product );

        // 5. Retornar el producto (el Front-End sigue esperando un formato similar)
        // Usamos findOnePlain para limpiar el objeto de retorno
        return this.findOnePlain(product.id); 

    } catch (error) {
        this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, gender = '' } = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
      order: {
        id: 'ASC',
      },
      where: gender ? [{ gender }, { gender: 'unisex' }] : {},
    });

    const totalProducts = await this.productRepository.count({
      where: gender ? [{ gender }, { gender: 'unisex' }] : {},
    });

    return {
      count: totalProducts,
      pages: Math.ceil(totalProducts / limit),
      products: products.map((product) => ({
        ...product,
        images: product.images.map((img) => img.url),
      })),
    };
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!product) throw new NotFoundException(`Product with ${term} not found`);

    return product;
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((image) => image.url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const { images, stockEntries, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({ id, ...toUpdate });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        product.images = images.map((image) =>
          this.productImageRepository.create({ url: image }),
        );
      }

      if (stockEntries && stockEntries.length > 0) {
        // 1. Borrar todas las entradas de stock antiguas
        await queryRunner.manager.delete(ProductStock, { product: { id } });
        
        // 2. Crear las nuevas entradas de stock
        product.stockEntries = stockEntries.map(entry => 
            this.productStockRepository.create(entry)
        );
      } else if (stockEntries && stockEntries.length === 0) {
        // Opcional: Si el cliente envía un arreglo vacío, borra todos los stocks
         await queryRunner.manager.delete(ProductStock, { product: { id } });
         product.stockEntries = [];
      }

      // await this.productRepository.save( product );
      product.user = user;

      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
