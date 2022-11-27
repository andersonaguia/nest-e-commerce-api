import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({summary: "Create Product"})
  @ApiResponse({
    status: 201,
    description: 'Produto cadastrado com sucesso.'
  }) 
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    try{
      return await this.productsService.create(createProductDto);
    }catch(error){
      if(error){
        throw new HttpException({error: error}, HttpStatus.CONFLICT)
      }      
    }
   
  }
}
