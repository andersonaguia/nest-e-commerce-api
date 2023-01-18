import { Controller, Get, Post, Body, HttpException, HttpStatus, BadRequestException, Param } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: "Create Product" })
  @ApiResponse({
    status: 201,
    description: 'Produto cadastrado com sucesso.'
  })
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

  @Get()
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get("/:id")
  async findOne(@Param("id") id: number) {
    try{
      return await this.productsService.findOne(id);

    }catch(error){
      throw new BadRequestException(error)
    }
  }
}
