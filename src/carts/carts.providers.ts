import { DataSource } from "typeorm";
import { CartEntity } from "./entities/cart.entity";

export const cartProviders = [
    {
        provide: 'CART_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CartEntity),
        inject: ['DATA_SOURCE'] 
    }
]