import { Controller, Get, Post, Body, Param, Delete, BadRequestException, NotFoundException, Query } from '@nestjs/common';
import { BuyProductsDto } from '../dto/buy-products.dto';
import { CreateCartDto } from '../dto/create-cart.dto';
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

  @Post('/carts/buy')
  async buyCart(@Body() buyCart: BuyProductsDto) {
    try {
      const result = await this.cartsService.buyCart(buyCart);
      if (result == null) {
        throw new NotFoundException("Cart is not found");
      }
      return result;
    } catch (error) {
      throw new BadRequestException(error)
    }
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

  @Delete('/carts')
  async remove(
    @Query('productId') productId: number,
    @Query('cartId') cartId: number
  ) {
    try {
      const result = await this.cartsService.remove(+productId, +cartId);
      return result;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
