import { Inject, Injectable } from '@nestjs/common';
import { check } from 'prettier';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Equal, Repository } from 'typeorm';
import { BuyProductsDto } from '../dto/buy-products.dto';
import { CreateCartDto } from '../dto/create-cart.dto';
import { TotalCartDTO } from '../dto/total-cart.dto';
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

  async buyCart(info: BuyProductsDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = new Date(info.payment.dueDate);

        const checkCard = info.payment.cardNumber === "4444 4444 4444 4444" && info.payment.cvv === "222" && data > new Date();
        const cartIsActive = await this.cartRepository.findOne({
          where: {
            id: info.cartId
          }
        })

        if (checkCard && cartIsActive.active) {
          const closeCart = await this.cartRepository.update({ id: info.cartId }, { active: false })
          if (closeCart.affected > 0) {
            resolve("Compra realizada com sucesso")

          }
          resolve("Problema na compra, tente novamente")
        }
        resolve("Dados inválidos.")
      } catch (error) {
        reject(error);
      }
    })
  }

  createCart(createCart: CreateCartDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (createCart.cartId === null) {
          const cart = this.cartRepository.create()
          cart.userId = createCart.userId;
          cart.active = true;
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

        if (product != null && cartId.active) {
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

  findProductsInCart(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const cartIsActive = await this.cartRepository.findOne({
          where: {
            id: id
          }
        })
        if (cartIsActive.active) {
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
        }
        resolve("Sem itens no carrinho");
      } catch (error) {
        reject(error);
      }
    })
  }

  remove(id: number, cartId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const cartIsActive = await this.cartRepository.findOne({
          where: {
            id: id
          }
        })
        if (cartIsActive.active) {
          const removed = await this.cartProductRepository.delete({
            productId: Equal(id),
            cartId: Equal(cartId)
          })

          if (removed.affected === 0) {
            resolve("Erro ao remover ou item não presente no carrinho")
          }
          const atualCart = await this.cartProductRepository.find({
            where: {
              cartId: Equal(cartId),
            }
          })
          if (atualCart.length > 0) {
            const cartData = new TotalCartDTO();
            cartData.items = atualCart;
            const initialValue = 0;
            cartData.total = atualCart.reduce(
              (accumulator, currentValue) => accumulator + currentValue.productId.price,
              initialValue
            );
            resolve(cartData);
          }
        }
        resolve("O carrinho está vazio");
      } catch (error) {
        reject(error);
      }
    })
  }
}
