import { ProductEntity } from "src/products/entities/product.entity";
import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'carts'})
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ProductEntity, (product) => product.id, { cascade: true, eager:true })
    products: ProductEntity[]

    addProducts(product: ProductEntity) {
        if (this.products == null) {
            this.products = new Array<ProductEntity>();
        }
        this.products.push(product);
    }
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
