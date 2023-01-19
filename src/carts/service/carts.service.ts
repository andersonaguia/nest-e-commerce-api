import { Inject, Injectable } from '@nestjs/common';
import { create } from 'domain';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Equal, Repository } from 'typeorm';
import { CreateCartDto } from '../dto/create-cart.dto';
import { TotalCartDTO } from '../dto/total-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { CartProductEntity } from '../entities/cart-products.entity';
import { CartEntity } from '../entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CART_REPOSITORY')
    private readonly cartRepository: Repository<CartEntity>,
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: Repository<ProductEntity>,
    @Inject('CART_PRODUCT_REPOSITORY')
    private readonly cartProductRepository: Repository<CartProductEntity>
  ) { }

  createCart(createCart: CreateCartDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (createCart.cartId === null) {
          const cart = this.cartRepository.create()
          cart.userId = createCart.userId;
          await this.cartRepository.save(cart);
        }

        const cartId = await this.cartRepository.findOne({
          where: {
            userId: createCart.userId
          }
        })
        const product: ProductEntity = await this.productRepository.findOne({
          where: { id: createCart.productId }
        });

        if (product != null) {
          const addProductInCart = this.cartProductRepository.create()
          addProductInCart.cartId = cartId;
          addProductInCart.productId = product;
          await this.cartProductRepository.save(addProductInCart);
          const itemsCart = await this.cartProductRepository.find({
            where: {
              cartId: cartId
            }
          });

          const cartData = new TotalCartDTO();
          cartData.items = itemsCart;
          const initialValue = 0;
          cartData.total = itemsCart.reduce(
            (accumulator, currentValue) => accumulator + currentValue.productId.price,
            initialValue
          );

          resolve(cartData);
        }
        resolve(null);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAll() {
    return `This action returns all carts`;
  }

  findProductsInCart(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const productsInCart = await this.cartProductRepository.find({
          where: {
            cartId: Equal(id)
          }
        })
        if (productsInCart.length > 0) {
          const cartData = new TotalCartDTO();
          cartData.items = productsInCart;
          const initialValue = 0;
          cartData.total = productsInCart.reduce(
            (accumulator, currentValue) => accumulator + currentValue.productId.price,
            initialValue
          );
          resolve(cartData);
        }
        resolve("Sem itens no carrinho");
      } catch (error) {
        reject(error);
      }
    })
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
