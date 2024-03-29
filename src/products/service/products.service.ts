import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductCategory } from '../utils/product-category.enum';

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

  async findOne(id: number): Promise<ProductEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.productRepository.findOne({ where: { id: id } });
        resolve(product);
      } catch (error) {
        reject(error);
      }
    })
  }

  async findByCategory(category: ProductCategory): Promise<ProductEntity[]> {
    console.log(category)
    return new Promise(async (resolve, reject) => {
      try {
        const products = await this.productRepository.find({
          where: {
            category: category
          }
        })
        resolve(products);
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
