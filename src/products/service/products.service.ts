import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<ProductEntity>
  ) { }

  async findAll(): Promise<ProductEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const allProducts = this.productRepository.find();
        resolve(allProducts);
      } catch (error) {
        reject(error);
      }
    })
  }

  async create(product: CreateProductDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const productToCreate = new ProductEntity();
        productToCreate.name = product.name;
        productToCreate.price = product.price;
        productToCreate.description = product.description;
        productToCreate.isAvailable = product.isAvailable;
        productToCreate.category = product.category;
        const productCreated = await this.productRepository.insert(productToCreate);
        resolve(productCreated);
      } catch (error) {
        reject(error);
      }
    });
  }
}
