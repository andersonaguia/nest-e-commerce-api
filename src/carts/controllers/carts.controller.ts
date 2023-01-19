import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { CartsService } from '../service/carts.service';

@Controller()
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Post('/carts')
  create(@Body() createCartDto: CreateCartDto) {
    try {
      return this.cartsService.createCart(createCartDto);
    } catch (error) {
      throw new BadRequestException(error)
    }    
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
