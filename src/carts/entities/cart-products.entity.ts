import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "src/products/entities/product.entity";
import { CartEntity } from "./cart.entity";


@Entity({ name: 'carts-products' })
export class CartProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => CartEntity,
        (cart) => cart.id,
        { eager: true })
    @JoinColumn({ name: 'cart_id' }
    )
    cartId: CartEntity;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.id,
        { eager: true })
    @JoinColumn({ name: 'product_id' }
    )
    productId: ProductEntity;
}