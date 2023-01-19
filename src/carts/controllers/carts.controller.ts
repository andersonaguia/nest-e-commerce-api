import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { CartsService } from '../service/carts.service';

@Controller()
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Post('/carts')
  async create(@Body() createCartDto: CreateCartDto) {
    try {
      const result = await this.cartsService.createCart(createCartDto);
      if (result == null) {
        throw new NotFoundException("Product or cart is not found");
      }
      return result;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get('/carts/:id')
  async findProductsInCart(@Param('id') id: string) {
    try {
      const result = await this.cartsService.findProductsInCart(+id);
      if (result == null) {
        throw new NotFoundException("Cart is not found");
      }
      return result;
    } catch (error) {
      throw new BadRequestException(error)
    }
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
