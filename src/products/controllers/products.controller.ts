import { Controller, Get, Post, Body, HttpException, HttpStatus, BadRequestException, Param, Query } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCategory } from '../utils/product-category.enum';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('/products')
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const result = await this.productsService.create(createProductDto);
      return "Produto inserido com sucesso!"
    } catch (error) {
      if (error) {
        throw new HttpException({ error: error }, HttpStatus.CONFLICT)
      }
    }
  }

  @Get('/products')
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get("/products/byid/:id")
  async findOne(@Param("id") id: number) {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get("/products/searchby")
  async findByCategory(@Query('category') category: ProductCategory) {
    try {
      return await this.productsService.findByCategory(category);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
