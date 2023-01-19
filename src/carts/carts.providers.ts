import { DataSource } from "typeorm";
import { CartProductEntity } from "./entities/cart-products.entity";
import { CartEntity } from "./entities/cart.entity";

export const cartProviders = [
    {
        provide: 'CART_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CartEntity),
        inject: ['DATA_SOURCE'] 
    },
    {
        provide: 'CART_PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CartProductEntity),
        inject: ['DATA_SOURCE'] 
    }
]